import { ServiceRequest, SiteSettings } from '../types';
import { initialSiteSettings } from '../data/mockData';
import { supabase } from './supabase';

export interface SubmitRequestPayload {
  customerName: string;
  customerPhone: string;
  serviceId?: string;
  serviceLabel?: string;
  areaText: string;
  acType?: string;
  brandModel?: string;
  problemDescription: string;
  preferredDate?: string;
  preferredTimeWindow?: string;
  additionalNotes?: string;
  honeypot?: string;
  consentGiven: boolean;
}

export interface DiagnosePayload {
  problem?: string;
  symptom?: string;
  acType?: string;
  brand?: string;
  roomSize?: string;
  notes?: string;
}

type BookingRow = {
  id: string;
  ref_code: string;
  customer_name: string;
  customer_phone: string;
  service_slug: string;
  service_name: string;
  area_text: string;
  ac_type: ServiceRequest['acType'];
  brand_model: string;
  problem_description: string;
  preferred_date: string | null;
  preferred_time_window: ServiceRequest['preferredTimeWindow'];
  additional_notes: string | null;
  status: ServiceRequest['status'];
  contacted_at: string | null;
  created_at: string;
  updated_at: string;
  notes: ServiceRequest['notes'];
  status_history: ServiceRequest['statusHistory'];
};

function toServiceRequest(row: BookingRow): ServiceRequest {
  return {
    id: row.id,
    refCode: row.ref_code,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    serviceId: row.service_slug,
    serviceLabel: row.service_name,
    areaText: row.area_text,
    acType: row.ac_type,
    brandModel: row.brand_model,
    problemDescription: row.problem_description,
    preferredDate: row.preferred_date || undefined,
    preferredTimeWindow: row.preferred_time_window || 'anytime',
    additionalNotes: row.additional_notes || undefined,
    status: row.status,
    contactedAt: row.contacted_at || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    notes: row.notes || [],
    statusHistory: row.status_history || [],
  };
}

function newReferenceCode(): string {
  const randomPart = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()
    : Math.random().toString(36).slice(2, 10).toUpperCase();
  return `SR-${randomPart}`;
}

// 1. Submit a service request. Public database policy only permits a new request;
// all reads and administrative fields are denied to visitors by RLS.
export async function submitServiceRequest(payload: SubmitRequestPayload): Promise<{
  success: boolean;
  refCode: string;
  message: string;
  data?: ServiceRequest;
}> {
  if (payload.honeypot) {
    throw new Error('Invalid submission.');
  }
  if (!payload.consentGiven) {
    throw new Error('Please confirm that our dispatcher may contact you.');
  }

  const refCode = newReferenceCode();
  const now = new Date().toISOString();
  const serviceId = payload.serviceId || 'general-inquiry';
  const serviceLabel = payload.serviceLabel || 'AC Inspection / Service';
  const acType = (payload.acType || 'not_sure') as ServiceRequest['acType'];
  const timeWindow = (payload.preferredTimeWindow || 'anytime') as NonNullable<ServiceRequest['preferredTimeWindow']>;

  const { error } = await supabase.from('service_bookings').insert({
    ref_code: refCode,
    customer_name: payload.customerName.trim(),
    customer_phone: payload.customerPhone.trim(),
    service_slug: serviceId,
    service_name: serviceLabel,
    area_text: payload.areaText.trim(),
    ac_type: acType,
    brand_model: payload.brandModel?.trim() || 'Unspecified',
    problem_description: payload.problemDescription.trim(),
    preferred_date: payload.preferredDate || null,
    preferred_time_window: timeWindow,
    additional_notes: payload.additionalNotes?.trim() || null,
    status: 'new',
    admin_notes: null,
    contacted_at: null,
    notes: [],
    status_history: [],
  });

  if (error) {
    console.error('Service request submission failed:', error.message);
    throw new Error('Request submit nahi ho saki. Baraye meharbani dobara koshish karein ya humein call karein.');
  }

  const data: ServiceRequest = {
    id: refCode,
    refCode,
    customerName: payload.customerName.trim(),
    customerPhone: payload.customerPhone.trim(),
    serviceId,
    serviceLabel,
    areaText: payload.areaText.trim(),
    acType,
    brandModel: payload.brandModel?.trim() || 'Unspecified',
    problemDescription: payload.problemDescription.trim(),
    preferredDate: payload.preferredDate,
    preferredTimeWindow: timeWindow,
    additionalNotes: payload.additionalNotes?.trim() || undefined,
    status: 'new',
    createdAt: now,
    updatedAt: now,
    notes: [],
    statusHistory: [],
  };

  return {
    success: true,
    refCode,
    message: 'Request received — our team will contact you shortly to confirm details and visit schedule.',
    data,
  };
}

// 2. Fetch service requests. RLS additionally ensures only assigned admins can read rows.
export async function fetchAdminRequests(status = 'all', search = ''): Promise<{
  success: boolean;
  data: ServiceRequest[];
  total: number;
  counts: Record<string, number>;
}> {
  let query = supabase.from('service_bookings').select('*').order('created_at', { ascending: false });
  if (status !== 'all') query = query.eq('status', status);

  const { data: rows, error } = await query;
  if (error) throw new Error('Requests load nahi ho sakin. Confirm karein ke aapka account admin ke taur par assign hai.');

  let data = ((rows || []) as BookingRow[]).map(toServiceRequest);
  if (search.trim()) {
    const q = search.toLowerCase();
    data = data.filter((r) =>
      r.customerName.toLowerCase().includes(q) ||
      r.customerPhone.includes(q) ||
      r.refCode.toLowerCase().includes(q) ||
      r.areaText.toLowerCase().includes(q)
    );
  }

  const all = ((await supabase.from('service_bookings').select('status')).data || []) as Array<{status: ServiceRequest['status']}>;
  const counts: Record<string, number> = { all: all.length };
  for (const item of all) counts[item.status] = (counts[item.status] || 0) + 1;

  return { success: true, data, total: data.length, counts };
}

// 3. Update status and append a server-backed status-history entry.
export async function updateRequestStatus(
  id: string,
  newStatus: string,
  authorNote?: string
): Promise<{ success: boolean; data?: ServiceRequest }> {
  const validStatuses: ServiceRequest['status'][] = [
    'new', 'contacted', 'scheduled', 'in_progress', 'completed', 'cancelled', 'unable_to_serve',
  ];
  if (!validStatuses.includes(newStatus as ServiceRequest['status'])) {
    throw new Error('Invalid status.');
  }

  const { data: current, error: readError } = await supabase
    .from('service_bookings').select('*').eq('id', id).single();
  if (readError || !current) throw new Error('Request nahi mil saki ya admin permission nahi hai.');

  const row = current as BookingRow;
  const now = new Date().toISOString();
  const nextStatus = newStatus as ServiceRequest['status'];
  const notes = [...(row.notes || [])];
  if (authorNote?.trim()) {
    notes.push({ id: crypto.randomUUID(), text: authorNote.trim(), author: 'Admin Dispatcher', createdAt: now });
  }
  const statusHistory = [...(row.status_history || []), {
    from: row.status,
    to: nextStatus,
    changedAt: now,
    changedBy: 'Admin Dispatcher',
  }];

  const { data, error } = await supabase.from('service_bookings').update({
    status: nextStatus,
    contacted_at: nextStatus === 'contacted' ? (row.contacted_at || now) : row.contacted_at,
    notes,
    status_history: statusHistory,
  }).eq('id', id).select('*').single();

  if (error || !data) throw new Error('Request status update nahi ho saka.');
  return { success: true, data: toServiceRequest(data as BookingRow) };
}

// 4. Add an internal technician note.
export async function addRequestNote(
  id: string,
  note: string,
  author = 'Admin'
): Promise<{ success: boolean; data?: unknown }> {
  if (!note.trim()) return { success: false };

  const { data: current, error: readError } = await supabase
    .from('service_bookings').select('notes').eq('id', id).single();
  if (readError || !current) return { success: false };

  const entry = { id: crypto.randomUUID(), text: note.trim(), author, createdAt: new Date().toISOString() };
  const nextNotes = [...(((current.notes || []) as ServiceRequest['notes'])), entry];
  const { error } = await supabase.from('service_bookings').update({ notes: nextNotes }).eq('id', id);
  if (error) return { success: false };
  return { success: true, data: entry };
}

// 5. Run the server-side AI diagnostic engine.
export async function requestAIDiagnosis(payload: DiagnosePayload): Promise<{
  success: boolean;
  diagnosis: string;
  error?: string;
}> {
  const res = await fetch('/api/gemini/diagnose', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Diagnostic request failed.');
  return data;
}

// 6. Public site settings live in the site_content table.
export async function fetchSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_content')
    .select('setting_value')
    .eq('setting_key', 'site_settings')
    .eq('is_public', true)
    .maybeSingle();

  if (error || !data?.setting_value) return initialSiteSettings;
  return { ...initialSiteSettings, ...(data.setting_value as Partial<SiteSettings>) };
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  const { error } = await supabase.from('site_content').upsert({
    setting_key: 'site_settings',
    setting_value: settings,
    is_public: true,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'setting_key' });
  if (error) {
    console.error('Could not save site settings:', error.message);
    return false;
  }
  return true;
}

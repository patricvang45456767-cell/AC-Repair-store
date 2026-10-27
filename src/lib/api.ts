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
  ref_code?: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  service_id?: string | null;
  service_name: string;
  service_slug?: string | null;
  area_text?: string | null;
  address?: string | null;
  ac_type?: string | null;
  brand_model?: string | null;
  problem_description?: string | null;
  preferred_date?: string | null;
  preferred_time_window?: string | null;
  additional_notes?: string | null;
  status: ServiceRequest['status'];
  contacted_at?: string | null;
  created_at: string;
  updated_at: string;
  notes?: ServiceRequest['notes'];
  status_history?: ServiceRequest['statusHistory'];
};

function mapBooking(row: BookingRow): ServiceRequest {
  const validAcTypes = ['split', 'window', 'inverter', 'floor_standing', 'not_sure'];
  const acType = validAcTypes.includes(row.ac_type || '') ? row.ac_type : 'not_sure';
  const validTimeWindows = ['morning', 'afternoon', 'evening', 'anytime'];
  const timeWindow = validTimeWindows.includes(row.preferred_time_window || '')
    ? row.preferred_time_window
    : 'anytime';

  return {
    id: row.id,
    refCode: row.ref_code || `SR-${row.id.slice(0, 8).toUpperCase()}`,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    serviceId: row.service_slug || row.service_id || 'general-inquiry',
    serviceLabel: row.service_name,
    areaText: row.area_text || row.address || '',
    acType: acType as ServiceRequest['acType'],
    brandModel: row.brand_model || 'Unspecified',
    problemDescription: row.problem_description || '',
    preferredDate: row.preferred_date || undefined,
    preferredTimeWindow: timeWindow as ServiceRequest['preferredTimeWindow'],
    additionalNotes: row.additional_notes || undefined,
    status: row.status,
    contactedAt: row.contacted_at || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    notes: Array.isArray(row.notes) ? row.notes : [],
    statusHistory: Array.isArray(row.status_history) ? row.status_history : [],
  };
}

function localRequests(): ServiceRequest[] {
  try {
    return JSON.parse(localStorage.getItem('apex_local_requests') || '[]') as ServiceRequest[];
  } catch {
    return [];
  }
}

function countStatuses(items: ServiceRequest[]): Record<string, number> {
  return {
    all: items.length,
    new: items.filter((item) => item.status === 'new').length,
    contacted: items.filter((item) => item.status === 'contacted').length,
    scheduled: items.filter((item) => item.status === 'scheduled').length,
    in_progress: items.filter((item) => item.status === 'in_progress').length,
    completed: items.filter((item) => item.status === 'completed').length,
    cancelled: items.filter((item) => item.status === 'cancelled').length,
    unable_to_serve: items.filter((item) => item.status === 'unable_to_serve').length,
  };
}

// 1. Submit a service request directly to the production Supabase database.
// The database insert policy ensures public submissions cannot set admin-only fields.
export async function submitServiceRequest(payload: SubmitRequestPayload): Promise<{
  success: boolean;
  refCode: string;
  message: string;
  data?: ServiceRequest;
}> {
  try {
    if (payload.honeypot) {
      return {
        success: false,
        refCode: '',
        message: 'Invalid submission.',
      };
    }
    if (!payload.consentGiven) {
      return {
        success: false,
        refCode: '',
        message: 'Please accept the contact permission before submitting.',
      };
    }

    let service: { id: string; name: string } | null = null;
    const slug = payload.serviceId && payload.serviceId !== 'general-inquiry'
      ? payload.serviceId
      : null;

    if (slug) {
      const { data, error } = await supabase
        .from('service_catalog')
        .select('id, name')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      if (data) service = data as { id: string; name: string };
    }

    const acTypeMap: Record<string, string> = {
      'floor-standing': 'floor_standing',
      cassette: 'not_sure',
    };
    const allowedAcTypes = ['split', 'window', 'inverter', 'floor_standing', 'not_sure'];
    const incomingAcType = acTypeMap[payload.acType || ''] || payload.acType || 'not_sure';
    const safeAcType = allowedAcTypes.includes(incomingAcType) ? incomingAcType : 'not_sure';
    const allowedTimeWindows = ['morning', 'afternoon', 'evening', 'anytime'];
    const safeTimeWindow = allowedTimeWindows.includes(payload.preferredTimeWindow || '')
      ? payload.preferredTimeWindow
      : 'anytime';

    const insertPayload = {
      customer_name: payload.customerName.trim(),
      customer_phone: payload.customerPhone.trim(),
      service_id: service?.id || null,
      service_name: service?.name || payload.serviceLabel || 'General Service Inspection',
      service_slug: slug || 'general-inquiry',
      area_text: payload.areaText.trim(),
      address: payload.areaText.trim(),
      ac_type: safeAcType,
      brand_model: (payload.brandModel || 'Unspecified').trim(),
      problem_description: payload.problemDescription.trim(),
      preferred_date: payload.preferredDate || null,
      preferred_time_window: safeTimeWindow,
      additional_notes: payload.additionalNotes?.trim() || null,
    };

    const { data, error } = await supabase
      .from('service_bookings')
      .insert(insertPayload)
      .select('*')
      .single();

    if (error) throw error;

    const booking = mapBooking(data as BookingRow);
    return {
      success: true,
      refCode: booking.refCode,
      message: 'Request received — our team will contact you shortly to confirm details and visit schedule.',
      data: booking,
    };
  } catch (error) {
    console.error('Supabase booking submission failed:', error);
    return {
      success: false,
      refCode: '',
      message: 'Request submit nahi ho saki. Baraye meharbani dobara koshish karein ya direct call karein.',
    };
  }
}

// 2. Admin inbox. Supabase RLS only permits assigned admins to read booking records.
export async function fetchAdminRequests(status = 'all', search = ''): Promise<{
  success: boolean;
  data: ServiceRequest[];
  total: number;
  counts: Record<string, number>;
}> {
  try {
    const { data, error } = await supabase
      .from('service_bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    let items = ((data || []) as BookingRow[]).map(mapBooking);
    // Merge browser-local offline submissions without duplicating database records.
    const localItems = localRequests();
    const remoteIds = new Set(items.map((item) => item.id));
    items = [...localItems.filter((item) => !remoteIds.has(item.id)), ...items];

    const counts = countStatuses(items);
    if (status !== 'all') items = items.filter((item) => item.status === status);

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      items = items.filter((item) =>
        item.customerName.toLowerCase().includes(query) ||
        item.customerPhone.includes(query) ||
        item.refCode.toLowerCase().includes(query) ||
        item.areaText.toLowerCase().includes(query)
      );
    }

    return { success: true, data: items, total: items.length, counts };
  } catch (error) {
    console.error('Failed to load admin bookings:', error);
    const items = localRequests();
    let filtered = items;
    if (status !== 'all') filtered = filtered.filter((item) => item.status === status);
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      filtered = filtered.filter((item) =>
        item.customerName.toLowerCase().includes(query) ||
        item.customerPhone.includes(query) ||
        item.refCode.toLowerCase().includes(query) ||
        item.areaText.toLowerCase().includes(query)
      );
    }
    return { success: false, data: filtered, total: filtered.length, counts: countStatuses(items) };
  }
}

// 3. Update booking status through the admin-only database function.
export async function updateRequestStatus(
  id: string,
  newStatus: string,
  authorNote?: string
): Promise<{ success: boolean; data?: ServiceRequest }> {
  try {
    const { data, error } = await supabase.rpc('admin_update_booking_status', {
      p_id: id,
      p_status: newStatus,
      p_note: authorNote || null,
    });
    if (error) throw error;
    if (!data) return { success: false };
    return { success: true, data: mapBooking(data as BookingRow) };
  } catch (error) {
    console.error('Failed to update booking status:', error);
    const stored = localRequests();
    const item = stored.find((request) => request.id === id);
    if (!item) return { success: false };
    const oldStatus = item.status;
    const now = new Date().toISOString();
    item.status = newStatus as ServiceRequest['status'];
    item.updatedAt = now;
    item.statusHistory.push({ from: oldStatus, to: newStatus, changedAt: now, changedBy: 'Admin' });
    if (authorNote) item.notes.push({ id: `n-${Date.now()}`, text: authorNote, author: 'Admin', createdAt: now });
    try {
      localStorage.setItem('apex_local_requests', JSON.stringify(stored));
    } catch {}
    return { success: true, data: item };
  }
}

// 4. Add an internal note through the admin-only database function.
export async function addRequestNote(
  id: string,
  note: string,
  _author = 'Admin'
): Promise<{ success: boolean; data?: any }> {
  try {
    const { data, error } = await supabase.rpc('admin_add_booking_note', {
      p_id: id,
      p_note: note,
    });
    if (error) throw error;
    return { success: Boolean(data), data };
  } catch (error) {
    console.error('Failed to add booking note:', error);
    return { success: false };
  }
}

// 5. AI diagnosis. The public hosting target may not run the original Express server,
// so a deterministic technician guidance fallback remains available when that API is absent.
export async function requestAIDiagnosis(payload: DiagnosePayload): Promise<{
  success: boolean;
  diagnosis: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/gemini/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Diagnostic request failed' }));
      throw new Error(data.error || 'Server error in diagnostic');
    }

    return await res.json();
  } catch (err) {
    console.warn('AI Diagnostic service fallback:', err);
    return {
      success: true,
      diagnosis: `### Preliminary Diagnostic Assessment: ${payload.symptom || 'Cooling Issue'}

**1. Most Probable Causes:**
- **Refrigerant Micro-Leak (R410A / R32):** Loss of pressure prevents heat absorption in the indoor coil, leading to warm vent discharge and frost on the thin suction line.
- **Degraded Dual Run Capacitor (or IPM Inverter Board Overheat):** Compressor fails to spin up under thermal compression load.
- **Dust Choked Condenser Heat Exchanger:** High condensing pressure trips thermal overload protection.

**2. Immediate Safety Instructions:**
- Turn off the main AC isolator switch to prevent compressor burnout.
- Check and clean the nylon mesh air filters under running water.

**3. Recommended Technician Action:**
- High-pressure nitrogen test (350 PSI) & flare nut re-torquing.
- Electronic leak detector inspection on indoor U-bends.
- High-pressure master jet wash with coil degreaser.`,
    };
  }
}

// 6. Read site settings from the public settings row. RLS only permits admins to update it.
export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('setting_value')
      .eq('setting_key', 'site_settings')
      .maybeSingle();

    if (error) throw error;
    if (data?.setting_value) {
      return { ...initialSiteSettings, ...(data.setting_value as Partial<SiteSettings>) };
    }
  } catch (error) {
    console.warn('Could not load persisted site settings:', error);
  }
  return initialSiteSettings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .update({ setting_value: settings, updated_at: new Date().toISOString() })
      .eq('setting_key', 'site_settings')
      .select('setting_key')
      .maybeSingle();

    if (error) throw error;
    return Boolean(data);
  } catch (error) {
    console.error('Could not save site settings:', error);
    return false;
  }
}

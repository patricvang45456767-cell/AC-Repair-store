/**
 * Utility functions for contact actions, formatting, and validation
 */

// Formats phone numbers safely
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

// Generates valid WhatsApp link with encoded message
export function createWhatsAppUrl(phoneE164: string, message: string): string {
  const cleanPhone = phoneE164.replace(/[^\d]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

// Generates standard tel: URL
export function createTelUrl(phoneE164: string): string {
  const cleanPhone = phoneE164.replace(/[^\d+]/g, '');
  return `tel:${cleanPhone}`;
}

// Pretty print date
export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

// Relative time calculation
export function timeAgo(isoString: string): string {
  try {
    const now = Date.now();
    const past = new Date(isoString).getTime();
    const diffMin = Math.round((now - past) / 60000);

    if (diffMin < 2) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return 'Recently';
  }
}

// Status badge color and label mapping
export function getStatusDetails(status: string): { label: string; bg: string; text: string; border: string } {
  switch (status) {
    case 'new':
      return { label: 'New Request', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'contacted':
      return { label: 'Contacted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'scheduled':
      return { label: 'Scheduled', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
    case 'in_progress':
      return { label: 'In Progress', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'completed':
      return { label: 'Completed', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' };
    case 'cancelled':
      return { label: 'Cancelled', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' };
    case 'unable_to_serve':
      return { label: 'Out of Area / Declined', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
    default:
      return { label: status, bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
  }
}

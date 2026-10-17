export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: 'repair' | 'maintenance' | 'installation' | 'electronics' | 'commercial';
  shortDescription: string;
  fullDescription: string;
  symptoms: string[];
  includes: string[];
  notIncluded?: string[];
  estimatedDuration: string;
  priceNote: string;
  badge?: string;
  iconName: string;
}

export interface ServiceRequest {
  id: string;
  refCode: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceLabel: string;
  areaText: string;
  acType: 'split' | 'window' | 'inverter' | 'floor_standing' | 'not_sure';
  brandModel: string;
  problemDescription: string;
  preferredDate?: string;
  preferredTimeWindow?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  additionalNotes?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'unable_to_serve';
  contactedAt?: string;
  createdAt: string;
  updatedAt: string;
  notes: Array<{
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }>;
  statusHistory: Array<{
    from: string;
    to: string;
    changedAt: string;
    changedBy: string;
  }>;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  description: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappE164: string;
  whatsappPrefill: string;
  email: string;
  address: string;
  showAddress: boolean;
  openingHours: string;
  pricePolicy: string;
  serviceAreas: string[];
  emergencyEnabled: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'repair' | 'gas' | 'pricing';
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  area: string;
  acModel: string;
  serviceProvided: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  problem: string;
  solution: string;
  category: string;
  beforeDesc: string;
  afterDesc: string;
}

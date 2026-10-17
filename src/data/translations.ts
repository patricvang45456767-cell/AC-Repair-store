export type Language = 'roman' | 'en';

export interface TranslationStrings {
  brandTitle: string;
  brandTag: string;
  brandSubtitle: string;
  emergencyBanner: string;
  emergencySub: string;
  callHotline: string;
  adminPortal: string;
  navHome: string;
  navServices: string;
  navAi: string;
  navProcess: string;
  navPricing: string;
  navCoverage: string;
  navGallery: string;
  navVideos: string;
  navFaqs: string;
  navContact: string;
  btnBookInspection: string;
  btnCallNow: string;
  btnWhatsApp: string;
  heroTrust: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCheck1: string;
  heroCheck2: string;
  heroCheck3: string;
  heroCheck4: string;
  quickSelectorTitle: string;
  quickSelectorSub: string;
  instantMatch: string;
  avgResponse: string;
  deepAiLink: string;

  // AI Diagnostic
  aiBadge: string;
  aiTitle: string;
  aiHighlight: string;
  aiSubtitle: string;
  aiFormTitle: string;
  aiPresetsLabel: string;
  aiDescLabel: string;
  aiDescPlaceholder: string;
  aiTypeLabel: string;
  aiBrandLabel: string;
  aiRoomLabel: string;
  aiBtnAnalyze: string;
  aiBtnAnalyzing: string;
  aiReportTitle: string;
  aiNoQueryTitle: string;
  aiNoQuerySub: string;
  aiPhysicalNotice: string;
  aiBookThis: string;

  // Process
  processBadge: string;
  processTitle: string;
  processSubtitle: string;
  processCtaTitle: string;
  processCtaSub: string;

  // Pricing
  pricingBadge: string;
  pricingTitle: string;
  pricingCard1Title: string;
  pricingCard1Desc: string;
  pricingCard2Title: string;
  pricingCard2Desc: string;
  pricingCard3Title: string;
  pricingCard3Desc: string;

  // Coverage
  coverageBadge: string;
  coverageTitle: string;
  coverageSubtitle: string;
  coverageSearchPlaceholder: string;
  coverageResponseTime: string;

  // Contact
  contactBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  contactHotlineTitle: string;
  contactWhatsAppTitle: string;
  contactHoursTitle: string;
  contactAddressTitle: string;

  // Booking Modal
  modalBadge: string;
  modalTitle: string;
  modalSubtitle: string;
  fieldName: string;
  fieldPhone: string;
  fieldService: string;
  fieldArea: string;
  fieldAcType: string;
  fieldBrand: string;
  fieldProblem: string;
  fieldDate: string;
  fieldTime: string;
  fieldConsent: string;
  btnSubmitBooking: string;
  btnSubmitting: string;
  successTitle: string;
  successNextSteps: string;
  step1: string;
  step2: string;
  step3: string;
}

export const translations: Record<Language, TranslationStrings> = {
  roman: {
    brandTitle: 'ABC AIR CARE',
    brandTag: 'CARE',
    brandSubtitle: 'Certified AC Repair, Servicing & Inverter PCB Master',
    emergencyBanner: 'Emergency AC Kharab Hai?',
    emergencySub: 'Priority Same-Day Technician Dispatch Hazir Hai',
    callHotline: 'Call Hotline: 0346 3902834',
    adminPortal: 'Admin Portal',
    navHome: 'Home',
    navServices: 'Services',
    navAi: 'AI Tashkhees',
    navProcess: 'Hamara Tareeqa',
    navPricing: 'Rates & Policy',
    navCoverage: 'Service Areas',
    navGallery: 'Real Work Gallery',
    navVideos: 'Service Video Ads',
    navFaqs: 'Ahem Sawalat',
    navContact: 'Rabta Karein',
    btnBookInspection: 'Technician Book Karein',
    btnCallNow: 'Call Karein',
    btnWhatsApp: 'WhatsApp Chat',
    heroTrust: 'Certified HVAC Engineers • 90 Din Ki Service Guarantee',
    heroTitle1: 'Tez Aur Bharosemand',
    heroTitleHighlight: 'AC Repair',
    heroTitle2: '& Master Jet Servicing',
    heroSubtitle: 'Ghar baithe certified technicians se AC check karwayein. Manifold gauge se accurate pressure testing, zero-mess chemical jet wash aur 100% shaffaf rates. Koi hidden charges nahi.',
    heroCheck1: 'Pehle Se Clear Rate',
    heroCheck2: 'Genuine R410A / R32 Gas',
    heroCheck3: 'Waterproof Jet Bags',
    heroCheck4: '90 Din Warranty',
    quickSelectorTitle: 'AC Kya Masla Kar Raha Hai?',
    quickSelectorSub: 'Neeche se apna masla chunein:',
    instantMatch: 'Instant Match',
    avgResponse: 'Jawab: 15 Minutes Me',
    deepAiLink: 'AI Se Masla Check Karein',

    // AI
    aiBadge: 'High-Thinking HVAC Diagnostic Engine',
    aiTitle: 'Smart AI Fault',
    aiHighlight: 'Tashkhees (Diagnostics)',
    aiSubtitle: 'AC cooling nahi kar raha ya error code araha hai? Neeche tafseel likhein. Hamara smart engine foran possible reasons aur safety advice batayega.',
    aiFormTitle: 'Apne AC Ka Masla Batayein',
    aiPresetsLabel: 'Common Masla Select Karein Ya Khud Likhein:',
    aiDescLabel: 'Maslay Ki Tafseel *',
    aiDescPlaceholder: 'Maslan: Thandi hawa nahi arahi, indoor se pani tapak raha hai, E6 error code araha hai...',
    aiTypeLabel: 'AC Ki Type',
    aiBrandLabel: 'Brand & Capacity',
    aiRoomLabel: 'Kamre Ka Size / Location',
    aiBtnAnalyze: 'Masla Analyze Karein (AI)',
    aiBtnAnalyzing: 'AI Tashkhees Kar Raha Hai...',
    aiReportTitle: 'Engineering Diagnostic Report',
    aiNoQueryTitle: 'Koi Masla Select Nahi Kiya Gaya',
    aiNoQuerySub: 'Upar presets me se select karein ya likh kar Analyze dabayein.',
    aiPhysicalNotice: 'Note: Manifold gauge aur multimeter se physical checkup zaruri hota hai.',
    aiBookThis: 'Yeh Repair Visit Book Karein',

    // Process
    processBadge: 'Shaffaf Tareeqa',
    processTitle: 'ABC Air Care Ka 4-Step Protocol',
    processSubtitle: 'Bina kisi chhupe hue kharche k, hamara certified technician mukammal tools k sath visit karta hai.',
    processCtaTitle: 'Kya aapko AC ki cooling wapis nayi jaisi chahiye?',
    processCtaSub: 'Hamare technicians mukammal manifold gauges aur spare parts k sath foran pohanchte hain.',

    // Pricing
    pricingBadge: 'Fair & Honest Rates',
    pricingTitle: 'Hamari Inspection Guarantee & Pricing Policy',
    pricingCard1Title: '100% Visit Fee Credit',
    pricingCard1Desc: 'Technician visit aur diagnostic fee quotation manzoor hone par aapke final bill me 100% minus/adjust ho jati hai.',
    pricingCard2Title: 'Gas Weight K Hisab Se Charge Hogi',
    pricingCard2Desc: 'Andaza lagaye baghair digital scale par toal kar exact grams pure R410A / R32 refrigerant bhari jati hai.',
    pricingCard3Title: 'Written Invoice Aur 90 Din Warranty',
    pricingCard3Desc: 'Har kaam ki written invoice aur 90 din ki service warranty di jati hai. Masla dobara aye tou free fix.',

    // Coverage
    coverageBadge: 'Service Areas',
    coverageTitle: 'Aapke Ilqay Me Mobile Service Fleet',
    coverageSubtitle: 'DHA, Gulberg, Johar Town, Bahria Town, Model Town aur Cantt k tamam sectors me rapid response dispatch.',
    coverageSearchPlaceholder: 'Apna area ya town search karein (e.g. DHA, Gulberg, Johar Town)...',
    coverageResponseTime: 'Pohanchne Ka Time: 60 - 90 Minutes',

    // Contact
    contactBadge: 'Direct Rabta',
    contactTitle: 'ABC Air Care Se Rabta Karein',
    contactSubtitle: 'Call karein, WhatsApp par photo bhejein ya online form bhar kar foran technician bulayein.',
    contactHotlineTitle: 'Direct Hotline (24/7 Helpline)',
    contactWhatsAppTitle: 'WhatsApp Support (Photos & Audio)',
    contactHoursTitle: 'Kaam K Auqat',
    contactAddressTitle: 'Central Workshop & Lab',

    // Modal
    modalBadge: 'Inspection Visit Request',
    modalTitle: 'Certified Technician Bulayein',
    modalSubtitle: 'Form submit karein, hamari team foran phone ya WhatsApp par time confirm karegi.',
    fieldName: 'Apna Pura Naam *',
    fieldPhone: 'Mobile / WhatsApp Number *',
    fieldService: 'Koun Si Service Chahiye *',
    fieldArea: 'Apna Ilqa / Area *',
    fieldAcType: 'AC Ki Type',
    fieldBrand: 'Brand / Model (Agar maloom ho)',
    fieldProblem: 'AC Ka Masla Likhein *',
    fieldDate: 'Visit Ki Tareekh',
    fieldTime: 'Munasib Time Slot',
    fieldConsent: 'Main ABC Air Care ko call aur WhatsApp par rabta karne ki ijazat deta/deti hoon.',
    btnSubmitBooking: 'Request Send Karein',
    btnSubmitting: 'Request Bheji Ja Rahi Hai...',
    successTitle: 'Shukriya! Request Successfully Receive Ho Gayi!',
    successNextSteps: 'Agla Marhala Kya Hoga:',
    step1: 'Hamara dispatcher aapke ilqay k qareeb-tareen technician ko assign karega.',
    step2: 'Hum aapko 0346 3902834 se call ya WhatsApp kar k visit time confirm karenge.',
    step3: 'Technician laser level aur manifold gauge k sath waqt par tashreef layega.',
  },
  en: {
    brandTitle: 'ABC AIR CARE',
    brandTag: 'CARE',
    brandSubtitle: 'Certified AC Repair, Servicing & Inverter PCB Master',
    emergencyBanner: 'Emergency AC Breakdown?',
    emergencySub: 'Priority Same-Day Technician Dispatch Available',
    callHotline: 'Call Hotline: 0346 3902834',
    adminPortal: 'Admin Portal',
    navHome: 'Home',
    navServices: 'Services',
    navAi: 'AI Diagnostics',
    navProcess: 'Our Process',
    navPricing: 'Pricing Policy',
    navCoverage: 'Coverage Areas',
    navGallery: 'Real Work Gallery',
    navVideos: 'Service Video Ads',
    navFaqs: 'FAQs',
    navContact: 'Contact',
    btnBookInspection: 'Book Inspection',
    btnCallNow: 'Call Now',
    btnWhatsApp: 'WhatsApp Chat',
    heroTrust: 'Certified HVAC Engineers • 90-Day Service Guarantee',
    heroTitle1: 'Fast, Reliable',
    heroTitleHighlight: 'AC Repair',
    heroTitle2: '& Master Jet Servicing',
    heroSubtitle: 'Certified technicians providing accurate manifold gauge diagnostics, zero-mess chemical jet washing, and precision leak repair. 100% transparent inspection and honest estimates.',
    heroCheck1: 'Clear Upfront Estimates',
    heroCheck2: 'Pure R410A / R32 Gas',
    heroCheck3: 'Waterproof Jet Bags',
    heroCheck4: '90-Day Warranty',
    quickSelectorTitle: 'What is your AC doing today?',
    quickSelectorSub: 'Select what your AC is experiencing:',
    instantMatch: 'Instant Match',
    avgResponse: 'Avg response: 15 mins',
    deepAiLink: 'Deep AI Diagnosis',

    // AI
    aiBadge: 'High-Thinking HVAC Diagnostic Engine',
    aiTitle: 'Smart AI Fault',
    aiHighlight: 'Diagnostics',
    aiSubtitle: 'Wondering why your AC is failing? Describe the issue below. Our high-thinking engineering engine evaluates electrical fault codes and refrigerant pressure dynamics.',
    aiFormTitle: 'Describe Your AC Trouble',
    aiPresetsLabel: 'Select Common Symptom or Type Below:',
    aiDescLabel: 'Observed Problem Description *',
    aiDescPlaceholder: 'e.g. Blowing lukewarm air, error E6 on display, water dripping...',
    aiTypeLabel: 'AC System Type',
    aiBrandLabel: 'Brand & Capacity',
    aiRoomLabel: 'Room Size / Location',
    aiBtnAnalyze: 'Analyze Problem Now (AI)',
    aiBtnAnalyzing: 'Analyzing Diagnostics...',
    aiReportTitle: 'Diagnostic Engineering Report',
    aiNoQueryTitle: 'No Active Diagnostic Query',
    aiNoQuerySub: 'Select a preset symptom or describe your problem to start.',
    aiPhysicalNotice: 'Physical inspection with digital manifold gauge required for warranty repair.',
    aiBookThis: 'Book This Repair Visit',

    // Process
    processBadge: 'Transparent Workflow',
    processTitle: 'How ABC Air Care Works',
    processSubtitle: 'No surprise invoices or vague quotes. We follow a strict 4-step engineering protocol designed for peace of mind.',
    processCtaTitle: 'Ready to restore your AC icy airflow?',
    processCtaSub: 'Our technicians are dispatched with complete manifold gauges and parts.',

    // Pricing
    pricingBadge: 'Fair & Honest Standards',
    pricingTitle: 'Our Upfront Pricing & Inspection Guarantee',
    pricingCard1Title: '100% Visit Fee Credit',
    pricingCard1Desc: 'A nominal visit fee applies, which is 100% credited into your final invoice upon approved service.',
    pricingCard2Title: 'Refrigerant Charged By Weight',
    pricingCard2Desc: 'Never pay for arbitrary top-ups. We use certified digital scales to weigh exact grams of pure R410A / R32 refrigerant.',
    pricingCard3Title: 'Itemized Written Invoice',
    pricingCard3Desc: 'Every job comes with a written warranty invoice. If the problem recurs within 90 days, we fix it with zero extra visit charge.',

    // Coverage
    coverageBadge: 'Service Coverage Areas',
    coverageTitle: 'Fast Mobile Technician Fleet Near You',
    coverageSubtitle: 'Operating dedicated mobile service vans stocked with nitrogen cylinders and inverter test kits across prime sectors.',
    coverageSearchPlaceholder: 'Search your town, sector or phase (e.g. DHA, Gulberg, Johar Town)...',
    coverageResponseTime: 'Response Time: 60 - 90 Minutes',

    // Contact
    contactBadge: 'Direct Reach',
    contactTitle: 'Contact ABC Air Care',
    contactSubtitle: 'Reach our service desk via call, WhatsApp, or submit a request online.',
    contactHotlineTitle: 'Technician Hotline',
    contactWhatsAppTitle: 'WhatsApp Support',
    contactHoursTitle: 'Operating Hours',
    contactAddressTitle: 'Central Operations Workshop',

    // Modal
    modalBadge: 'Request Service Visit',
    modalTitle: 'Book a Certified Technician',
    modalSubtitle: 'Submit your details below. We confirm all appointments by phone or WhatsApp before dispatching.',
    fieldName: 'Full Name *',
    fieldPhone: 'Contact Phone Number *',
    fieldService: 'Service Required *',
    fieldArea: 'Area / Locality *',
    fieldAcType: 'AC Type',
    fieldBrand: 'Brand & Capacity (Optional)',
    fieldProblem: 'Problem Description *',
    fieldDate: 'Preferred Visit Date',
    fieldTime: 'Preferred Time Window',
    fieldConsent: 'I consent to ABC Air Care contacting me via call or WhatsApp regarding this service inquiry.',
    btnSubmitBooking: 'Submit Service Request',
    btnSubmitting: 'Sending Request...',
    successTitle: 'Request Successfully Received!',
    successNextSteps: 'What Happens Next:',
    step1: 'Our dispatcher reviews your AC problem and nearest field technician.',
    step2: 'We call you from 0346 3902834 to confirm the visit time and inspection fee credit.',
    step3: 'Technician arrives equipped with manifold gauges and tools.',
  },
};

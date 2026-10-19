import { ServiceItem, GalleryItem, FAQItem } from '../types';

export const BUSINESS_INFO = {
  name: 'Er. Sunil Pal',
  role: 'Civil Engineer',
  tagline: 'Civil Construction Work • House Planning • Flat Sale & Rental',
  phones: [
    { number: '7030399100', display: '+91 70303 99100', isPrimary: true },
    { number: '8010801624', display: '+91 80108 01624', isPrimary: false },
  ],
  primaryPhone: '7030399100',
  secondaryPhone: '8010801624',
  email: 'engineer7030@gmail.com',
  address: {
    shop: 'Shop No. 7',
    building: 'Building No. 10B, Sodhi Residency',
    locality: 'Vrindavan Nagari, Paam',
    city: 'Boisar',
    state: 'Maharashtra',
    pincode: '401501',
    full: 'Shop No. 7, Building No. 10B, Sodhi Residency, Vrindavan Nagari, Paam, Boisar – 401501.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sodhi+Residency+Vrindavan+Nagari+Boisar+401501'
  },
  operatingHours: 'Mon - Sat: 9:30 AM - 8:30 PM | Sun: By Appointment',
  serviceArea: 'Boisar, Palghar, Tarapur & surrounding regions',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'civil-construction',
    title: 'Civil Construction Work',
    tagline: 'End-to-End Residential & Structural Execution',
    description: 'Comprehensive civil construction services tailored to site conditions and client specifications. From foundation laying and RCC framing to brickwork, plastering, and structural finishing.',
    features: [
      'Residential building construction & extensions',
      'Structural RCC framing and footing work',
      'Quality material coordination & site supervision',
      'Foundation, masonry, waterproofing & finishing',
      'Direct on-site engineering oversight'
    ],
    image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building2'
  },
  {
    id: 'house-planning',
    title: 'House Planning & Building Plans',
    tagline: 'Accurate Layouts & Technical Architectural Drawings',
    description: 'Precision architectural planning and structural layout drawings designed for optimal ventilation, natural light, spatial efficiency, and local regulatory alignment.',
    features: [
      'Custom residential floor plans (2D & 3D visualization concepts)',
      'Building layout & municipal sanction drawings',
      'Space-efficient room planning for plots & bungalows',
      'Structural column, beam & plumbing schematic coordination',
      'Vastu-conscious spatial arrangement options'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Compass'
  },
  {
    id: 'flat-sale-rental',
    title: 'Flat Sale & Rental Assistance',
    tagline: 'Local Real Estate Guidance in Boisar & Paam Area',
    description: 'Dedicated assistance for finding, purchasing, or renting residential flats and properties across Boisar, Vrindavan Nagari, and nearby neighborhoods.',
    features: [
      '1 BHK, 2 BHK & compact residential flat sourcing',
      'Rental property search for families & industrial workforce',
      'Transparent verification of property status & location',
      'Direct coordination between owners and prospective buyers/tenants',
      'Assistance with documentation and agreement procedures'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Home'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Contemporary Multi-Story Residential Residence',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Architectural inspiration showcasing balanced geometry, generous balcony setbacks, and durable exterior plaster finishes suitable for coastal weather.',
    specifications: ['G+2 Configuration', 'Terrace Pergola', 'Cross-Ventilation Strategy', 'Rainwater Discharge System']
  },
  {
    id: 'gal-2',
    title: 'Independent Modern Bungalow Concept',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Modern residential elevation featuring clean horizontal lines, warm exterior wood accents, and expansive glazed openings for abundant natural daylight.',
    specifications: ['Plot: 30x50 ft', 'Double Height Living Space', 'Covered Porch', 'Perimeter Boundary Wall']
  },
  {
    id: 'gal-3',
    title: 'Precision Architectural Floor Layout',
    category: 'Planning & Layout',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    description: 'Detailed technical blueprint illustrating dimensioned room allocations, circulation corridors, and strategic window placements for air circulation.',
    specifications: ['CAD Dimensioning', 'Load-Bearing Column Grid', 'Staircase Rise & Tread Standard', 'Electrical Conduit Layout']
  },
  {
    id: 'gal-4',
    title: 'Structural Masonry & Foundation Execution',
    category: 'Modern Elevation',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    description: 'On-site civil construction methodology showing reinforced concrete beam-column junction and precision brick alignment.',
    specifications: ['Fe500 Grade Steel Reinforcement', 'M20 Concrete Mix Proportion', 'Standard Curing Protocol', 'Plinth Beam Level Alignment']
  },
  {
    id: 'gal-5',
    title: 'Space-Optimized 2 BHK Apartment Layout',
    category: 'Planning & Layout',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: 'Functional residential unit planning minimizing dead corridor space while maximizing living hall utility and kitchen ergonomics.',
    specifications: ['Compact Utility Balcony', 'Master Bedroom with Ensuite', 'Dedicated Dining Alcove', 'Vastu-Friendly Kitchen Entry']
  },
  {
    id: 'gal-6',
    title: 'Modern Linear Residential Facade',
    category: 'Modern Elevation',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Subtle textured plaster finishes with parapet weather grooves and cantilevered sunshades designed for tropical monsoon resilience.',
    specifications: ['Chajja Weather Protection', 'Waterproof Exterior Coating', 'Concealed Drainage Pipes', 'LED Cove Lighting Recesses']
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Discussion',
    summary: 'Understanding Requirements & Site Brief',
    description: 'We meet in person at our Boisar office or discuss your needs over phone/WhatsApp. We understand your plot dimensions, budget considerations, family requirements, or property rental/purchase goals.',
    deliverables: ['Requirement checklist', 'Site location confirmation', 'Initial feasibility overview']
  },
  {
    step: '02',
    title: 'Planning & Consultation',
    summary: 'Spatial Layouts & Scope Definition',
    description: 'We evaluate structural options, room dimensions, natural light, and regulatory zoning. Detailed 2D house plans, material specifications, and construction schedules are prepared and refined.',
    deliverables: ['Custom floor plan draft', 'Scope of work outline', 'Material recommendations']
  },
  {
    step: '03',
    title: 'Project Execution / Delivery',
    summary: 'Disciplined Execution & Technical Standards',
    description: 'Work commences strictly as per agreed technical drawings and milestones. For civil construction, site supervision ensures correct mix ratios, reinforcement binding, and plumb levels.',
    deliverables: ['Milestone site supervision', 'Quality alignment', 'Regular progress updates']
  },
  {
    step: '04',
    title: 'Follow-up & Support',
    summary: 'Ongoing Assistance & Final Handover',
    description: 'We review the completed work or finalize property documentation with complete transparency. We remain available for future maintenance queries, expansion advice, or tenant facilitation.',
    deliverables: ['Final walkthrough inspection', 'As-built clarification', 'Continuous local support']
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Direct Engineering Consultation',
    description: 'Work directly with Er. Sunil Pal from the first sketch to final execution. No sales intermediaries or commission agents.',
    icon: 'UserCheck'
  },
  {
    title: 'Calculated Structural Planning',
    description: 'Every layout is planned with proper load paths, column grid alignment, and standard room proportions for comfort and longevity.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Transparent Scope & Materials',
    description: 'Clarity on grade of cement, steel specifications, plumbing lines, and execution milestones before any physical work begins.',
    icon: 'FileText'
  },
  {
    title: 'Deep Local Boisar Expertise',
    description: 'Grounded understanding of Boisar, Paam, and Tarapur soil characteristics, local weather extremes, and municipal drawing expectations.',
    icon: 'MapPin'
  },
  {
    title: 'Practical, Livable House Designs',
    description: 'Layouts crafted for real everyday living—maximizing cross-breeze, natural daylight, and useful floor area without wasted spaces.',
    icon: 'Maximize2'
  },
  {
    title: 'Complete Property Guidance',
    description: 'In addition to building from scratch, we assist families and professionals in finding genuine flats for sale or rent in Boisar.',
    icon: 'Key'
  }
];

export const OUR_APPROACH = [
  {
    title: 'Precision in Drafting',
    description: 'Every millimeter counts on a site plan. We produce clear, legible architectural and working drawings that eliminate on-site ambiguity.'
  },
  {
    title: 'Material Integrity',
    description: 'We prioritize tested, branded building materials suitable for Maharashtra coastal climate conditions, avoiding substandard substitutes.'
  },
  {
    title: 'Budget Discipline',
    description: 'Realistic cost estimations based on actual market rates for labor and materials in Palghar district, keeping expectations aligned.'
  },
  {
    title: 'Practical Communication',
    description: 'Direct phone and WhatsApp updates with clear visual check-ins so you are always informed about your project status.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Services',
    question: 'What services does Er. Sunil Pal provide?',
    answer: 'Er. Sunil Pal provides three core services: 1) Civil Construction Work for residential buildings and structural execution, 2) House Planning & Building Plan preparation (2D floor plans, elevation concepts, and technical layouts), and 3) Flat Sale & Rental assistance for residential properties in Boisar and surrounding localities.'
  },
  {
    id: 'faq-2',
    category: 'Construction',
    question: 'How can I discuss a construction project?',
    answer: 'You can reach out directly via phone at +91 70303 99100 or +91 80108 01624, send an enquiry through our website contact form, or message via WhatsApp. We will arrange an initial discussion to review your plot location, requirements, and project scope.'
  },
  {
    id: 'faq-3',
    category: 'Planning',
    question: 'Can I enquire about house planning and architectural plans?',
    answer: 'Yes. Whether you are building an independent house, a row bungalow, or renovating an existing structure, we prepare tailored residential floor plans, dimensioned layouts, and spatial designs customized to your plot size and family requirements.'
  },
  {
    id: 'faq-4',
    category: 'Property',
    question: 'How can I ask about flat sale or rental requirements in Boisar?',
    answer: 'You can use the dedicated "Property Enquiry" form on this website or call us directly. Let us know whether you wish to buy or rent, your preferred locality (such as Vrindavan Nagari, Paam, or Station road), preferred BHK configuration, and budget range.'
  },
  {
    id: 'faq-5',
    category: 'Consultation',
    question: 'How do I arrange an initial discussion or office visit?',
    answer: 'You can visit our office at Shop No. 7, Building No. 10B, Sodhi Residency, Vrindavan Nagari, Paam, Boisar – 401501 during working hours (Monday to Saturday, 9:30 AM to 8:30 PM). To ensure Er. Sunil Pal is available at the desk, calling in advance to fix a convenient time is recommended.'
  },
  {
    id: 'faq-6',
    category: 'Pricing',
    question: 'Are project estimates and quotation rates fixed beforehand?',
    answer: 'Construction costs and planning fees depend on plot terrain, total built-up square footage, structural complexity, and specific material grades chosen. A clear, customized scope and estimate are provided only after understanding your specific requirements.'
  }
];

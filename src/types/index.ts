export type ServiceType = 
  | 'civil-construction' 
  | 'house-planning' 
  | 'flat-sale-rental'
  | 'general-consultation';

export interface ServiceItem {
  id: ServiceType;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Residential' | 'Planning & Layout' | 'Modern Elevation';
  image: string;
  description: string;
  specifications: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  service: ServiceType;
  location: string;
  message: string;
}

export interface PropertyEnquiryData {
  enquiryType: 'Buy' | 'Rent';
  locationPreference: string;
  budgetRange: string;
  propertyType: string;
  fullName: string;
  phone: string;
  notes: string;
}

export interface SavedEnquiry {
  id: string;
  timestamp: string;
  type: 'project' | 'property';
  data: ContactFormData | PropertyEnquiryData;
}

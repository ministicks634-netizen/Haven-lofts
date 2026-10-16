export interface StylistScheduleDay {
  day: string;
  shortDay: string;
  hours: string;
  isClosed?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  phone: string;
  phoneRaw: string;
  bio: string;
  specialties: string[];
  schedule: StylistScheduleDay[];
  imageKey: string;
}

export interface LoftSpace {
  id: string;
  title: string;
  subtitle: string;
  aspect: string;
  recommendedResolution: string;
  description: string;
  imageKey: string;
  defaultConceptImage?: string;
}

export interface SalonInfo {
  name: string;
  tagline: string;
  city: string;
  state: string;
  zip: string;
  street: string;
  suite: string;
  coFounders: string;
  phone: string;
  phoneRaw: string;
}

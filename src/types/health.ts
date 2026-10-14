export type Language = 'en' | 'te';

export type UserRole = 'explorer' | 'donor' | 'clinician';

export type TextSize = 'normal' | 'large' | 'xlarge';

export interface OrganInfo {
  id: string;
  name: { en: string; te: string };
  system: string;
  location: { en: string; te: string };
  function: { en: string; te: string };
  commonConditions: { en: string[]; te: string[] };
  prevention: { en: string[]; te: string[] };
  urgentSymptoms: { en: string[]; te: string[] };
  relatedArticleId?: string;
  coordinates: {
    front?: { cx: number; cy: number; r: number };
    back?: { cx: number; cy: number; r: number };
  };
}

export interface HealthArticle {
  id: string;
  title: { en: string; te: string };
  category: 'general' | 'symptoms' | 'women' | 'diabetes_pancreas' | 'nutrition' | 'first_aid' | 'tests' | 'donation';
  summary: { en: string; te: string };
  keyFacts: { en: string[]; te: string[] };
  warningSigns: { en: string[]; te: string[] };
  references: string[];
  reviewedBy: string;
  reviewDate: string;
  readTime: string;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Unknown';

export type DonationType = 'whole_blood' | 'platelets' | 'plasma' | 'organ_pledge';

export interface BloodRequest {
  id: string;
  hospitalName: string;
  city: string;
  pincode: string;
  bloodGroup: BloodGroup;
  component: 'Whole Blood' | 'Single Donor Platelets (SDP)' | 'Fresh Frozen Plasma (FFP)' | 'Packed Red Blood Cells (PRBC)';
  unitsRequired: number;
  urgency: 'Routine' | 'Urgent' | 'Critical Emergency';
  status: 'Open' | 'Matched' | 'Fulfilled';
  contactPhone: string;
  postedDate: string;
  isVerified: boolean;
}

export interface DonorProfile {
  id: string;
  displayName: string;
  bloodGroup: BloodGroup;
  locationCity: string;
  pincode: string;
  preferredTypes: DonationType[];
  isAvailable: boolean;
  notificationConsent: boolean;
  lastDonationDate?: string;
  lastDonationType?: DonationType;
  totalDonationsCount: number;
}

export interface MedicalService {
  id: string;
  name: string;
  type: 'Hospital' | 'Blood Bank' | 'Emergency 24x7' | 'Organ Donation Center';
  address: string;
  city: string;
  pincode: string;
  phone: string;
  emergencyNumber: string;
  hasBloodBank: boolean;
  hasEmergencyICU: boolean;
  distanceKm?: number;
  openHours: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'info' | 'donor_update';
  read: boolean;
}

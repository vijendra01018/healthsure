import { BloodGroup, BloodRequest, DonationType } from '../types/health';

// Standard scientific blood compatibility matrix for red blood cells
export const BLOOD_COMPATIBILITY: Record<BloodGroup, { canDonateTo: BloodGroup[]; canReceiveFrom: BloodGroup[] }> = {
  'O-': {
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal red cell donor
    canReceiveFrom: ['O-']
  },
  'O+': {
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+']
  },
  'A-': {
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-']
  },
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+']
  },
  'B-': {
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'B-']
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'B-', 'B+']
  },
  'AB-': {
    canDonateTo: ['AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-', 'B-', 'AB-']
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] // Universal red cell recipient
  },
  'Unknown': {
    canDonateTo: [],
    canReceiveFrom: []
  }
};

// Recovery / Cooldown minimum intervals (in days)
export const RECOVERY_PERIODS: Record<DonationType, number> = {
  whole_blood: 84, // 12 weeks for iron store reconstitution
  platelets: 14,   // 2 weeks for apheresis platelets
  plasma: 28,      // 4 weeks for apheresis plasma
  organ_pledge: 0  // Legal pledge (non-physical recovery)
};

export const RECOVERY_DESCRIPTIONS: Record<DonationType, string> = {
  whole_blood: '84 days (12 weeks) allows ferritin and hemoglobin levels to safely restore.',
  platelets: '14 days because red blood cells are returned to circulation during apheresis.',
  plasma: '28 days for full protein and antibody serum restoration.',
  organ_pledge: 'Pledge of intent through official state registry upon deceased event.'
};

// Demonstration verified hospital requests (Academic sample data)
export const SAMPLE_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'req-01',
    hospitalName: 'Osmania General Hospital Blood Center',
    city: 'Hyderabad',
    pincode: '500012',
    bloodGroup: 'O-',
    component: 'Packed Red Blood Cells (PRBC)',
    unitsRequired: 2,
    urgency: 'Critical Emergency',
    status: 'Open',
    contactPhone: '+91 40 2460 0121',
    postedDate: '2026-10-14 06:30 AM',
    isVerified: true
  },
  {
    id: 'req-02',
    hospitalName: 'Nizam Institute of Medical Sciences (NIMS)',
    city: 'Hyderabad',
    pincode: '500082',
    bloodGroup: 'A+',
    component: 'Single Donor Platelets (SDP)',
    unitsRequired: 1,
    urgency: 'Urgent',
    status: 'Open',
    contactPhone: '+91 40 2348 9000',
    postedDate: '2026-10-13 04:15 PM',
    isVerified: true
  },
  {
    id: 'req-03',
    hospitalName: 'Gandhi Memorial Hospital',
    city: 'Secunderabad',
    pincode: '500003',
    bloodGroup: 'B+',
    component: 'Whole Blood',
    unitsRequired: 3,
    urgency: 'Routine',
    status: 'Open',
    contactPhone: '+91 40 2750 5566',
    postedDate: '2026-10-13 11:00 AM',
    isVerified: true
  },
  {
    id: 'req-04',
    hospitalName: 'Apollo Health City Blood Bank',
    city: 'Hyderabad',
    pincode: '500096',
    bloodGroup: 'AB-',
    component: 'Fresh Frozen Plasma (FFP)',
    unitsRequired: 2,
    urgency: 'Urgent',
    status: 'Open',
    contactPhone: '+91 40 2360 7777',
    postedDate: '2026-10-14 01:20 AM',
    isVerified: true
  }
];

// Helper to calculate days remaining for eligibility
export function calculateCooldownDays(lastDonationDateStr?: string, donationType: DonationType = 'whole_blood'): {
  isEligible: boolean;
  daysRemaining: number;
  eligibleDateStr: string;
} {
  if (!lastDonationDateStr) {
    return { isEligible: true, daysRemaining: 0, eligibleDateStr: 'Today' };
  }

  const lastDate = new Date(lastDonationDateStr);
  if (isNaN(lastDate.getTime())) {
    return { isEligible: true, daysRemaining: 0, eligibleDateStr: 'Today' };
  }

  const requiredDays = RECOVERY_PERIODS[donationType] || 84;
  const eligibleDate = new Date(lastDate);
  eligibleDate.setDate(lastDate.getDate() + requiredDays);

  const today = new Date();
  const diffTime = eligibleDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return {
      isEligible: true,
      daysRemaining: 0,
      eligibleDateStr: 'Now Eligible'
    };
  }

  return {
    isEligible: false,
    daysRemaining: diffDays,
    eligibleDateStr: eligibleDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  };
}

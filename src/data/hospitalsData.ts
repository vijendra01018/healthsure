import { MedicalService } from '../types/health';

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'hosp-01',
    name: 'Osmania General Hospital & Regional Blood Transfusion Center',
    type: 'Hospital',
    address: 'Afzal Gunj, High Court Road',
    city: 'Hyderabad',
    pincode: '500012',
    phone: '+91 40 2460 0121',
    emergencyNumber: '108',
    hasBloodBank: true,
    hasEmergencyICU: true,
    distanceKm: 3.2,
    openHours: '24 Hours / 7 Days'
  },
  {
    id: 'hosp-02',
    name: 'Nizam Institute of Medical Sciences (NIMS)',
    type: 'Emergency 24x7',
    address: 'Punjagutta Road, Somajiguda',
    city: 'Hyderabad',
    pincode: '500082',
    phone: '+91 40 2348 9000',
    emergencyNumber: '040-23489244',
    hasBloodBank: true,
    hasEmergencyICU: true,
    distanceKm: 4.8,
    openHours: '24 Hours / 7 Days'
  },
  {
    id: 'hosp-03',
    name: 'Red Cross Society Blood Bank & Aphaeresis Center',
    type: 'Blood Bank',
    address: 'Street No 15, Himayatnagar',
    city: 'Hyderabad',
    pincode: '500029',
    phone: '+91 40 2322 1667',
    emergencyNumber: '+91 40 2322 8990',
    hasBloodBank: true,
    hasEmergencyICU: false,
    distanceKm: 2.1,
    openHours: '24 Hours / 7 Days'
  },
  {
    id: 'hosp-04',
    name: 'Gandhi Memorial Hospital Emergency & Trauma Care',
    type: 'Emergency 24x7',
    address: 'Musheerabad, Padmarao Nagar',
    city: 'Secunderabad',
    pincode: '500003',
    phone: '+91 40 2750 5566',
    emergencyNumber: '108',
    hasBloodBank: true,
    hasEmergencyICU: true,
    distanceKm: 6.5,
    openHours: '24 Hours / 7 Days'
  },
  {
    id: 'hosp-05',
    name: 'Jeevanandan State Organ & Tissue Allocation Registry Center (NOTTO Node)',
    type: 'Organ Donation Center',
    address: 'DM & HS Campus, Sultan Bazar',
    city: 'Hyderabad',
    pincode: '500095',
    phone: '+91 40 2474 5440',
    emergencyNumber: '1800-103-7100',
    hasBloodBank: false,
    hasEmergencyICU: false,
    distanceKm: 3.9,
    openHours: '9:00 AM – 6:00 PM (Emergency Desk 24/7)'
  },
  {
    id: 'hosp-06',
    name: 'Apollo Health City Multi-Speciality & Transplant Wing',
    type: 'Hospital',
    address: 'Road No 72, Jubilee Hills',
    city: 'Hyderabad',
    pincode: '500096',
    phone: '+91 40 2360 7777',
    emergencyNumber: '1066',
    hasBloodBank: true,
    hasEmergencyICU: true,
    distanceKm: 8.4,
    openHours: '24 Hours / 7 Days'
  }
];

export const EMERGENCY_NUMBERS = [
  { title: 'National Emergency Ambulance Service (India)', number: '108', desc: 'Toll-free 24/7 medical emergencies' },
  { title: 'Unified Emergency Services Helpline', number: '112', desc: 'Police, Fire, and Ambulance combined' },
  { title: 'National Organ & Tissue Transplant Registry (NOTTO)', number: '1800-11-4770', desc: 'Official 24/7 toll-free pledge & referral desk' },
  { title: 'Women’s Health & Emergency Helpline', number: '181', desc: 'Confidential support & medical triage referral' }
];

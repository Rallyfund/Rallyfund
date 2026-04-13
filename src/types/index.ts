export interface Student {
  id: number;
  name: string;
  raised: number;
  contactsAdded: number;
  messagesDelivered: number;
  lastDonation: string;
}

export interface Fundraiser {
  programName: string;
  schoolName: string;
  advisorName: string;
  goal: number;
  totalRaised: number;
  daysRemaining: number;
  fundraiserDuration: number;
  startDate: string;
  endDate: string;
  students: Student[];
}

export interface DailyDataPoint {
  date: string;
  raised: number;
  goal: number;
}

export interface ActivityItem {
  donor: string;
  amount: number;
  studentName: string;
  timeAgo: string;
}

export interface IntakeFormData {
  fullName: string;
  email: string;
  phone: string;
  organizationName: string;
  role: string;
  approxParticipants: string;
  goal: string;
  referralSource: string;
}

export interface NavLink {
  label: string;
  href: string;
}

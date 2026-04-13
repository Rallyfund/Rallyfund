import { Fundraiser, DailyDataPoint, ActivityItem } from '@/types';

function generateDailyData(total: number, goal: number): DailyDataPoint[] {
  const days = 18; 
  const curve = [0, 0.8, 2.5, 4.5, 6.2, 8.8, 11.5, 14.0, 16.8, 21.2, 26.5, 33.2, 40.5, 50.0, 60.5, 72.8, 84.2, 93.5];
  const data: DailyDataPoint[] = [];
  const startDate = new Date('2026-02-01');

  for (let i = 0; i <= days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const raised = Math.round(((curve[i] || 100) / 100) * total * 100) / 100;
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      raised,
      goal,
    });
  }
  return data;
}

export const fundraiserData = {
  title: 'Grapevine High School Varsity Soccer',
  organization: 'Grapevine High School',
  advisorName: 'Coach Martinez',
  goal: 15000,
  totalRaised: 9847.50,
  daysRemaining: 12,
  fundraiserDuration: 30,
  startDate: '2026-02-01',
  endDate: '2026-03-03',
  students: [
    { id: 1, name: 'Emma Johnson', raised: 785.00, contactsAdded: 18, messagesDelivered: 54, lastDonation: '2026-02-20' },
    { id: 2, name: 'Liam Rodriguez', raised: 620.00, contactsAdded: 14, messagesDelivered: 42, lastDonation: '2026-02-19' },
    { id: 3, name: 'Sophia Chen', raised: 1150.00, contactsAdded: 22, messagesDelivered: 66, lastDonation: '2026-02-21' },
    { id: 4, name: 'Noah Williams', raised: 430.00, contactsAdded: 10, messagesDelivered: 30, lastDonation: '2026-02-18' },
    { id: 5, name: 'Ava Patel', raised: 890.00, contactsAdded: 16, messagesDelivered: 48, lastDonation: '2026-02-21' },
    { id: 6, name: 'Mason Thompson', raised: 345.00, contactsAdded: 8, messagesDelivered: 24, lastDonation: '2026-02-17' },
    { id: 7, name: 'Isabella Garcia', raised: 975.00, contactsAdded: 20, messagesDelivered: 60, lastDonation: '2026-02-20' },
    { id: 8, name: 'Ethan Brown', raised: 560.00, contactsAdded: 12, messagesDelivered: 36, lastDonation: '2026-02-19' },
    { id: 9, name: 'Mia Davis', raised: 1290.00, contactsAdded: 24, messagesDelivered: 72, lastDonation: '2026-02-21' },
    { id: 10, name: 'Lucas Martinez', raised: 410.00, contactsAdded: 9, messagesDelivered: 27, lastDonation: '2026-02-16' },
    { id: 11, name: 'Charlotte Wilson', raised: 725.00, contactsAdded: 15, messagesDelivered: 45, lastDonation: '2026-02-20' },
    { id: 12, name: 'Oliver Anderson', raised: 667.50, contactsAdded: 13, messagesDelivered: 39, lastDonation: '2026-02-18' },
  ],
  dailyProgress: [] as DailyDataPoint[],
  recentActivity: [
    { donor: 'Anonymous', amount: 50.00, studentName: 'Emma Johnson', timeAgo: '2 hours ago' },
    { donor: 'John Smith', amount: 100.00, studentName: 'Mia Davis', timeAgo: '5 hours ago' },
    { donor: 'Sarah Williams', amount: 25.00, studentName: 'Sophia Chen', timeAgo: '8 hours ago' },
    { donor: 'Michael T.', amount: 75.00, studentName: 'Ava Patel', timeAgo: '11 hours ago' },
    { donor: 'Jennifer R.', amount: 150.00, studentName: 'Isabella Garcia', timeAgo: '14 hours ago' },
    { donor: 'Anonymous', amount: 30.00, studentName: 'Charlotte Wilson', timeAgo: '18 hours ago' },
    { donor: 'David K.', amount: 200.00, studentName: 'Mia Davis', timeAgo: '1 day ago' },
    { donor: 'Lisa M.', amount: 50.00, studentName: 'Emma Johnson', timeAgo: '1 day ago' },
    { donor: 'Robert P.', amount: 100.00, studentName: 'Sophia Chen', timeAgo: '2 days ago' },
  ] as ActivityItem[],
};

fundraiserData.dailyProgress = generateDailyData(fundraiserData.totalRaised, fundraiserData.goal);

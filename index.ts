export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  nameEn: string;
  minAmount: number;
  returnRate: number;
  duration: number;
  color: string;
  icon: string;
}

export interface Investment {
  id: string;
  userId: string;
  packageId: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'pending';
  expectedReturn: number;
  actualReturn?: number;
}

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'مبتدئ',
    nameEn: 'Starter',
    minAmount: 10,
    returnRate: 15,
    duration: 7,
    color: 'from-blue-500 to-blue-600',
    icon: '🌱'
  },
  {
    id: 'bronze',
    name: 'برونز',
    nameEn: 'Bronze',
    minAmount: 100,
    returnRate: 25,
    duration: 15,
    color: 'from-orange-500 to-orange-600',
    icon: '🥉'
  },
  {
    id: 'silver',
    name: 'فضية',
    nameEn: 'Silver',
    minAmount: 500,
    returnRate: 40,
    duration: 30,
    color: 'from-gray-400 to-gray-500',
    icon: '🥈'
  },
  {
    id: 'gold',
    name: 'ذهبية',
    nameEn: 'Gold',
    minAmount: 1000,
    returnRate: 60,
    duration: 60,
    color: 'from-yellow-500 to-yellow-600',
    icon: '🥇'
  }
];

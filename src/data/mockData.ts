import { Issue, Department, StatCard, Activity } from '../types';

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'status_change',
    message: 'Status changed from Open to In Progress',
    user: 'John Doe',
    timestamp: '2025-01-21T10:30:00Z'
  },
  {
    id: '2',
    type: 'comment',
    message: 'Work crew dispatched to location',
    user: 'Jane Smith',
    timestamp: '2025-01-21T09:15:00Z'
  },
  {
    id: '3',
    type: 'assignment',
    message: 'Assigned to Public Works Department',
    user: 'Admin',
    timestamp: '2025-01-20T16:45:00Z'
  }
];

export const mockIssues: Issue[] = [
  {
    id: 'ISS-001',
    category: 'Road Maintenance',
    location: '123 Main St',
    priority: 'High',
    status: 'In Progress',
    assignedDept: 'Public Works',
    date: '2025-01-20',
    description: 'Large pothole causing traffic issues',
    images: ['https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg'],
    reporter: {
      name: 'John Smith',
      email: 'john@email.com',
      phone: '(555) 123-4567'
    },
    activities: mockActivities
  },
  {
    id: 'ISS-002',
    category: 'Street Light',
    location: '456 Oak Ave',
    priority: 'Medium',
    status: 'Open',
    assignedDept: 'Electrical',
    date: '2025-01-19',
    description: 'Street light flickering intermittently',
    images: ['https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg'],
    reporter: {
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 987-6543'
    },
    activities: []
  },
  {
    id: 'ISS-003',
    category: 'Waste Management',
    location: '789 Pine Rd',
    priority: 'Low',
    status: 'Resolved',
    assignedDept: 'Sanitation',
    date: '2025-01-18',
    description: 'Overflowing trash bin',
    images: ['https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg'],
    reporter: {
      name: 'Mike Wilson',
      email: 'mike@email.com',
      phone: '(555) 456-7890'
    },
    activities: []
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Public Works',
    totalIssues: 24,
    avgResolutionTime: '3.2 days',
    staff: 15,
    head: 'Robert Martinez'
  },
  {
    id: '2',
    name: 'Electrical',
    totalIssues: 18,
    avgResolutionTime: '2.1 days',
    staff: 8,
    head: 'Lisa Chen'
  },
  {
    id: '3',
    name: 'Sanitation',
    totalIssues: 31,
    avgResolutionTime: '1.8 days',
    staff: 12,
    head: 'David Brown'
  },
  {
    id: '4',
    name: 'Parks & Recreation',
    totalIssues: 12,
    avgResolutionTime: '4.5 days',
    staff: 6,
    head: 'Emily Davis'
  }
];

export const mockStats: StatCard[] = [
  {
    title: 'Total Issues',
    value: 85,
    trend: 12,
    icon: 'AlertCircle',
    color: 'text-blue-600'
  },
  {
    title: 'Pending',
    value: 23,
    trend: -5,
    icon: 'Clock',
    color: 'text-yellow-600'
  },
  {
    title: 'Resolved',
    value: 62,
    trend: 18,
    icon: 'CheckCircle',
    color: 'text-green-600'
  },
  {
    title: 'High Priority',
    value: 8,
    trend: 2,
    icon: 'AlertTriangle',
    color: 'text-red-600'
  }
];

export const chartData = {
  monthly: [
    { name: 'Jan', issues: 65, resolved: 58 },
    { name: 'Feb', issues: 78, resolved: 72 },
    { name: 'Mar', issues: 85, resolved: 79 },
    { name: 'Apr', issues: 92, resolved: 88 },
    { name: 'May', issues: 75, resolved: 71 },
    { name: 'Jun', issues: 88, resolved: 85 }
  ],
  departments: [
    { name: 'Public Works', resolved: 24 },
    { name: 'Electrical', resolved: 18 },
    { name: 'Sanitation', resolved: 31 },
    { name: 'Parks & Rec', resolved: 12 }
  ],
  categories: [
    { name: 'Road Maintenance', value: 35, fill: '#4F46E5' },
    { name: 'Street Lights', value: 20, fill: '#10B981' },
    { name: 'Waste Management', value: 25, fill: '#F59E0B' },
    { name: 'Parks', value: 20, fill: '#EF4444' }
  ]
};
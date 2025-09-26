export interface Issue {
  _id: string;  // ✅ matches MongoDB
  title: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'; // ✅ includes Closed
  description: string;
  images: string[];
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  department: {
    _id: string;
    name: string;
  };
  reporter: {
    name: string;
    email: string;
    phone: string;
  };
  assignedTo?: string;
  resolvedAt?: string;
  notes: Note[]; // ✅ replaces activities
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  message: string;
  author: string;
  createdAt: string;
}

export interface Department {
  _id: string;   // ✅ use Mongo _id
  name: string;
  totalIssues?: number;
  avgResolutionTime?: string;
  staff: number;
  head: string;
}

export interface StatCard {
  title: string;
  value: number;
  trend: number;
  icon: string;
  color: string;
}

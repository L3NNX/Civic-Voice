export interface Department {
  _id: string;
  name: string;
  head: string;
  email: string;
  phone: string;
  staff: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  totalIssues?: number;
  resolvedIssues?: number;
  avgResolutionTime?: string;
}

export interface CreateDepartmentRequest {
  name: string;
  head: string;
  email: string;
  phone: string;
  staff: number;
  description?: string;
}

export type UpdateDepartmentRequest = Partial<CreateDepartmentRequest>

export interface Issue {
  _id: string;
  title: string;
  description: string;
  category: 'Road Maintenance' | 'Street Light' | 'Waste Management' | 'Parks & Recreation' | 'Water Supply' | 'Drainage' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  department: string; // Department ID
  reporter: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  assignedTo?: string;
  resolvedAt?: string;
  notes: Array<{
    message: string;
    author: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  category: Issue['category'];
  priority: Issue['priority'];
  location: Issue['location'];
  department: string;
  reporter: Issue['reporter'];
  images?: string[];
  assignedTo?: string;
}

export interface UpdateIssueRequest extends Partial<CreateIssueRequest> {
  status?: Issue['status'];
  resolvedAt?: string;
  notes?: Issue['notes'];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}

export interface StatsData {
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  issuesByDepartment: Array<{
    _id: string;
    count: number;
  }>;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
}
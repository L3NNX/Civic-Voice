import type {
  Department,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
  ApiResponse,
  ApiErrorResponse,
  StatsData,
  HealthCheckResponse
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Department API methods
  async getDepartments() {
    return this.request<ApiResponse<Department[]>>('/departments');
  }

  async getDepartment(id: string) {
    return this.request<ApiResponse<Department>>(`/departments/${id}`);
  }

  async createDepartment(data: CreateDepartmentRequest) {
    return this.request<ApiResponse<Department>>('/departments/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDepartment(id: string, data: UpdateDepartmentRequest) {
    return this.request<ApiResponse<Department>>(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDepartment(id: string) {
    return this.request<ApiErrorResponse>(`/departments/${id}`, {
      method: 'DELETE',
    });
  }

  // Issue API methods
  async getIssues() {
    return this.request<ApiResponse<Issue[]>>('/issues');
  }

  async createIssue(data: CreateIssueRequest) {
    return this.request<ApiResponse<Issue>>('/issues', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateIssue(id: string, data: UpdateIssueRequest) {
    return this.request<ApiResponse<Issue>>(`/issues/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteIssue(id: string) {
    return this.request<ApiErrorResponse>(`/issues/${id}`, {
      method: 'DELETE',
    });
  }

  // Stats API methods
  async getStats() {
    return this.request<ApiResponse<StatsData>>('/stats');
  }

  // Health check
  async healthCheck() {
    return this.request<HealthCheckResponse>('/health');
  }
}

export const apiService = new ApiService();
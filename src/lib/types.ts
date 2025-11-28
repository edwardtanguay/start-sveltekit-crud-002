export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  employeeId: number;
  salary: number;
  startDate: string; // ISO date string
  position: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

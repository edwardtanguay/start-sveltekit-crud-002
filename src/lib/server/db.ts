import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Employee } from '$lib/types';

const DB_PATH = join(process.cwd(), 'src/lib/data/employees.json');

interface EmployeeData {
  employees: Employee[];
}

export function readEmployees(): Employee[] {
  try {
    const data = readFileSync(DB_PATH, 'utf-8');
    const parsed: EmployeeData = JSON.parse(data);
    return parsed.employees;
  } catch (error) {
    console.error('Error reading employees:', error);
    return [];
  }
}

export function writeEmployees(employees: Employee[]): void {
  try {
    const data: EmployeeData = { employees };
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing employees:', error);
    throw new Error('Failed to save employees');
  }
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

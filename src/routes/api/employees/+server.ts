import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readEmployees, writeEmployees, generateId } from '$lib/server/db';
import type { Employee } from '$lib/types';

// GET all employees
export const GET: RequestHandler = async () => {
  try {
    const employees = readEmployees();
    return json({ success: true, data: employees });
  } catch (error) {
    return json({ success: false, error: 'Failed to fetch employees' }, { status: 500 });
  }
};

// POST create new employee
export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const employees = readEmployees();
    
    const newEmployee: Employee = {
      id: generateId(),
      name: body.name,
      email: body.email,
      department: body.department,
      employeeId: body.employeeId,
      salary: body.salary,
      startDate: body.startDate,
      position: body.position
    };
    
    employees.push(newEmployee);
    writeEmployees(employees);
    
    return json({ success: true, data: newEmployee }, { status: 201 });
  } catch (error) {
    return json({ success: false, error: 'Failed to create employee' }, { status: 500 });
  }
};

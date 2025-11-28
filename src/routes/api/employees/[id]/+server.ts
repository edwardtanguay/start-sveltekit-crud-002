import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { readEmployees, writeEmployees } from '$lib/server/db';

// PUT update employee
export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const { id } = params;
    const body = await request.json();
    const employees = readEmployees();
    
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return json({ success: false, error: 'Employee not found' }, { status: 404 });
    }
    
    employees[index] = {
      ...employees[index],
      name: body.name,
      email: body.email,
      department: body.department,
      employeeId: body.employeeId,
      salary: body.salary,
      startDate: body.startDate,
      position: body.position
    };
    
    writeEmployees(employees);
    
    return json({ success: true, data: employees[index] });
  } catch (error) {
    return json({ success: false, error: 'Failed to update employee' }, { status: 500 });
  }
};

// DELETE employee
export const DELETE: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;
    const employees = readEmployees();
    
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      return json({ success: false, error: 'Employee not found' }, { status: 404 });
    }
    
    employees.splice(index, 1);
    writeEmployees(employees);
    
    return json({ success: true, data: { id } });
  } catch (error) {
    return json({ success: false, error: 'Failed to delete employee' }, { status: 500 });
  }
};

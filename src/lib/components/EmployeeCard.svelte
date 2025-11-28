<script lang="ts">
	import {
		Pencil,
		Trash2,
		Mail,
		Briefcase,
		Calendar,
		DollarSign,
		Hash
	} from 'lucide-svelte';
	import type { Employee } from '$lib/types';

	interface Props {
		employee: Employee;
		onEdit: (employee: Employee) => void;
		onDelete: (id: string) => void;
	}

	let { employee, onEdit, onDelete }: Props = $props();

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0
		}).format(amount);
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="employee-card">
	<div class="card-header">
		<h3>{employee.name}</h3>
		<div class="card-actions">
			<button
				class="icon-btn edit-btn"
				onclick={() => onEdit(employee)}
				title="Edit"
			>
				<Pencil size={16} />
			</button>
			<button
				class="icon-btn delete-btn"
				onclick={() => onDelete(employee.id)}
				title="Delete"
			>
				<Trash2 size={16} />
			</button>
		</div>
	</div>

	<div class="card-body">
		<div class="field">
			<div class="field-icon">
				<Mail size={14} />
			</div>
			<div class="field-content">
				<span class="field-label">Email</span>
				<span class="field-value">{employee.email}</span>
			</div>
		</div>

		<div class="field">
			<div class="field-icon">
				<Briefcase size={14} />
			</div>
			<div class="field-content">
				<span class="field-label">Position</span>
				<span class="field-value">{employee.position}</span>
			</div>
		</div>

		<div class="field">
			<div class="field-icon">
				<Briefcase size={14} />
			</div>
			<div class="field-content">
				<span class="field-label">Department</span>
				<span class="field-value">{employee.department}</span>
			</div>
		</div>

		<div class="field">
			<div class="field-icon">
				<Hash size={14} />
			</div>
			<div class="field-content">
				<span class="field-label">Employee ID</span>
				<span class="field-value">{employee.employeeId}</span>
			</div>
		</div>

		<div class="field">
			<div class="field-icon">
				<DollarSign size={14} />
			</div>
			<div class="field-content">
				<span class="field-label">Salary</span>
				<span class="field-value"
					>{formatCurrency(employee.salary)}</span
				>
			</div>
		</div>

		<div class="field">
			<div class="field-icon">
				<Calendar size={14} />
			</div>
			<div class="field-content">
				<span class="field-label">Start Date</span>
				<span class="field-value">{formatDate(employee.startDate)}</span
				>
			</div>
		</div>
	</div>
</div>

<style>
	.employee-card {
		background: white;
		border-radius: 0.5rem;
		border: 1px solid var(--color-gray-200);
		overflow: hidden;
		transition: box-shadow 0.2s;
	}

	.employee-card:hover {
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: var(--color-gray-50);
		border-bottom: 1px solid var(--color-gray-200);
	}

	.card-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-gray-900);
	}

	.card-actions {
		display: flex;
		gap: 0.5rem;
	}

	.icon-btn {
		padding: 0.375rem;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.edit-btn {
		background-color: var(--color-blue-50, #eff6ff);
		color: var(--color-blue-600);
	}

	.edit-btn:hover {
		background-color: var(--color-blue-100, #dbeafe);
	}

	.delete-btn {
		background-color: var(--color-red-50, #fef2f2);
		color: var(--color-red-600);
	}

	.delete-btn:hover {
		background-color: var(--color-red-100, #fee2e2);
	}

	.card-body {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.field {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}

	.field-icon {
		color: var(--color-gray-400);
		padding-top: 0.125rem;
	}

	.field-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.field-label {
		font-size: 0.75rem;
		color: var(--color-gray-500);
		font-weight: 500;
	}

	.field-value {
		font-size: 0.875rem;
		color: var(--color-gray-900);
	}
</style>

<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { Employee } from '$lib/types';

	interface Props {
		isOpen: boolean;
		employee: Employee | null;
		onClose: () => void;
		onSave: (employee: Omit<Employee, 'id'>) => void;
	}

	let { isOpen = $bindable(), employee, onClose, onSave }: Props = $props();

	let formData = $state({
		name: '',
		email: '',
		department: '',
		employeeId: 0,
		salary: 0,
		startDate: '',
		position: ''
	});

	$effect(() => {
		if (employee) {
			formData = {
				name: employee.name,
				email: employee.email,
				department: employee.department,
				employeeId: employee.employeeId,
				salary: employee.salary,
				startDate: employee.startDate,
				position: employee.position
			};
		} else {
			formData = {
				name: '',
				email: '',
				department: '',
				employeeId: 0,
				salary: 0,
				startDate: '',
				position: ''
			};
		}
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		onSave(formData);
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}
</script>

{#if isOpen}
	<div class="modal-backdrop" onclick={handleBackdropClick}>
		<div class="modal-content">
			<div class="modal-header">
				<h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
				<button type="button" class="close-btn" onclick={onClose}>
					<X size={20} />
				</button>
			</div>

			<form onsubmit={handleSubmit}>
				<div class="form-grid">
					<div class="form-group">
						<label for="name">Name</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
						/>
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
						/>
					</div>

					<div class="form-group">
						<label for="department">Department</label>
						<input
							type="text"
							id="department"
							bind:value={formData.department}
							required
						/>
					</div>

					<div class="form-group">
						<label for="position">Position</label>
						<input
							type="text"
							id="position"
							bind:value={formData.position}
							required
						/>
					</div>

					<div class="form-group">
						<label for="employeeId">Employee ID</label>
						<input
							type="number"
							id="employeeId"
							bind:value={formData.employeeId}
							required
						/>
					</div>

					<div class="form-group">
						<label for="salary">Salary</label>
						<input
							type="number"
							id="salary"
							bind:value={formData.salary}
							required
						/>
					</div>

					<div class="form-group">
						<label for="startDate">Start Date</label>
						<input
							type="date"
							id="startDate"
							bind:value={formData.startDate}
							required
						/>
					</div>
				</div>

				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						onclick={onClose}
					>
						Cancel
					</button>
					<button type="submit" class="btn btn-primary">
						{employee ? 'Update' : 'Create'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modal-content {
		background: white;
		border-radius: 0.5rem;
		width: 100%;
		max-width: 600px;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		border-bottom: 1px solid var(--color-gray-200);
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-gray-900);
	}

	.close-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		color: var(--color-gray-500);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background-color: var(--color-gray-100);
		color: var(--color-gray-700);
	}

	form {
		padding: 1.5rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.form-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-gray-700);
	}

	input {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-gray-300);
		border-radius: 0.375rem;
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	input:focus {
		outline: none;
		border-color: var(--color-blue-500);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-gray-200);
	}

	.btn {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
	}

	.btn-secondary {
		background-color: white;
		color: var(--color-gray-700);
		border: 1px solid var(--color-gray-300);
	}

	.btn-secondary:hover {
		background-color: var(--color-gray-50);
	}

	.btn-primary {
		background-color: var(--color-blue-600);
		color: white;
	}

	.btn-primary:hover {
		background-color: var(--color-blue-700);
	}
</style>

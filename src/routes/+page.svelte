<script lang="ts">
	import { onMount } from 'svelte';
	import { Plus } from 'lucide-svelte';
	import type { Employee } from '$lib/types';
	import EmployeeModal from '$lib/components/EmployeeModal.svelte';
	import EmployeeCard from '$lib/components/EmployeeCard.svelte';
	import EmployeeTable from '$lib/components/EmployeeTable.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import DeleteConfirmDialog from '$lib/components/DeleteConfirmDialog.svelte';

	let employees = $state<Employee[]>([]);
	let filteredEmployees = $state<Employee[]>([]);
	let searchQuery = $state('');
	let isModalOpen = $state(false);
	let isDeleteDialogOpen = $state(false);
	let selectedEmployee = $state<Employee | null>(null);
	let employeeToDelete = $state<{ id: string; name: string } | null>(null);
	let sortField = $state<keyof Employee | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');

	onMount(async () => {
		await loadEmployees();
	});

	async function loadEmployees() {
		try {
			const response = await fetch('/api/employees');
			const result = await response.json();
			if (result.success) {
				employees = result.data;
				// Reapply search after loading
				handleSearch(searchQuery);
			}
		} catch (error) {
			console.error('Failed to load employees:', error);
		}
	}

	function handleSearch(query: string) {
		searchQuery = query.toLowerCase();
		if (!searchQuery) {
			filteredEmployees = [...employees]; // Reset from a copy
		} else {
			filteredEmployees = employees.filter(
				(emp) =>
					emp.name.toLowerCase().includes(searchQuery) ||
					emp.email.toLowerCase().includes(searchQuery) ||
					emp.department.toLowerCase().includes(searchQuery) ||
					emp.position.toLowerCase().includes(searchQuery)
			);
		}
		// Re-apply sort after search if there was an active sort
		if (sortField) {
			const field = sortField;
			filteredEmployees = [...filteredEmployees].sort((a, b) => {
				const aVal = a[field];
				const bVal = b[field];

				let comparison = 0;
				if (typeof aVal === 'string' && typeof bVal === 'string') {
					comparison = aVal.localeCompare(bVal);
				} else if (
					typeof aVal === 'number' &&
					typeof bVal === 'number'
				) {
					comparison = aVal - bVal;
				}

				return sortDirection === 'asc' ? comparison : -comparison;
			});
		}
	}

	function handleSort(field: keyof Employee) {
		if (sortField === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDirection = 'asc';
		}

		filteredEmployees = [...filteredEmployees].sort((a, b) => {
			const aVal = a[field];
			const bVal = b[field];

			let comparison = 0;
			if (typeof aVal === 'string' && typeof bVal === 'string') {
				comparison = aVal.localeCompare(bVal);
			} else if (typeof aVal === 'number' && typeof bVal === 'number') {
				comparison = aVal - bVal;
			}

			return sortDirection === 'asc' ? comparison : -comparison;
		});
	}

	function openCreateModal() {
		selectedEmployee = null;
		isModalOpen = true;
	}

	function openEditModal(employee: Employee) {
		selectedEmployee = employee;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		selectedEmployee = null;
	}

	async function handleSave(employeeData: Omit<Employee, 'id'>) {
		try {
			if (selectedEmployee) {
				// Update existing employee
				const response = await fetch(
					`/api/employees/${selectedEmployee.id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(employeeData)
					}
				);

				const result = await response.json();
				if (result.success) {
					await loadEmployees();
					closeModal();
				}
			} else {
				// Create new employee
				const response = await fetch('/api/employees', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(employeeData)
				});

				const result = await response.json();
				if (result.success) {
					await loadEmployees();
					closeModal();
				}
			}
		} catch (error) {
			console.error('Failed to save employee:', error);
		}
	}

	function openDeleteDialog(id: string) {
		const employee = employees.find((emp) => emp.id === id);
		if (employee) {
			employeeToDelete = { id: employee.id, name: employee.name };
			isDeleteDialogOpen = true;
		}
	}

	function closeDeleteDialog() {
		isDeleteDialogOpen = false;
		employeeToDelete = null;
	}

	async function confirmDelete() {
		if (!employeeToDelete) return;

		try {
			const response = await fetch(
				`/api/employees/${employeeToDelete.id}`,
				{
					method: 'DELETE'
				}
			);

			const result = await response.json();
			if (result.success) {
				await loadEmployees();
				closeDeleteDialog();
			}
		} catch (error) {
			console.error('Failed to delete employee:', error);
		}
	}
</script>

<svelte:head>
	<title>Employee Management</title>
</svelte:head>

<div class="container">
	<header class="header">
		<h1>Employee Management</h1>
		<p class="subtitle">Manage your team members efficiently</p>
	</header>

	<div class="toolbar">
		<SearchBar value={searchQuery} onSearch={handleSearch} />
		<button class="btn-primary" onclick={openCreateModal}>
			<Plus size={18} />
			Add Employee
		</button>
	</div>

	{#if filteredEmployees.length === 0}
		<div class="empty-state">
			<p>No employees found</p>
			{#if searchQuery}
				<p class="empty-subtitle">Try adjusting your search query</p>
			{:else}
				<p class="empty-subtitle">
					Get started by adding your first employee
				</p>
			{/if}
		</div>
	{:else}
		<!-- Desktop view: Table -->
		<div class="desktop-view">
			<EmployeeTable
				employees={filteredEmployees}
				onEdit={openEditModal}
				onDelete={openDeleteDialog}
				onSort={handleSort}
				{sortField}
				{sortDirection}
			/>
		</div>

		<!-- Mobile view: Cards -->
		<div class="mobile-view">
			{#each filteredEmployees as employee (employee.id)}
				<EmployeeCard
					{employee}
					onEdit={openEditModal}
					onDelete={openDeleteDialog}
				/>
			{/each}
		</div>
	{/if}
</div>

<EmployeeModal
	bind:isOpen={isModalOpen}
	employee={selectedEmployee}
	onClose={closeModal}
	onSave={handleSave}
/>

<DeleteConfirmDialog
	bind:isOpen={isDeleteDialogOpen}
	employeeName={employeeToDelete?.name || ''}
	onConfirm={confirmDelete}
	onCancel={closeDeleteDialog}
/>

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	@media (min-width: 768px) {
		.container {
			padding: 3rem 2rem;
		}
	}

	.header {
		margin-bottom: 2rem;
	}

	.header h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-gray-900);
	}

	@media (min-width: 768px) {
		.header h1 {
			font-size: 2.5rem;
		}
	}

	.subtitle {
		margin: 0.5rem 0 0 0;
		font-size: 1rem;
		color: var(--color-gray-600);
	}

	.toolbar {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	@media (min-width: 640px) {
		.toolbar {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
	}

	.btn-primary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		background-color: var(--color-blue-600);
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.btn-primary:hover {
		background-color: var(--color-blue-700);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: 0.5rem;
		border: 1px solid var(--color-gray-200);
	}

	.empty-state p {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--color-gray-900);
	}

	.empty-subtitle {
		margin-top: 0.5rem !important;
		font-size: 0.875rem !important;
		font-weight: 400 !important;
		color: var(--color-gray-500) !important;
	}

	.desktop-view {
		display: none;
	}

	@media (min-width: 1024px) {
		.desktop-view {
			display: block;
		}
	}

	.mobile-view {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 1024px) {
		.mobile-view {
			display: none;
		}
	}
</style>

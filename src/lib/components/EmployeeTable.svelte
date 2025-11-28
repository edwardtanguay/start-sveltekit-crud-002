<script lang="ts">
	import { Pencil, Trash2, ArrowUpDown } from 'lucide-svelte';
	import type { Employee } from '$lib/types';

	interface Props {
		employees: Employee[];
		onEdit: (employee: Employee) => void;
		onDelete: (id: string) => void;
		onSort: (field: keyof Employee) => void;
		sortField: keyof Employee | null;
		sortDirection: 'asc' | 'desc';
	}

	let {
		employees,
		onEdit,
		onDelete,
		onSort,
		sortField,
		sortDirection
	}: Props = $props();

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

	function getSortIcon(field: keyof Employee): boolean {
		return sortField === field;
	}
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th>
					<button class="sort-btn" onclick={() => onSort('name')}>
						Name
						{#if getSortIcon('name')}
							<ArrowUpDown
								size={14}
								class={sortDirection === 'asc'
									? 'rotate-180'
									: ''}
							/>
						{/if}
					</button>
				</th>
				<th>
					<button class="sort-btn" onclick={() => onSort('email')}>
						Email
						{#if getSortIcon('email')}
							<ArrowUpDown
								size={14}
								class={sortDirection === 'asc'
									? 'rotate-180'
									: ''}
							/>
						{/if}
					</button>
				</th>
				<th>
					<button
						class="sort-btn"
						onclick={() => onSort('department')}
					>
						Department
						{#if getSortIcon('department')}
							<ArrowUpDown
								size={14}
								class={sortDirection === 'asc'
									? 'rotate-180'
									: ''}
							/>
						{/if}
					</button>
				</th>
				<th>
					<button class="sort-btn" onclick={() => onSort('position')}>
						Position
						{#if getSortIcon('position')}
							<ArrowUpDown
								size={14}
								class={sortDirection === 'asc'
									? 'rotate-180'
									: ''}
							/>
						{/if}
					</button>
				</th>
				<th>
					<button
						class="sort-btn"
						onclick={() => onSort('employeeId')}
					>
						ID
						{#if getSortIcon('employeeId')}
							<ArrowUpDown
								size={14}
								class={sortDirection === 'asc'
									? 'rotate-180'
									: ''}
							/>
						{/if}
					</button>
				</th>
				<th>
					<button class="sort-btn" onclick={() => onSort('salary')}>
						Salary
						{#if getSortIcon('salary')}
							<ArrowUpDown
								size={14}
								class={sortDirection === 'asc'
									? 'rotate-180'
									: ''}
							/>
						{/if}
					</button>
				</th>
				<th>
					<button
						class="sort-btn"
						onclick={() => onSort('startDate')}
					>
						Start Date
						{#if getSortIcon('startDate')}
							<ArrowUpDown
								size={14}
								class={sortDirection === 'asc'
									? 'rotate-180'
									: ''}
							/>
						{/if}
					</button>
				</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each employees as employee (employee.id)}
				<tr>
					<td>{employee.name}</td>
					<td>{employee.email}</td>
					<td>{employee.department}</td>
					<td>{employee.position}</td>
					<td>{employee.employeeId}</td>
					<td>{formatCurrency(employee.salary)}</td>
					<td>{formatDate(employee.startDate)}</td>
					<td>
						<div class="action-buttons">
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
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		overflow-x: auto;
		background: white;
		border-radius: 0.5rem;
		border: 1px solid var(--color-gray-200);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background-color: var(--color-gray-50);
		border-bottom: 1px solid var(--color-gray-200);
	}

	th {
		padding: 0.75rem 1rem;
		text-align: left;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-gray-700);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.sort-btn {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-gray-700);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0;
		transition: color 0.2s;
	}

	.sort-btn:hover {
		color: var(--color-gray-900);
	}

	td {
		padding: 1rem;
		font-size: 0.875rem;
		color: var(--color-gray-900);
		border-bottom: 1px solid var(--color-gray-200);
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	tbody tr:hover {
		background-color: var(--color-gray-50);
	}

	.action-buttons {
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

	:global(.rotate-180) {
		transform: rotate(180deg);
	}
</style>

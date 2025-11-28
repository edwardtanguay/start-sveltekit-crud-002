<script lang="ts">
	import { AlertTriangle } from 'lucide-svelte';

	interface Props {
		isOpen: boolean;
		employeeName: string;
		onConfirm: () => void;
		onCancel: () => void;
	}

	let {
		isOpen = $bindable(),
		employeeName,
		onConfirm,
		onCancel
	}: Props = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	}
</script>

{#if isOpen}
	<div class="dialog-backdrop" onclick={handleBackdropClick}>
		<div class="dialog-content">
			<div class="dialog-icon">
				<AlertTriangle size={48} />
			</div>

			<h2>Delete Employee</h2>
			<p>
				Are you sure you want to delete <strong>{employeeName}</strong>?
				This action cannot be undone.
			</p>

			<div class="dialog-actions">
				<button class="btn btn-secondary" onclick={onCancel}>
					Cancel
				</button>
				<button class="btn btn-danger" onclick={onConfirm}>
					Delete
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.dialog-backdrop {
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

	.dialog-content {
		background: white;
		border-radius: 0.5rem;
		width: 100%;
		max-width: 400px;
		padding: 1.5rem;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
		text-align: center;
	}

	.dialog-icon {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
		color: var(--color-red-600);
	}

	h2 {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-gray-900);
	}

	p {
		margin: 0 0 1.5rem 0;
		font-size: 0.875rem;
		color: var(--color-gray-600);
		line-height: 1.5;
	}

	strong {
		color: var(--color-gray-900);
		font-weight: 600;
	}

	.dialog-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
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

	.btn-danger {
		background-color: var(--color-red-600);
		color: white;
	}

	.btn-danger:hover {
		background-color: var(--color-red-700);
	}
</style>

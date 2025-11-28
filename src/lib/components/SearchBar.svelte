<script lang="ts">
	import { Search } from 'lucide-svelte';

	interface Props {
		value: string;
		onSearch: (value: string) => void;
	}

	let { value = $bindable(), onSearch }: Props = $props();
</script>

<div class="search-container">
	<div class="search-icon">
		<Search size={18} />
	</div>
	<input
		type="text"
		placeholder="Search employees..."
		bind:value
		oninput={(e) => onSearch(e.currentTarget.value)}
		class="search-input"
	/>
</div>

<style>
	.search-container {
		position: relative;
		width: 100%;
		max-width: 400px;
	}

	.search-icon {
		position: absolute;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-gray-400);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 0.625rem 0.75rem 0.625rem 2.5rem;
		border: 1px solid var(--color-gray-300);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		transition: all 0.2s;
		background-color: white;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-blue-500);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.search-input::placeholder {
		color: var(--color-gray-400);
	}
</style>

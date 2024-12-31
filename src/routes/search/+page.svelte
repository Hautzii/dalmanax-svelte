<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { fetchAlmanaxByDate } from '$lib/api/almanax';
	import { fade } from 'svelte/transition';
	import { search_almanax } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';

	let selectedDate = new Date().toISOString().split('T')[0];
	let fetchFunction = () => fetchAlmanaxByDate(selectedDate);
	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="flex min-h-[calc(100vh-64px)] flex-col text-[#ffffe6]">
	{#if mounted}
		<div in:fade={{ duration: 500 }}>
			<h1 class="mt-8 py-8 text-center text-3xl font-bold">{search_almanax()}</h1>
		</div>
	{:else}
		<div class="invisible">
			<h1 class="mt-8 py-8 text-center text-3xl font-bold">{search_almanax()}</h1>
		</div>
	{/if}

	<div class="mx-auto mb-8 flex w-[65vw] justify-center" in:fade={{ duration: 300 }}>
		<div class="flex flex-1 items-center justify-center">
			<Card {fetchFunction} />
		</div>
	</div>
</div>

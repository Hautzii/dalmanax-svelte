<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { fetchAlmanaxByDate } from '$lib/api/almanax';
	import { fade } from 'svelte/transition';
	import { search_almanax } from '$lib/paraglide/messages';

	let selectedDate = new Date().toISOString().split('T')[0];
	let fetchFunction = () => fetchAlmanaxByDate(selectedDate);
</script>

<div class="flex min-h-[calc(100vh-64px)] flex-col text-[#ffffe6]" in:fade={{ duration: 300 }}>
	<h1 class="mt-8 py-8 text-center text-3xl font-bold">{search_almanax()}</h1>

	<div class="mx-auto mb-8 flex w-[65vw] justify-center">
		<div class="flex flex-1 items-center justify-center">
			<Card {fetchFunction} />
		</div>
	</div>
</div>

<script>
	import Card from '$lib/components/Card.svelte';
	import { fetchDailyAlmanax } from '$lib/api/almanax';
	import { daily_almanax } from '$lib/paraglide/messages';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="flex min-h-[calc(100vh-64px)] flex-col text-[#ffffe6]">
	<div>
		<h1 class="mt-8 py-8 text-center text-3xl font-semibold">{daily_almanax()}</h1>
	</div>
	<div class="flex flex-1 items-center justify-center">
		<Card fetchFunction={fetchDailyAlmanax} />
	</div>
</div>

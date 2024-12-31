<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import { fetchWeeklyAlmanax } from '$lib/api/almanax';
	import { onMount } from 'svelte';
	import type { AlmanaxState } from '$lib/types/AlmanaxState';
	import { weekly_almanax } from '$lib/paraglide/messages';

	let items: AlmanaxState[] = [];
	let mounted = false;

	onMount(async () => {
		items = await fetchWeeklyAlmanax();
		mounted = true;
	});
</script>

<div class="flex min-h-[calc(100vh-64px)] flex-col text-[#ffffe6]">
	<div>
		<h1 class="mt-8 py-8 text-center text-3xl font-semibold">{weekly_almanax()}</h1>
	</div>
	<div class="flex flex-1 items-center justify-center">
		<Carousel {items} />
	</div>
</div>

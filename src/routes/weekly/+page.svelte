<script lang="ts">
    import Carousel from '$lib/components/Carousel.svelte';
    import { fetchWeeklyAlmanax } from '$lib/api/almanax';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import type { AlmanaxState } from '$lib/types/AlmanaxState';
    import { weekly_almanax } from '$lib/paraglide/messages';

    let items: AlmanaxState[] = [];
    
    onMount(async () => {
        items = await fetchWeeklyAlmanax();
    });
</script>

<div class="min-h-[calc(100vh-64px)] text-[#ffffe6] flex flex-col" in:fade={{ duration: 300 }}>
    <h1 class="text-center text-3xl font-bold py-8 mt-8">{weekly_almanax()}</h1>
    <div class="flex-1 flex items-center justify-center">
        <Carousel {items} />
    </div>
</div>

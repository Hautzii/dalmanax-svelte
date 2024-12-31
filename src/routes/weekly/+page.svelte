<script lang="ts">
    import Carousel from '$lib/components/Carousel.svelte';
    import { fetchWeeklyAlmanax } from '$lib/api/almanax';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import type { AlmanaxState } from '$lib/types/AlmanaxState';
    import { weekly_almanax } from '$lib/paraglide/messages';

    let items: AlmanaxState[] = [];
    let mounted = false;
    
    onMount(async () => {
        items = await fetchWeeklyAlmanax();
        mounted = true;
    });
</script>

<div class="min-h-[calc(100vh-64px)] text-[#ffffe6] flex flex-col">
    {#if mounted}
        <div in:fade={{ duration: 500 }}>
            <h1 class="text-center text-3xl font-bold py-8 mt-8">{weekly_almanax()}</h1>
        </div>
    {:else}
        <div class="invisible">
            <h1 class="text-center text-3xl font-bold py-8 mt-8">{weekly_almanax()}</h1>
        </div>
    {/if}
    <div class="flex-1 flex items-center justify-center" in:fade={{ duration: 300 }}>
        <Carousel {items} />
    </div>
</div>

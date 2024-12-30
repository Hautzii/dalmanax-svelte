<script lang="ts">
    import Carousel from '$lib/components/Carousel.svelte';
    import { fetchWeeklyAlmanax } from '$lib/api/almanax';
    import { onMount } from 'svelte';
    import type { AlmanaxState } from '$lib/types/AlmanaxState';

    let items: AlmanaxState[] = [];
    
    onMount(async () => {
        items = await fetchWeeklyAlmanax();
    });
</script>

<Carousel {items} />

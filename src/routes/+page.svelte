<script>
    import Card from '$lib/components/Card.svelte';
    import { fetchDailyAlmanax } from '$lib/api/almanax';
    import { daily_almanax } from '$lib/paraglide/messages';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    let mounted = false;
    
    onMount(() => {
        mounted = true;
    });
</script>

<div class="min-h-[calc(100vh-64px)] text-[#ffffe6] flex flex-col">
    {#if mounted}
        <div in:fade={{ duration: 500 }}>
            <h1 class="text-center text-3xl font-bold py-8 mt-8">{daily_almanax()}</h1>
        </div>
    {:else}
        <div class="invisible">
            <h1 class="text-center text-3xl font-bold py-8 mt-8">{daily_almanax()}</h1>
        </div>
    {/if}
    <div class="flex-1 flex items-center justify-center" in:fade={{ duration: 300 }}>
        <Card fetchFunction={fetchDailyAlmanax} />
    </div>
</div>

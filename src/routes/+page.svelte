<script>
    import Card from '$lib/components/Card.svelte';
    import { fetchDailyAlmanax } from '$lib/api/almanax';
    import { daily_almanax } from '$lib/paraglide/messages';
</script>

<div class="min-h-[calc(100vh-64px)] text-[#ffffe6] flex flex-col">
    <h1 class="text-center text-3xl font-bold py-8 mt-8">{daily_almanax()}</h1>
    <div class="flex-1 flex items-center justify-center">
        <Card fetchFunction={fetchDailyAlmanax} />
    </div>
</div>

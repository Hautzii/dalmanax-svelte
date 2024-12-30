<script>
    import Card from '$lib/components/Card.svelte';
    import { fetchDailyAlmanax } from '$lib/api/almanax';
</script>

<Card fetchFunction={fetchDailyAlmanax} />

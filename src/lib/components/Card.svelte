<script lang="ts">
    import { onMount } from 'svelte';
    import { type, loot, quantity } from '$lib/paraglide/messages';
    import type { AlmanaxState } from '../types/AlmanaxState';
    
    export let fetchFunction: () => Promise<AlmanaxState | AlmanaxState[]>;
    let items: AlmanaxState[] = [];
    
    onMount(async () => {
        const result = await fetchFunction();
        items = Array.isArray(result) ? result : [result];
    });

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
</script>

{#each items as data}
    <div class="bg-white rounded-lg shadow-md p-6 m-4 w-[65vw] mx-auto">
        <div class="grid grid-cols-[1fr_auto] gap-6">
            <div class="space-y-4">
                <time class="text-lg font-semibold">{formatDate(data.date)}</time>
                <p class="text-gray-600">{data.description}</p>
                <div class="space-y-2">
                    <p><span class="font-medium">{type()}:</span> {data.type}</p>
                    <p><span class="font-medium">{loot()}:</span> {data.loot}</p>
                    <p><span class="font-medium">{quantity()}:</span> {data.quantity}</p>
                </div>
            </div>
            <div class="flex items-center">
                <img src={data.image} alt={data.loot} class="max-h-48 object-contain" />
            </div>
        </div>
    </div>
{/each}

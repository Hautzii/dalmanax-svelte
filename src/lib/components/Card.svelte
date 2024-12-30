<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { type, loot, quantity } from '$lib/paraglide/messages';
    import type { AlmanaxState } from '../types/AlmanaxState';
    
    export let fetchFunction: () => Promise<AlmanaxState>;
    let data: AlmanaxState | null = null;

    onMount(async () => {
        data = await fetchFunction();
    });

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
</script>

<style>
    .almanax-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 2.5rem 2rem;
        height: 300px;
        gap: 1rem;
    }

    .almanax-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .almanax-image {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 1rem;
    }

    @media (max-width: 600px) {
        .almanax-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
            height: 400px;
        }

        .almanax-text {
            gap: 0.5rem;
        }

        .almanax-image {
            padding: 1rem 0;
        }

        .almanax-image img {
            max-width: 100px;
        }

        :global(p) {
            font-size: 0.875rem;
        }
    }

    @media (min-width: 1600px) {
        .almanax-image {
            padding-left: 5rem;
        }
    }
</style>

<div class="w-[65vw] mx-auto">
    {#if data}
        <div class="bg-[#1e1e1e] rounded-xl shadow-md" transition:fade={{ duration: 300 }}>
            <div class="almanax-grid">
                <div class="almanax-text">
                    <time class="text-xl font-semibold">{formatDate(data.date)}</time>
                    <div class="text-base">
                        <span class="font-normal">{type()}:</span>
                        <span class="font-semibold">{data.type}</span>
                    </div>
                    <p class="text-base text-[#ffffe6] font-semibold">{data.description}</p>
                    <div class="space-y-2 text-base">
                        <div>
                            <span class="font-normal">{loot()}:</span>
                            <span class="font-semibold">{data.loot}</span>
                        </div>
                        <div>
                            <span class="font-normal">{quantity()}:</span>
                            <span class="font-semibold">{data.quantity}</span>
                        </div>
                    </div>
                </div>
                <div class="almanax-image">
                    <img src={data.image} alt={data.loot} class="max-h-48 object-contain" />
                </div>
            </div>
        </div>
    {/if}
</div>

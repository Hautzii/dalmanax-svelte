<script lang="ts">
    import type { AlmanaxState } from '../types/AlmanaxState';
    import { onMount } from 'svelte';
    import { type, loot, quantity } from '$lib/paraglide/messages';

    export let items: AlmanaxState[] = [];
    let currentIndex = 0;

    const next = () => {
        currentIndex = (currentIndex + 1) % items.length;
    };

    const prev = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
</script>

<div class="relative w-[65vw] mx-auto">
    {#if items.length > 0}
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="grid grid-cols-[1fr_auto] gap-6">
                <div class="space-y-4">
                    <time class="text-lg font-semibold">{formatDate(items[currentIndex].date)}</time>
                    <p class="text-gray-600">{items[currentIndex].description}</p>
                    <div class="space-y-2">
                        <p><span class="font-medium">{type()}:</span> {items[currentIndex].type}</p>
                        <p><span class="font-medium">{loot()}:</span> {items[currentIndex].loot}</p>
                        <p><span class="font-medium">{quantity()}:</span> {items[currentIndex].quantity}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <img src={items[currentIndex].image} alt={items[currentIndex].loot} class="max-h-48 object-contain" />
                </div>
            </div>

            <!-- Navigation Dots -->
            <div class="flex justify-center gap-2 mt-4">
                {#each items as _, i}
                    <button 
                        class="w-2 h-2 rounded-full transition-colors {i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}"
                        on:click={() => currentIndex = i}
                    />
                {/each}
            </div>
        </div>

        <!-- Arrow Buttons -->
        <button 
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            on:click={prev}
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button 
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            on:click={next}
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    {/if}
</div>

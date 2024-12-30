<script lang="ts">
    import type { AlmanaxState } from '$lib/types/AlmanaxState';
    import { onMount } from 'svelte';
    import { type, loot, quantity } from '$lib/paraglide/messages';
    import { fly, fade, crossfade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    export let items: AlmanaxState[] = [];
    let currentIndex = 0;
    let direction = 1;

    const next = () => {
        direction = 1;
        currentIndex = (currentIndex + 1) % items.length;
    };

    const prev = () => {
        direction = -1;
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
</script>

<style>
    .carousel-container {
        position: relative;
        overflow: hidden;
        height: 300px;
        width: 100%;
    }

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

    .dots-container {
        position: absolute;
        bottom: 1rem;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem;
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
    {#if items.length > 0}
        <div class="relative py-6">
            <button
                class="absolute left-[-3rem] top-1/2 -translate-y-1/2 text-2xl opacity-50 hover:opacity-100 transition-opacity z-10"
                on:click={prev}
            >
                ←
            </button>
            <button
                class="absolute right-[-3rem] top-1/2 -translate-y-1/2 text-2xl opacity-50 hover:opacity-100 transition-opacity z-10"
                on:click={next}
            >
                →
            </button>

            <div class="carousel-container">
                {#key currentIndex}
                    <div 
                        class="absolute inset-0 bg-[#1e1e1e] rounded-xl shadow-md"
                        in:fly|local={{ x: direction * 100, duration: 300 }}
                        out:fly|local={{ x: direction * -100, duration: 300 }}
                    >
                        <div class="almanax-grid" in:fade={{ duration: 150 }}>
                            <div class="almanax-text">
                                <time class="text-xl font-semibold">{formatDate(items[currentIndex].date)}</time>
                                
                                <p><span class="font-normal">{type()}:</span> <span class="font-semibold">{items[currentIndex].type}</span></p>
                                
                                <p class="text-base text-[#ffffe6] font-semibold">{items[currentIndex].description}</p>

                                <div class="space-y-2 text-base">
                                    <p><span class="font-normal">{loot()}:</span> <span class="font-semibold">{items[currentIndex].loot}</span></p>
                                    <p><span class="font-normal">{quantity()}:</span> <span class="font-semibold">{items[currentIndex].quantity}</span></p>
                                </div>
                            </div>
                            <div class="almanax-image">
                                <img src={items[currentIndex].image} alt={items[currentIndex].type} class="max-h-48 object-contain" />
                            </div>
                        </div>

                        <div class="dots-container">
                            {#each Array(items.length) as _, i}
                                <button
                                    class="w-2.5 h-2.5 rounded-full transition-colors duration-200 {currentIndex === i ? 'bg-[#ffffe6]' : 'bg-[#10100e]'}"
                                    aria-label={`Go to slide ${i + 1}`}
                                    on:click={() => {
                                        direction = i > currentIndex ? 1 : -1;
                                        currentIndex = i;
                                    }}
                                />
                            {/each}
                        </div>
                    </div>
                {/key}
            </div>
        </div>
    {/if}
</div>
<script lang="ts">
    import type { AlmanaxState } from '$lib/types/AlmanaxState';
    import { type, loot, quantity } from '$lib/paraglide/messages';
    import { fade } from 'svelte/transition';
    import Toast from './Toast.svelte';
    import emblaCarouselSvelte from 'embla-carousel-svelte';

    export let items: AlmanaxState[] = [];
    let showToast = false;
    let currentIndex = 0;
    let api: any;
    let descriptionElements: HTMLParagraphElement[] = [];

    $: if (items.length > 0 && descriptionElements.length > 0) {
        descriptionElements.forEach(element => {
            if (element) {
                const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
                const height = element.offsetHeight;
                const lines = height / lineHeight;
                
                if (lines > 3) {
                    element.style.fontSize = '0.875rem';
                } else {
                    element.style.fontSize = '1rem';
                }
            }
        });
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, 2000);
    }

    const onInit = (e: any) => {
        api = e.detail;
        api.on('select', () => {
            currentIndex = api.selectedScrollSnap();
        });
    };

    const scrollTo = (index: number) => {
        api?.scrollTo(index);
    };
</script>

<div class="w-[65vw] mx-auto">
    {#if items.length > 0}
        <div class="relative py-6" in:fade={{ duration: 300 }}>
            <div class="relative">
                <div
                    use:emblaCarouselSvelte={{ options: { loop: true }, plugins: [] }}
                    on:emblaInit={onInit}
                    class="overflow-hidden"
                >
                    <div class="flex">
                        {#each items as item, i}
                            <div class="flex-[0_0_100%] min-w-0">
                                <div class="bg-[#1e1e1e] rounded-xl shadow-md h-[300px]">
                                    <div class="grid grid-cols-[2fr_1fr] p-10 h-full gap-4">
                                        <div class="flex flex-col justify-between h-full">
                                            <time class="text-xl font-semibold">{formatDate(item.date)}</time>
                                            <div class="text-base">
                                                <span class="font-normal">{type()}:</span>
                                                <span class="font-semibold">{item.type}</span>
                                            </div>
                                            <p bind:this={descriptionElements[i]} class="text-base text-[#ffffe6] font-semibold">{item.description}</p>
                                            <div class="space-y-2 text-base">
                                                <div>
                                                    <span class="font-normal">{loot()}:</span>
                                                    <button
                                                        class="hover:text-[#f15a22] transition-colors font-semibold"
                                                        on:click={() => copyToClipboard(item.loot)}
                                                    >
                                                        {item.loot}
                                                    </button>
                                                </div>
                                                <div>
                                                    <span class="font-normal">{quantity()}:</span>
                                                    <span class="font-semibold">{item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex justify-center items-center pl-4">
                                            <img src={item.image} alt={item.loot} class="max-h-48 object-contain" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
                <button
                    class="absolute left-[-3rem] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#1e1e1e] text-[#ffffe6] hover:bg-[#1e1e1e]/90"
                    on:click={() => api?.scrollPrev()}
                >
                    <span class="text-xl">←</span>
                </button>
                <button
                    class="absolute right-[-3rem] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#1e1e1e] text-[#ffffe6] hover:bg-[#1e1e1e]/90"
                    on:click={() => api?.scrollNext()}
                >
                    <span class="text-xl">→</span>
                </button>
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {#each items as _, i}
                        <button
                            class="w-2.5 h-2.5 rounded-full transition-colors duration-200 {currentIndex === i ? 'bg-[#ffffe6]' : 'bg-[#10100e]'}"
                            aria-label="Go to slide {i + 1}"
                            on:click={() => scrollTo(i)}
                        />
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>

{#if showToast}
    <Toast />
{/if}
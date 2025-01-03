<script lang="ts">
    import type { AlmanaxState } from '$lib/types/AlmanaxState';
    import { type, loot, quantity } from '$lib/paraglide/messages';
    import Toast from './Toast.svelte';
    import emblaCarouselSvelte from 'embla-carousel-svelte';

    export let items: AlmanaxState[] = [];
    let showToast = false;
    let currentIndex = 0;
    let api: any;
    let descriptionElements: HTMLParagraphElement[] = [];

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

    const prevSlide = () => {
        api?.scrollPrev();
    };

    const nextSlide = () => {
        api?.scrollNext();
    };

    const goToSlide = (index: number) => {
        api?.scrollTo(index);
    };
</script>

<div class="w-[65vw] mx-auto -mt-24">
    {#if items.length > 0}
        <div class="relative py-6">
            <button
                class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-[#1e1e1e] p-2 rounded-full shadow-md z-10"
                on:click={() => prevSlide()}
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6z" />
                </svg>
            </button>
            <button
                class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-[#1e1e1e] p-2 rounded-full shadow-md z-10"
                on:click={() => nextSlide()}
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m10 18 6-6-6-6-1.4 1.4 4.6 4.6-4.6 4.6z" />
                </svg>
            </button>
            <div class="relative">
                <div
                    use:emblaCarouselSvelte={{ options: { loop: true }, plugins: [] }}
                    on:emblaInit={onInit}
                    class="overflow-hidden"
                >
                    <div class="flex">
                        {#each items as item, i}
                            <div class="flex-[0_0_100%] min-w-0">
                                <div class="relative py-6">
                                    <div class="bg-[#1e1e1e] rounded-xl shadow-md h-[300px] relative">
                                        <div class="grid grid-cols-[2fr_1fr] p-10 h-[300px] gap-4">
                                            <div class="flex flex-col gap-3">
                                                <time class="text-xl font-semibold">{formatDate(item.date)}</time>
                                                <div class="text-base">
                                                    <span class="font-normal">{type()}:</span>
                                                    <span class="font-semibold">{item.type}</span>
                                                </div>
                                                <p bind:this={descriptionElements[i]} class="text-base text-[#ffffe6] font-semibold">{item.description}</p>
                                                <div>
                                                    <span class="font-normal">{loot()}:</span>
                                                    <button class="hover:text-[#f15a22] transition-colors font-semibold" on:click={() => copyToClipboard(item.loot)}>
                                                        {item.loot}
                                                    </button>
                                                </div>
                                                <div>
                                                    <span class="font-normal">{quantity()}:</span>
                                                    <span class="font-semibold">{item.quantity}</span>
                                                </div>
                                            </div>
                                            <div class="flex justify-center items-center pl-4">
                                                <img src={item.image} alt={item.loot} class="max-h-48 object-contain" />
                                            </div>
                                        </div>
                                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {#each items as _, i}
                                                <!-- svelte-ignore element_invalid_self_closing_tag -->
                                                <button
                                                    class="w-2.5 h-2.5 rounded-full transition-colors duration-200 {currentIndex === i ? 'bg-[#ffffe6]' : 'bg-[#10100e]'}"
                                                    aria-label="Go to slide {i + 1}"
                                                    on:click={() => goToSlide(i)}
                                                />
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

{#if showToast}
    <Toast />
{/if}
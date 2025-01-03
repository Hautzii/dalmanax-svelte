<script lang="ts">
    import { onMount } from 'svelte';
    import type { AlmanaxState } from '$lib/types/AlmanaxState';
    import { type, loot, quantity } from '$lib/paraglide/messages';
    import Toast from './Toast.svelte';

    export let fetchFunction: () => Promise<AlmanaxState>;
    export let key = 0; 
    let data: AlmanaxState | undefined = undefined;
    let showToast = false;
    let descriptionElement: HTMLParagraphElement;
    let currentData: AlmanaxState;

    $: if (key) {
        fetchFunction().then(newData => {
            data = newData;
        });
    }

    onMount(async () => {
        data = await fetchFunction();
        currentData = data;
    });

    $: if (data) {
        currentData = data;
    }

    $: if (currentData && descriptionElement) {
        const lineHeight = parseInt(window.getComputedStyle(descriptionElement).lineHeight);
        const height = descriptionElement.offsetHeight;
        const lines = height / lineHeight;
        
        if (lines > 3) {
            descriptionElement.style.lineHeight = '1.4';
            descriptionElement.style.paddingBottom = '0';
        } else {
            descriptionElement.style.lineHeight = '1.4';
            descriptionElement.style.paddingBottom = '0';
        }
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, 2000);
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
</script>

<div class="w-[65vw] mx-auto -mt-24">
    {#if data !== undefined}
        <div class="relative py-6">
            <div class="bg-[#1e1e1e] rounded-xl shadow-md h-[300px]">
                <div class="grid grid-cols-[2fr_1fr] p-10 h-[300px] gap-4">
                    <div class="flex flex-col gap-4">
                        <time class="text-xl font-semibold">{formatDate(currentData.date)}</time>   
                        <div class="text-base">
                            <span class="font-normal">{type()}:</span>
                            <span class="font-semibold">{currentData.type}</span>
                        </div>
                        <p bind:this={descriptionElement} class="text-base text-[#ffffe6] font-semibold">{currentData.description}</p>
                        <div>
                            <span class="font-normal">{loot()}:</span>
                            <button
                                class="hover:text-[#f15a22] transition-colors font-semibold"
                                on:click={() => copyToClipboard(currentData.loot)}
                            >
                                {currentData.loot}
                            </button>
                        </div>
                        <div>
                            <span class="font-normal">{quantity()}:</span>
                            <span class="font-semibold">{currentData.quantity}</span>
                        </div>
                    </div>
                    <div class="flex justify-center items-center pl-4">
                        <img src={currentData.image} alt={currentData.loot} class="max-h-48 object-contain" />
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

{#if showToast}
    <Toast />
{/if}
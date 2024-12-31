<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { type, loot, quantity } from '$lib/paraglide/messages';
    import type { AlmanaxState } from '../types/AlmanaxState';
    import Toast from './Toast.svelte';

    export let fetchFunction: () => Promise<AlmanaxState>;
    let data: AlmanaxState | undefined;
    let showToast = false;

    onMount(async () => {
        data = await fetchFunction();
    });

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, 2000);
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    $: currentData = data as AlmanaxState;
</script>

<Toast bind:show={showToast} />

<div class="w-[65vw] mx-auto">
    {#if data !== undefined}
        <div class="bg-[#1e1e1e] rounded-xl shadow-md" in:fade={{ duration: 300 }}>
            <div class="grid grid-cols-[2fr_1fr] p-10 h-[300px] gap-4">
                <div class="flex flex-col justify-between h-full">
                    <time class="text-xl font-semibold">{formatDate(currentData.date)}</time>
                    <div class="text-base">
                        <span class="font-normal">{type()}:</span>
                        <span class="font-semibold">{currentData.type}</span>
                    </div>
                    <p class="text-base text-[#ffffe6] font-semibold">{currentData.description}</p>
                    <div class="space-y-2 text-base">
                        <div>
                            <span class="font-normal">{loot()}:</span>
                            <button
                                class="hover:text-gray-300 transition-colors font-semibold"
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
                </div>
                <div class="flex justify-center items-center pl-4">
                    <img src={currentData.image} alt={currentData.loot} class="max-h-48 object-contain" />
                </div>
            </div>
        </div>
    {/if}
</div>

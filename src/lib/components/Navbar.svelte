<script lang="ts">
    import { daily, weekly } from '$lib/paraglide/messages';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    let isOpen = false;
    let mounted = false;

    onMount(() => {
        mounted = true;
    });
</script>

{#if mounted}
    <nav class="bg-[#10100e] py-4 px-6" in:fade={{ duration: 300 }}>
        <div class="max-w-7xl mx-auto flex justify-between items-center h-8">
            <div class="flex items-center gap-2">
                <img src="/Dolmanax.webp" alt="Logo" class="h-12 w-12" />
                <a href="/" aria-label="Daily Almanax" class="text-2xl font-bold text-[#ffffe6]">Dalmanax</a>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex gap-6 items-center text-base font-semibold">
                <a href="/" aria-label="Daily Almanax" class="text-[#ffffe6] hover:text-[#ffffe6]/70 transition-colors text-xl">{daily()}</a>
                <a href="/weekly" aria-label="Weekly Almanax" class="text-[#ffffe6] hover:text-[#ffffe6]/70 transition-colors text-xl">{weekly()}</a>
                <a href="/search" aria-label="Search Almanax">
                    <img src="/search.svg" alt="Search" class="w-5 h-5 mt-[0.25rem] hover:opacity-70 transition-opacity" />
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button
                class="md:hidden text-[#ffffe6]"
                on:click={() => (isOpen = !isOpen)}
                aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {#if isOpen}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    {:else}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    {/if}
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        {#if isOpen}
            <div class="md:hidden mt-4 text-base font-semibold" transition:fade={{ duration: 200 }}>
                <a href="/" class="block px-4 py-2 text-[#ffffe6] hover:bg-[#2a2a2a]">{daily()}</a>
                <a href="/weekly" class="block px-4 py-2 text-[#ffffe6] hover:bg-[#2a2a2a]">{weekly()}</a>
                <a href="/search" class="flex items-center gap-2 px-4 py-2 text-[#ffffe6] hover:bg-[#2a2a2a]">
                    <img src="/search.svg" alt="Search" class="w-4 h-4 hover:opacity-70 transition-opacity" />
                </a>
            </div>
        {/if}
    </nav>
{:else}
    <nav class="bg-[#10100e] py-4 px-6 opacity-0">
        <div class="max-w-7xl mx-auto flex justify-between items-center h-8">
            <div class="flex items-center gap-2">
                <img src="/Dolmanax.webp" alt="Logo" class="h-12 w-12" />
                <a href="/" aria-label="Daily Almanax" class="text-2xl font-bold text-[#ffffe6]">Dalmanax</a>
            </div>
        </div>
    </nav>
{/if}
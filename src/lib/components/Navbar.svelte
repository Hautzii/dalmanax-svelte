<script lang="ts">
    import { daily, weekly, almanax_search } from '$lib/paraglide/messages';
    let isOpen = false;
</script>

<nav class="bg-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center gap-2">
            <img src="/Dolmanax.webp" alt="Logo" class="h-8 w-8" />
            <a href="/" aria-label="Daily Almanax" class="text-xl font-bold">Dalmanax</a>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex gap-6">
            <a href="/" aria-label="Daily Almanax" class="text-gray-600 hover:text-blue-500">{daily()}</a>
            <a href="/weekly" aria-label="Weekly Almanax" class="text-gray-600 hover:text-blue-500">{weekly()}</a>
            <a href="/search" aria-label="Search Almanax" class="text-gray-600 hover:text-blue-500">{almanax_search()}</a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden" on:click={() => isOpen = !isOpen}>
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
        <div class="md:hidden pt-4 pb-2 space-y-2">
            <a href="/" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">{daily()}</a>
            <a href="/weekly" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">{weekly()}</a>
            <a href="/search" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">{almanax_search()}</a>
        </div>
    {/if}
</nav>

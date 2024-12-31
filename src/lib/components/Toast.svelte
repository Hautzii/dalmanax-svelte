<script lang="ts">
    import { fade } from 'svelte/transition';
    import { clipboard } from '$lib/paraglide/messages';
    export let show = false;
</script>

{#if show}
    <div
        class="fixed left-1/2 bottom-4 z-50 -translate-x-1/2 transform rounded-lg bg-[#10100e] px-4 py-2 text-[#ffffe6]"
        transition:fade={{ duration: 150 }}
    >
        {clipboard()}
    </div>
{/if}

<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	let { children } = $props();
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<ParaglideJS {i18n}>
	{#if mounted}
		<div class="h-screen bg-[#10100e] font-['Montserrat'] text-base overflow-hidden">
			<Navbar />
			<main class="h-[calc(100vh-theme(spacing.16))] container mx-auto px-4 overflow-hidden">
				{@render children()}
			</main>
		</div>
	{:else}
		<div class="h-screen bg-[#10100e] font-['Montserrat'] text-base overflow-hidden opacity-0">
			<!-- Loading placeholder -->
		</div>
	{/if}
</ParaglideJS>

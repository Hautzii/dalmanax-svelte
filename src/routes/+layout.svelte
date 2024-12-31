<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<ParaglideJS {i18n}>
	<div class="h-screen bg-[#10100e] font-['Montserrat'] text-base overflow-hidden">
		<Navbar />
		<main class="h-[calc(100vh-theme(spacing.16))] container mx-auto px-4 overflow-hidden">
			{@render children()}
		</main>
	</div>
</ParaglideJS>

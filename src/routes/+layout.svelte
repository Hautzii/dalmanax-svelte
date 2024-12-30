<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<Navbar />
	<main class="container mx-auto px-4 py-8">
		{@render children()}
	</main>
</ParaglideJS>

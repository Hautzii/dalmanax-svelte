<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { fetchAlmanaxByDate } from '$lib/api/almanax';
	import { search_almanax } from '$lib/paraglide/messages';
	import { page } from '$app/stores';

	const today = new Date();
	let selectedDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
		.toISOString()
		.split('T')[0];
	let key = 0;

	function handleDateSelect(date: string) {
		selectedDate = date;
		key++;
	}

	const fetchSelectedDate = async () => {
		return fetchAlmanaxByDate(selectedDate);
	};

	$: console.log('Page params:', $page.params);
</script>

<div class="flex min-h-[calc(100vh-64px)] flex-col text-[#ffffe6]">
	<div>
		<div class="flex justify-center items-center">
			<h1 class="mt-8 py-8 text-center text-3xl font-semibold">{search_almanax()}</h1>
		</div>
		<div class="flex justify-center items-center">
			<DatePicker onDateSelect={handleDateSelect} language={$page.params.lang} initialDate={selectedDate} />
		</div>
	</div>
	<div class="flex flex-1 items-center justify-center mb-[2.5rem]">
		<Card fetchFunction={fetchSelectedDate} key={key} />
	</div>
</div>

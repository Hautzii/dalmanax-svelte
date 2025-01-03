<script lang="ts">
import CalendarIcon from "lucide-svelte/icons/calendar";
import { type DateValue, getLocalTimeZone, parseDate } from "@internationalized/date";
import { cn } from "$lib/utils";
import { Button } from "$lib/components/ui/button";
import { Calendar } from "$lib/components/ui/calendar";
import * as Popover from "$lib/components/ui/popover";
import { onMount } from "svelte";

export let onDateSelect: (date: string) => void;
export let initialDate: string | undefined = undefined;
export let language: string = 'en';

let value: DateValue | undefined = undefined;
let open = false;

onMount(() => {
  if (initialDate) {
    value = parseDate(initialDate);
  }
});

function formatDate(date: Date): string {
  console.log('Current language:', language);
  const formatter = new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  const formatted = formatter.format(date);
  console.log('Formatted date:', formatted);
  return formatted;
}

$: if (value) {
  const date = value.toDate(getLocalTimeZone());
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const formattedDate = utcDate.toISOString().split('T')[0];
  onDateSelect(formattedDate);
  open = false;
}
</script>

<Popover.Root bind:open>
  <Popover.Trigger asChild let:builder>
    <Button
      class={cn(
        "w-[150px] justify-center font-normal bg-[#1e1e1e] text-[#ffffe6]"
      )}
      builders={[builder]}
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {value ? formatDate(value.toDate(getLocalTimeZone())) : "Select a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content
    class="w-auto p-0 bg-[#1e1e1e] text-[#ffffe6] rounded-lg shadow-lg"
  >
    <div class="calendar-wrapper">
      <Calendar
        bind:value
        initialFocus
        class={cn(
          "p-3",
          "[&_button]:text-[#ffffe6]",
          "[&_button:hover]:bg-[#ffffe6]/10",
          "[&_.rdp-caption]:text-[#ffffe6]",
          "[&_.rdp-day]:text-[#ffffe6]",
          "[&_th:not(:first-child)]:text-[#ffffe6]",
          "[&_th:first-child]:text-red-500",
          "[&_td:nth-child(7n+1)_button]:text-red-500"
        )}
      />
    </div>
  </Popover.Content>
</Popover.Root>
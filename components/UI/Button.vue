<template>
  <button :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>

const props = defineProps({
  active: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
});

const classes = computed(() => {
  return [
    "h-10",
    "w-h-auto",
    "py-2",
    "px-6",
    "border",
    "rounded",
    "text-sm",
    {
      "bg-slate-200 text-slate-400 border-slate-100": props.disabled,
    },
    {
      "hover:bg-orange-600 border-0 bg-orange-500 text-white": props.active,
    },
    {
      "border-orange-500 text-orange-500 bg-white": !props.active && !props.disabled,
    },
  ]; 4
});

</script>
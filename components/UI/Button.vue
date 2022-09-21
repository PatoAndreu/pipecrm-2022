<script setup lang="ts">

interface Props {
  active: boolean
  disabled?: boolean
  pending?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false,
  pending: false
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
      "bg-slate-200 text-slate-400 border-slate-100": props.disabled
    },
    {
      "hover:bg-orange-600 border-0 bg-orange-500 text-white": props.active
    },
    {
      "border-orange-500 text-orange-500 bg-white": !props.active && !props.disabled
    }
  ];
});

</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
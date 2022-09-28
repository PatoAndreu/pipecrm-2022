<script setup lang="ts">

import { ChevronDownIcon, ChevronUpIcon, SearchIcon, XIcon } from "@heroicons/vue/outline";
import { onMounted, onUpdated, computed, ref } from "#imports";

let selectedOption = ref(null);
let searchInput    = ref("");
let showSelectBox  = ref(false);

const emit = defineEmits(["update:modelValue"]);

interface Props {
  field?: string;
  type?: string;
  options: [];
  disabled: boolean;
  modelValue?: object;
  top?: boolean;
}

const props =  withDefaults(defineProps<Props>(), {
  field: "name",
  type: "other",
  options: null,
  disabled: false,
  modelValue: null,
  top: true
});

onMounted(async () => {

  const handleEscape = (e) => {
    if (e.key === "Esc" || e.key === "Escape") {
      showSelectBox.value = false;
    }
  };
  document.addEventListener("keydown", handleEscape);

  await props;
  if (props.modelValue) {
    selectedOption.value = props.modelValue;
  }
});

onUpdated(async () => {
  await props;
  if (props.modelValue) {
    selectedOption.value = props.modelValue;
  }
});

const setOption = (option) => {
  selectedOption.value = { ...option };
  emit("update:modelValue", option ? option : {});
  showSelectBox.value = false;
  searchInput.value   = "";
};

const searchCriteria = computed(() => {
  if (!searchInput) {
    return props.options;
  }
  if (props.type === "user") {
    return props.options.filter(option => option.firstName.toLowerCase().includes(searchInput.value.toLowerCase())
      || option.lastName.toLowerCase().includes(searchInput.value.toLowerCase()));
  }
  if (props.type === "array") {
    return props.options.filter(option => option.toLowerCase().includes(searchInput.value.toLowerCase()));
  }
  return props.options.filter(option => option[props.field].toLowerCase().includes(searchInput.value.toLowerCase()));

});

const getClass = (option) => {
  if (props.type === "array") {
    return selectedOption.value.toLowerCase() === option.toLowerCase() ? "bg-cyan-50" : "";
  }
  return selectedOption.value?.id === option.id ? "bg-cyan-50" : "";
};

</script>
<template>
  <div class="w-full relative">
    <slot name="label"></slot>
    <div class="h-10 border rounded text-left p-2 capitalize"
         :class="disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
         @click="showSelectBox = !showSelectBox"
         :disabled="disabled">
      <template v-if="type === 'user'">
        {{ selectedOption?.firstName }} {{ selectedOption?.lastName }}
      </template>
      <template v-if="type === 'array'">
        {{ selectedOption }}
      </template>
      <template v-if="type === 'other'">
        {{ selectedOption?.name }}
      </template>
      <ChevronDownIcon class="h-5 absolute right-4 bottom-2" v-if="!showSelectBox" />
      <ChevronUpIcon class="h-5 absolute right-4 bottom-2" v-else />
    </div>
    <Transition name="fade">
      <div v-if="showSelectBox" class="w-full bg-white border absolute z-10 capitalize" :class="top ? 'bottom-12':'mt-1'">
        <div class="h-16 p-3 relative bg-sky-100">
          <SearchIcon class="h-6 text-cyan-400 absolute pointer-events-none right-6 mt-2" v-if="!searchInput" />
          <XIcon class="h-6 text-cyan-400 absolute  right-6 mt-2 cursor-pointer" v-else @click="searchInput = ''" />
          <input type="text" class="w-full h-10 rounded p-4 " placeholder="Buscar" v-model="searchInput">
        </div>
        <div class="mt-2 overflow-y-scroll max-h-60">
          <div class="h-10 hover:bg-cyan-50 p-2 pl-4 cursor-pointer"
               v-if="!searchInput" @click="setOption(null)">
          </div>

          <template v-for="option in searchCriteria" v-if="searchCriteria.length > 0">
            <div class="w-full h-10 hover:bg-cyan-50 p-2 pl-4 cursor-pointer"
                 :class="getClass(option)"
                 @click="setOption(option)"
            >
              <span v-if="type === 'user'">
                {{ option.firstName }} {{ option.lastName }}
              </span>
              <span v-else-if="type === 'array'">
                {{ option }}
              </span>
              <span else>
                {{ option.name }}
              </span>
            </div>
          </template>

          <div v-else>
            <div class="w-full h-10 p-2 pl-4 text-slate-400">
              No se encontraron resultados
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<template>
  <div class="relative">
    <Transition name="fade">
      <div v-if="showSelectBox" class="w-full bg-white border absolute bottom-14">
        <div class="w-full h-16 p-3 relative bg-sky-100">
          <SearchIcon class="h-6 text-cyan-400 absolute pointer-events-none right-6 mt-2" v-if="!searchInput" />
          <XIcon class="h-6 text-cyan-400 absolute  right-6 mt-2 cursor-pointer" v-else @click="searchInput = ''" />
          <input type="text" class="w-full h-10 rounded p-4 " placeholder="Buscar" v-model="searchInput">
        </div>
        <div class="mt-2 overflow-y-scroll max-h-60">
          <div class="w-full h-10 hover:bg-cyan-50 p-2 pl-4 cursor-pointer" @click="setOption(option)"
            v-if="!searchInput">
          </div>

          <template v-for="option in searchCriteria" v-if="searchCriteria.length > 0">
            <div class="w-full h-10 hover:bg-cyan-50 p-2 pl-4 cursor-pointer" @click="setOption(option)">
              {{ option.name }}
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
    <div>
      <label class="block mb-2">{{ name }}</label>
      <button class="h-12 w-full border rounded text-left p-2" @click="showSelectBox = !showSelectBox">
        {{ selectedOption.name }}
        <ChevronDownIcon class="h-5 absolute right-4 bottom-3" v-if="!showSelectBox" />
        <ChevronUpIcon class="h-5 absolute right-4 bottom-3" v-else />
      </button>
    </div>
  </div>

</template>

<script setup>

import { SearchIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from "@heroicons/vue/outline";

let selectedOption = ref({ id: null, name: null });
let searchInput = ref('');
let showSelectBox = ref(false);

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  name: { type: String, required: true, default: null },
  options: { type: Array, required: true, default: [] },
  modelValue: { type: Object, required: true, default: null },
});

const setOption = (option) => {
  selectedOption.value = { ...option }
  emit('update:modelValue', option ? option : {});
  showSelectBox.value = false;
  searchInput.value = '';
};

const searchCriteria = computed(() => {

  if (!searchInput) {
    return props.options;
  } else {
    return props.options.filter(option => option.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  }

});

</script>
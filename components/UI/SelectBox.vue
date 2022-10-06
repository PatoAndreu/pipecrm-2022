<script setup lang="ts">
  import { ChevronDownIcon, ChevronUpIcon, SearchIcon, XIcon } from '@heroicons/vue/outline'
  import { onMounted, onUpdated, computed, ref } from '#imports'

  let selectedOption = ref(null)
  let searchInput = ref('')
  let showSelectBox = ref(false)

  const emit = defineEmits(['update:modelValue'])

  interface Props {
    field?: string
    type?: string
    options: []
    disabled: boolean
    modelValue?: object | string
    top?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    field: 'name',
    type: 'other',
    options: null,
    disabled: false,
    modelValue: null,
    top: true
  })

  onMounted(async () => {
    const handleEscape = (e: { key: string }) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        showSelectBox.value = false
      }
    }
    document.addEventListener('keydown', handleEscape)

    if (props.modelValue) {
      selectedOption.value = props.modelValue
    }
  })

  onUpdated(async () => {
    if (props.modelValue) {
      selectedOption.value = props.modelValue
    }
  })

  const setOption = (option) => {
    selectedOption.value = option ? { ...option } : null
    emit('update:modelValue', option ? option : null)
    showSelectBox.value = false
    searchInput.value = ''
  }

  const searchCriteria = computed(() => {
    if (!searchInput) {
      return props.options
    }
    if (props.type === 'user') {
      return props.options.filter(
        (option) =>
          option.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
          option.lastName.toLowerCase().includes(searchInput.value.toLowerCase())
      )
    }
    if (props.type === 'array') {
      return props.options.filter((option) =>
        option.toLowerCase().includes(searchInput.value.toLowerCase())
      )
    }
    return props.options.filter((option) =>
      option[props.field].toLowerCase().includes(searchInput.value.toLowerCase())
    )
  })

  const getClass = (option) => {
    if (props.type === 'array') {
      return selectedOption?.value?.toLowerCase() === option.toLowerCase() ? 'bg-cyan-50' : ''
    }
    return selectedOption.value?.id === option.id ? 'bg-cyan-50' : ''
  }
</script>
<template>
  <div class="relative w-full">
    <slot name="label"></slot>
    <div
      class="h-10 rounded border p-2 text-left capitalize"
      :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
      @click="showSelectBox = !showSelectBox"
      :disabled="disabled">
      <div v-if="type === 'user'">
        {{ selectedOption?.firstName }} {{ selectedOption?.lastName }}
      </div>
      <div v-if="type === 'array'">
        {{ selectedOption }}
      </div>
      <div v-if="type === 'other'">
        {{ selectedOption?.name || 'seleccione...' }}
      </div>
      <ChevronDownIcon class="absolute right-4 bottom-2 h-5" v-if="!showSelectBox" />
      <ChevronUpIcon class="absolute right-4 bottom-2 h-5" v-else />
    </div>
    <Transition name="fade">
      <div
        v-if="showSelectBox"
        class="absolute z-10 w-full border bg-white capitalize"
        :class="top ? 'bottom-12' : 'mt-1'">
        <div class="relative h-16 bg-sky-100 p-3">
          <SearchIcon
            class="pointer-events-none absolute right-6 mt-2 h-6 text-cyan-400"
            v-if="!searchInput" />
          <XIcon
            class="absolute right-6 mt-2 h-6 cursor-pointer text-cyan-400"
            v-else
            @click="searchInput = ''" />
          <input
            type="text"
            class="h-10 w-full rounded p-4"
            placeholder="Buscar"
            v-model="searchInput" />
        </div>
        <div class="mt-2 max-h-60 overflow-y-scroll">
          <div
            class="h-10 cursor-pointer p-2 pl-4 hover:bg-cyan-50"
            v-if="!searchInput"
            @click="setOption(null)">
            (Sin valor)
          </div>

          <template v-for="option in searchCriteria" v-if="searchCriteria.length > 0">
            <div
              class="h-10 w-full cursor-pointer p-2 pl-4 hover:bg-cyan-50"
              :class="getClass(option)"
              @click="setOption(option)">
              <span v-if="type === 'user'"> {{ option.firstName }} {{ option.lastName }} </span>
              <span v-else-if="type === 'array'">
                {{ option }}
              </span>
              <span else>
                {{ option.name }}
              </span>
            </div>
          </template>

          <div v-else>
            <div class="h-10 w-full p-2 pl-4 text-slate-400">No se encontraron resultados</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

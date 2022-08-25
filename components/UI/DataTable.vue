<template>
  <div>

    <div v-if="data.length > 0">
      <div
        class="ml-[2%] w-[96%] max-h-[600px] ring-1 ring-slate-900/5 h-auto overflow-auto scroll-smooth flex bg-slate-100">
        <div class="w-[400px] h-16 p-3 relative ">
          <SearchIcon class="h-6 bg-white  text-cyan-400 absolute pointer-events-none right-6 mt-2 pl-1"
            v-if="!searchInput" />
          <XIcon class="h-6 text-cyan-400 absolute  right-6 mt-2 cursor-pointer" v-else @click="searchInput = ''" />
          <input type="text" class="w-full h-10 rounded p-4 bg-white border border-slate-300 text-sm  
          placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Buscar nombre, teléfono, direcciones de correo electrónico o empresa" v-model="searchInput">
        </div>
      </div>
      <!-- Tabla -->
      <div class="ml-[2%] w-[96%] max-h-[600px] ring-1 ring-slate-900/5 h-auto overflow-auto scroll-smooth">
        <!-- Header -->

        <div class="h-10 flex text-center uppercase text-[12px] font-medium sticky top-0">
          <div class="min-w-[200px] pt-3 bg-slate-100" v-for="(item, key) in columns" :key="key">
            {{ item.title }}
          </div>
        </div>

        <!-- Items -->
        <div class="h-10 flex  capitalize text-center text-[12px]" v-for="(row, key) in paginated" :key="key">
          <div class="
              min-w-[200px]
              max-w-[200px]
              truncate
              text-cyan-600
              font-medium
              pt-3
              px-4
              border-t
            " :class="getClass(r)" v-for="(r, k) in columns" :key="k">
            {{ row[r.column] }}
          </div>
        </div>

      </div>
      <!-- Table Footer -->
      <div class="grid grid-cols-3 gap-4 h-full mt-6 mb-40">
        <div class="text-center text-sm text-slate-400">
          Mostrando {{ indexStart + 1 }} a {{ indexEnd }}
          de <b> {{ (!searchInput) ? data.length : paginated.length }} registros </b>
        </div>
        <div class="flex justify-center items-center">
          <div class="group flex cursor-pointer">
            <ChevronLeftIcon class="h-5  ml-2"
              :class="currentPage == 1 ? 'cursor-not-allowed text-slate-300' : 'text-cyan-600 group-hover:text-cyan-400 cursor-pointer'" />
            <div class="text-sm"
              :class="currentPage == 1 ? 'cursor-not-allowed text-slate-300' : 'text-cyan-600 group-hover:text-cyan-400 cursor-pointer'"
              @click="prevPage">Anterior</div>
          </div>

          <button class="h-6 w-6 bg-cyan-50 text-cyan-600 rounded-md mx-4 ring-1">
            {{ currentPage }}
          </button>

          <div class="group flex" :class="showNextPageArrow ? 'cursor-pointer' : 'cursor-not-allowed text-slate-400'"
            @click="nextPage">

            <div class="text-sm"
              :class="showNextPageArrow ? 'text-cyan-600 group-hover:text-cyan-400' : 'text-slate-300'">
              Siguiente
            </div>
            <ChevronRightIcon class="h-5 ml-2 "
              :class="showNextPageArrow ? 'text-cyan-600 group-hover:text-cyan-400' : 'text-slate-300'" />
          </div>

          <div class="ml-4 flex justify-center">
            <div class="flex text-sm items-center relative cursor-pointer group" @click="toggleTablePerPage">
              <div for="perpage" class="text-cyan-600 font-semibold ml-2 group-hover:text-cyan-400">
                {{ perPage }} por página
              </div>
              <ChevronDownIcon class="h-5 text-cyan-600 ml-2 group-hover:text-cyan-400" />
            </div>
            <div v-if="showDropdownPerPage"
              class="w-40 h-auto p-2 border rounded mt-7 shadow-lg bg-white absolute text-sm text-slate-500">
              <button class="px-4 py-2 hover:text-slate-400 text-left break-word"
                v-for="(value, key) in dropdownPerPageValues" :key="key" @click="setTablePerPage(value)">
                {{ value }} por página
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center text-sm text-slate-400"> No existen registros para mostrar</div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },
  data: {
    type: Array,
    required: true,
    default: []
  },
  searchColumns: {
    type: Array,
    required: true,
    default: []
  },
})

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, XIcon } from "@heroicons/vue/outline";

import { useUIStore } from "@/stores/ui";
const uiStore = useUIStore();

let rowsLeft = ref()
let showNextPageArrow = ref(true)
let perPage = ref(5)
let showDropdownPerPage = ref(false)
let currentPage = ref(1)
let searchInput = ref('');

const dropdownPerPageValues = ref([5, 10, 20, 50, 100])

onMounted(() => {
  rowsLeft.value = (props.data.length) - (perPage.value * currentPage.value)
  showNextPageArrow.value = (rowsLeft.value > 0) ? showNextPageArrow.value = true : showNextPageArrow.value = false
})


const setTablePerPage = (perPageSelected) => {
  perPage.value = perPageSelected
  showDropdownPerPage.value = false
}

const indexStart = computed(() => {
  return (currentPage.value - 1) * perPage.value;
})

const indexEnd = computed(() => {
  return indexStart.value + perPage.value;
})

const paginated = computed(() => {

  if (props.data.length > 0) {
    if (searchInput.value.length >= 1) {
      return props.data.filter(
        field =>
          field.name.toLowerCase().includes(searchInput.value.toLowerCase())
          || field.email.toLowerCase().includes(searchInput.value.toLowerCase())
          || field.company.toLowerCase().includes(searchInput.value.toLowerCase())
          || field.phoneNumber.includes(searchInput.value)
      ).slice(indexStart.value, indexEnd.value)
    } else {
      return props.data.slice(indexStart.value, indexEnd.value);
    }
  }
})

const getClass = (row) => {
  switch (row.type) {
    case "email":
      return "normal-case";

    case "date":
      return "normal-case";

    default:
      return "capitalize";
      break;
  }
}


const nextPage = () => {

  if (showNextPageArrow.value) {
    currentPage.value++;
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const toggleTablePerPage = () => {
  showDropdownPerPage.value = !showDropdownPerPage.value
}

watch(() => [currentPage.value, perPage.value, searchInput.value], ([currentPageNewV, perPageNewV], [currentPageOldV, perPageOldV]) => {

  rowsLeft.value = (props.data.length) - (perPage.value * currentPage.value)

  if (perPageNewV != perPageOldV) currentPage.value = 1
  console.log(paginated.value.length);
  console.log(perPage.value);
  return (rowsLeft.value > 0 && paginated.value.length > perPage.value) ? showNextPageArrow.value = true : showNextPageArrow.value = false
})

</script>
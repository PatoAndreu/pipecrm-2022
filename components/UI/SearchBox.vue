<script setup lang="ts">
import { SearchIcon, XIcon } from "@heroicons/vue/outline"
import { useUIStore } from "~~/stores/uiStore"

const uiStore = useUIStore()

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Esc" || e.key === "Escape") {
      uiStore.showSearchBox = false
    }
  }
  document.addEventListener("keydown", handleEscape)
})
</script>
<template>
  <Transition duration="550" name="nested" appear>
    <div
      v-show="uiStore.showSearchBox"
      class="inner top-15 absolute z-10 h-full w-full bg-slate-50">
      <XIcon
        class="absolute right-5 top-6 ml-2 h-8 cursor-pointer text-slate-500 transition-all hover:text-slate-300"
        @click="uiStore.toggleSearchBox" />

      <div class="mt-4 flex items-center justify-center">
        <input type="text" class="h-12 w-1/3 border" />
        <div
          class="flex h-12 w-20 cursor-pointer items-center justify-center rounded-tr-md rounded-br-md border-y border-r bg-cyan-500 transition-all hover:bg-cyan-600">
          <SearchIcon class="h-6 text-white" />
        </div>
      </div>
    </div>
  </Transition>
</template>

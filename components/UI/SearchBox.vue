<template>
  <Transition duration="550" name="nested" appear>
    <div v-show="uiStore.showSearchBox" class="inner z-10 w-full h-full bg-slate-50 absolute top-15">
      <XIcon class="
        h-8
        ml-2
        text-slate-500
        absolute
        right-5
        top-6
        cursor-pointer
        transition-all
        hover:text-slate-300
      
      " @click="uiStore.toggleSearchBox" />

      <div class="flex justify-center items-center mt-4">
        <input type="text" class="w-1/3 h-12 border" />
        <div class="
          w-20
          border-y border-r
          h-12
          rounded-tr-md rounded-br-md
          flex
          justify-center
          items-center
          cursor-pointer
          transition-all
          bg-cyan-500
          hover:bg-cyan-600
        ">
          <SearchIcon class="h-6 text-white" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { SearchIcon, XIcon } from "@heroicons/vue/outline";
import { useUIStore } from "@/stores/ui";

const uiStore = useUIStore();

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Esc" || e.key === "Escape") {
      uiStore.showSearchBox = false;
    }
  };
  document.addEventListener("keydown", handleEscape);
});

</script>
<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { Link } from "@/interfaces/IUi";

interface Props {
  name: string;
  links: [Link] | undefined;
  right: boolean;
  avatar?: boolean | undefined;
  avatarImage?: string | undefined;
}

let isOpen = ref(false);

withDefaults(defineProps<Props>(), {
  name: null,
  links: null,
  right: false,
  avatar: null,
  avatarImage: null
});

onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Esc" || e.key === "Escape") {
      isOpen.value = false;
    }
  };
  document.addEventListener("keydown", handleEscape);
});
</script>

<template>
  <div class="relative">
    <div class="flex items-center hover:text-slate-300 mx-1 hover:opacity-70 transition-all cursor-pointer"
         @mouseover="isOpen = true">
      <button>{{ name }}</button>
      <img :src="avatarImage" class="h-8 w-8 rounded-full  mr-1 " v-if="avatar" alt="">
      <ChevronDownIcon class="h-4 ml-1" />
    </div>
    <button v-if="isOpen" @click="isOpen = false" @mouseover="isOpen = false"
            class="inset-0 w-full h-full fixed mt-12"></button>
    <div v-if="isOpen" :class="right ? 'right-0' : 'left-0'" class="
        mt-2
        absolute
        overflow-hidden
        bg-white
        rounded-md
        drop-shadow-md
        w-48
        h-auto
        border border-inherit
        text-sm text-slate-800
        font-normal
        transition-all
      ">
      <template v-for="link in links">
        <NuxtLink :to="link.url" class="hover:bg-slate-100 block py-2.5 pl-2 leading-4">{{ link.name }}</NuxtLink>
      </template>
    </div>
  </div>
</template>


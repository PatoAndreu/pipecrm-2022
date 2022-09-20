<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/outline";

let isOpen = ref(false);

interface Link {
  name:string
  url: string
}
const links: Link[] = [
  {
    name: "Cuenta y facturación",
    url: "/contacts",
  },
  {
    name: "PipeCrm Academy",
    url: "/login",
  },
  {
    name: "Precios y características",
    url: "/",
  },
  {
    name: "Formación y servicios",
    url: "/",
  },
];

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

    <div class="flex items-center hover:text-slate-300 mx-1 hover:opacity-80 transition-all cursor-pointer"
      @click="isOpen = !isOpen">
      <img src="/img/avatar.jpg" class="h-8 w-8 rounded-full  mr-1 object-cover">
      <div class="text-xs ml-1">Patricio Andreu</div>
      <ChevronDownIcon class="h-4 ml-1" />
    </div>

    <button v-if="isOpen" @click="isOpen = false" class="inset-0 w-full h-full fixed mt-12"></button>

    <Transition duration="550" name="nested" appear>
      <div v-if="isOpen" class="
      inner
      mt-2
      right-0
      absolute
      overflow-hidden
      bg-white
      rounded-md
      drop-shadow-md
      w-72
      h-auto
      border border-inherit
      text-sm text-slate-800
      font-normal
      transition-all
      z-20
      ">

        <div>
          <div class="flex p-4">
            <img src="/img/avatar.jpg" class="h-10 w-10 rounded-full  mr-1 object-cover">
            <div class="ml-4 text-slate-600">
              <p class="font-bold text-[16px]">Patricio Andreu</p>
              <p class="text-slate-400">patricioandreu@gmail.com</p>
              <div class="mt-2 text-cyan-500 text-[13px]">
                <NuxtLink to="/dashboard">Perfil y preferencias</NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <hr class="pb-3">

        <template v-for="link in links">
          <NuxtLink :to="link.url" class="hover:bg-slate-100 block py-3 pl-2 leading-4">{{ link.name }}</NuxtLink>
        </template>
        <hr class="mt-3">
        <div class="py-4 text-center text-cyan-500 font-semibold">
          <NuxtLink to="/login">Cerrar sesión</NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

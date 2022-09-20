<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { SearchIcon } from "@heroicons/vue/outline";
import { Link } from "@/interfaces/IUi";

const uiStore = useUIStore();

const menu: Link[] = [
  {
    name: "Contactos",
    url: "/contacts"
  },
  {
    name: "Login",
    url: "/login"
  },
  {
    name: "Contact",
    url: "/"
  }
];
</script>

<template>
  <header>
    <nav>
      <div class="flex p-3 text-white text-sm items-center font-light" style="background-color: #33475b">
        <div class="flex-1 w-full">
          <div class="flex space-x-4">
            <NuxtLink to="/dashboard">
              <img src="/img/logo-solo.png" class="h-6 px-4" alt="PipeCrm">
            </NuxtLink>
            <UIDropdownMenu name="Contactos" :links="menu" />
            <UIDropdownMenu name="Informes" :links="menu" />
          </div>
        </div>
        <div class="flex space-x-4 items-center">
          <SearchIcon class="h-4 cursor-pointer hover:text-slate-500 mr-2" @click="uiStore.toggleSearchBox" />
          <UIDropdownMenuUser />
        </div>
      </div>
    </nav>
  </header>
  <UISearchBox />
</template>

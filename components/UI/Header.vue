<script setup lang="ts">
import { useUIStore } from "~~/stores/uiStore"
import { SearchIcon } from "@heroicons/vue/outline"
import { ILink } from "@/interfaces/IUi"

const uiStore = useUIStore()

const menu: ILink[] = [
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
]
</script>

<template>
  <header class="sticky top-0 z-50">
    <nav>
      <div
        class="flex items-center p-3 text-sm font-light text-white"
        style="background-color: #33475b">
        <div class="w-full flex-1">
          <div class="flex space-x-4">
            <NuxtLink to="/dashboard">
              <img src="/img/logo-solo.png" class="h-6 px-4" alt="PipeCrm" />
            </NuxtLink>
            <UIDropdownMenu name="Contactos" :links="menu" />
            <UIDropdownMenu name="Informes" :links="menu" />
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <SearchIcon
            class="mr-2 h-4 cursor-pointer hover:text-slate-500"
            @click="uiStore.toggleSearchBox" />
          <UIDropdownMenuUser />
        </div>
      </div>
    </nav>
  </header>
  <UISearchBox />
</template>

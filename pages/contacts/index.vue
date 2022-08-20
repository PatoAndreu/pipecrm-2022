<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between px-8 py-6">
      <h1 class="font-bold text-cyan-600">Contactos</h1>
      <div>
        <UIButton @click="uiStore.toggleCreateContactDrawer" :active="true">
          Crear contacto
        </UIButton>
      </div>
      <UICreateContactDrawer />
    </div>

    <!-- Tabs -->
    <div class="ml-[2%]">
      <div class="flex text-sm text-slate-600">
        <button class="min-w-[300px] font-semibold border-t border-x border-b-white border-b-2 px-4 py-2">Todos los
          contactos</button>
        <button class="min-w-[300px] bg-slate-100 border -ml-1 px-4 py-2 hover:bg-slate-50">Mis contactos</button>
        <button class="min-w-[300px] bg-slate-100 border -ml-1 px-4 py-2 hover:bg-slate-50">Contactos sin
          asignar</button>
      </div>
    </div>

    <!-- Contenido central -->
    <div class="w-full border-t h-screen -mt-[1px]">
      <!-- Filtros -->
      <div class="px-10 py-5 flex space-x-10">
        <button class="flex items-center hover:opacity-80">
          <span class="text-cyan-600">Propietario del negocio</span>
          <ChevronDownIcon class="h-5 text-cyan-500 ml-2" />
        </button>
      </div>

      <!-- Tabla -->
      <div class="ml-[2%] w-[96%] border h-96 overflow-x-auto">
        <div class="h-[44px] flex items-center  uppercase text-[12px] font-medium bg-slate-50">
          <div class="min-w-[200px] w-full pl-6 h-full border-b pt-3">Nombre</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Correo</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Negocios asociados</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Número de teléfono</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Propietario contacto</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Empresa principal</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Fecha última actividad</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Estado del lead</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Fecha creación</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Estado</div>
        </div>

        <div class="h-[44px] flex items-center  capitalize text-[12px] font-normal">
          <div class="min-w-[200px] pl-6 h-full border-b pt-3 truncate text-cyan-600 font-medium">
            Patricio Andreu Andreu Andreu Andreu
          </div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3 normal-case">patricioandreu@gmail.com</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Negocios asociados</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Número de teléfono</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Fernanda Pellin</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Empresa principal</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Fecha última actividad</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Estado del lead</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Fecha creación</div>
          <div class="min-w-[200px] pl-6 h-full border-b pt-3">Estado Estado</div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: " Contactos | PipeCrm",
}); import { useUIStore } from "@/stores/ui"; const uiStore = useUIStore(); import {
  ChevronDownIcon
} from '@heroicons/vue/outline' 
</script>

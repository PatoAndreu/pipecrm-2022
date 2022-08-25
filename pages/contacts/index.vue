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
        <button class="
            min-w-[300px]
            font-semibold
            border-t border-x border-b-white border-b-2
            px-4
            py-2
          ">
          Todos los contactos
        </button>
        <button class="
            min-w-[300px]
            bg-slate-100
            border
            -ml-1
            px-4
            py-2
            hover:bg-slate-50
          ">
          Mis contactos
        </button>
        <button class="
            min-w-[300px]
            bg-slate-100
            border
            -ml-1
            px-4
            py-2
            hover:bg-slate-50
          ">
          Contactos sin asignar
        </button>
      </div>
    </div>

    <!-- Contenido central -->

    <div class="w-full border-t -mt-[1px]">
      <!-- Filtros -->
      <div class="px-10 py-5 flex space-x-10">
        <button class="flex items-center hover:opacity-80">
          <span class="text-cyan-600">Propietario del negocio</span>
          <ChevronDownIcon class="h-5 text-cyan-500 ml-2" />
        </button>
      </div>

      <UIDataTable :columns="columns" :data="contactsStore.contacts" :searchColumns="searchColumns" />
    </div>

  </div>
</template>

<script setup>
useHead({
  title: " Contactos",
});

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";

import { useUIStore } from "@/stores/ui";
import { useContactsStore } from "~~/stores/contacts";

const uiStore = useUIStore();
const contactsStore = useContactsStore();

const columns = ref([
  {
    column: "name",
    title: "Nombre",
    type: "text",
  },
  {
    column: "email",
    title: "Correo",
    type: "email",
  },
  {
    column: "associatedBusiness",
    title: "Negocios asociados",
    type: "text",
  },
  {
    column: "phoneNumber",
    title: "Número de teléfono",
    type: "phone",
  },
  {
    column: "contactOwner",
    title: "Propietario contacto",
    type: "text",
  },
  {
    column: "company",
    title: "Empresa principal",
    type: "text",
  },
  {
    column: "lastActivityDate",
    title: "Fecha última actividad",
    type: "date",
  },
  {
    column: "leadStatus",
    title: "Estado del lead",
  },
  {
    column: "creationDate",
    title: "Fecha creación",
    type: "date",
  },
  {
    column: "status",
    title: "Estado",
    type: "text",
  },
]);

const searchColumns = ["name", "email", "company"];

</script>

<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="flex justify-between px-8 py-6">
      <h1 class="font-bold text-cyan-600">Contactos</h1>
      <div>
        <UIButton @click="addContact" :active="true">
          Crear contacto
        </UIButton>
      </div>

    </div>

    <!-- Tabs -->
    <div class="ml-[2%]">
      <div class="flex text-sm text-slate-600">
        <button class="
            min-w-[300px]
            px-4
            py-2
            hover:bg-slate-50
          "
                :class="tabSelected === 'all' ? 'border-t border-x border-b-white border-b-2 font-semibold':'border bg-slate-100'"
                @click="setTabSelected('all')">
          Todos los contactos
        </button>
        <button class="
            min-w-[300px]
            -ml-0.5
            px-4
            py-2
            hover:bg-slate-50
          "
                :class="tabSelected === 'myContacts' ? 'border-t border-x border-b-white border-b-2 font-semibold':'border bg-slate-100'"
                @click="setTabSelected('myContacts')">
          Mis contactos
        </button>
        <button class="
             min-w-[300px]
            -ml-0.5
            px-4
            py-2
            hover:bg-slate-50
          "
                :class="tabSelected === 'unassigned' ? 'border-t border-x border-b-white border-b-2 font-semibold':'border bg-slate-100'"
                @click="setTabSelected('unassigned')">
          Contactos sin asignar
        </button>
      </div>
    </div>

    <!-- Contenido central -->
    <div class="w-full border-t -mt-[1px]">
      <!-- Filtros -->
      <div class="flex">

        <div class="px-10 py-5 flex space-x-10 w-72 text-sm" v-show="tabSelected !== 'myContacts'">
          <UISelectBox :options="usersStore.users" v-model:modelValue="filterUser"
                       type="user" :disabled="false" :top="false">
            <template #label>
              <label class="block mb-2">Propietario del contacto</label>
            </template>
          </UISelectBox>
        </div>

        <div class="px-10 py-5 flex space-x-10 w-72 text-sm">
          <UISelectBox :options="createdAtFilters" v-model:modelValue="filterDate"
                       :disabled="false" :top="false">
            <template #label>
              <label class="block mb-2">Fecha de creación</label>
            </template>
          </UISelectBox>
        </div>

      </div>
      <ContactsIndexTable />
    </div>

    <ContactsCreateDrawer />
  </div>
</template>

<script setup lang="ts">

import { useUsersStore } from "@/stores/usersStore";

useHead({
  title: " Contactos"
});

const { addContact, setTabSelected, tabSelected, filterUser, filterDate } = useContacts();

const usersStore = useUsersStore();


const createdAtFilters = ref([
  { id: 1, name: "Hoy" },
  { id: 2, name: "Ayer" },
  { id: 3, name: "Esta semana" },
  { id: 4, name: "Semana pasada" },
  { id: 5, name: "Este mes" },
  { id: 6, name: "Mes pasado" }
]);


</script>

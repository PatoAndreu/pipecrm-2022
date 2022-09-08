<template>
  <div>
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
      <div class="px-10 py-5 flex space-x-10">
        <button class="flex items-center hover:opacity-80">
          <span class="text-cyan-600">Propietario del negocio</span>
          <ChevronDownIcon class="h-5 text-cyan-500 ml-2" />
        </button>
      </div>
      <ContactsTable />
    </div>

    <ContactsCreateDrawer />
  </div>
</template>

<script setup lang="ts">

import { ChevronDownIcon } from '@heroicons/vue/outline'
import { useUIStore } from '@/stores/ui'
import { useContacts } from '@/composables/useContacts'

useHead({
          title: ' Contactos'
        })

const { addContact, setTabSelected, tabSelected } = useContacts()
const uiStore = useUIStore()

</script>

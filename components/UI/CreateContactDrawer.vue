<template>
  <Transition duration="550" name="drawer" appear>
    <div v-if="uiStore.showCreateContactDrawer"
      class="w-[500px] fixed h-auto z-10 min-h-screen  shadow-xl  right-0 top-0 bg-white inner">

      <!-- Header -->
      <div class="flex justify-between bg-cyan-500 h-16 items-center">
        <div class="text-white text-lg font-semibold pl-4">Crear contacto</div>
        <XIcon class="
            mr-4
            h-6
            text-white
            cursor-pointer
            transition-all
            hover:text-slate-300
          " @click="uiStore.toggleCreateContactDrawer" />
      </div>

      <!-- Formulario -->
      <div class="p-10 text-slate-600 text-[14px] overflow-scroll h-screen">

        <div class="mb-6">
          <label class="block mb-2">Correo</label>
          <input type="text" class="
              w-full
              h-10
              rounded-sm
              bg-slate-100
              border border-slate-200
              p-2
            " v-model="contactsStore.contact.email" />
        </div>

        <div class="mb-6">
          <label class="block mb-2">Nombre</label>
          <input type="text" class="
              w-full
              h-10
              rounded-sm
              bg-slate-100
              border border-slate-200
              p-2
            " v-model="contactsStore.contact.name" />
        </div>

        <div class="mb-6">
          <label class="block mb-2">Número de teléfono</label>
          <input type="text" class="
              w-full
              h-10
              rounded-sm
              bg-slate-100
              border border-slate-200
              p-2
            " v-model="contactsStore.contact.phone" />
        </div>

        <div class="mb-6">
          <UISelectBox name="Propietario del contacto" :options="usersStore.users"
            v-model:modelValue="contactsStore.contact.leadOwner" />
        </div>

        <div class="mb-6">
          <UISelectBox name="Etapa del ciclo de vida" :options="contactsStore.contactStage"
            v-model:modelValue="contactsStore.contact.leadCycle" />
        </div>

        <div class="mb-6">
          <UISelectBox name="Estado del lead" :options="contactsStore.contactStatus"
            v-model:modelValue="contactsStore.contact.leadStatus" />
        </div>
        <div class="h-32"></div>
      </div>


      <!-- Footer -->
      <div class="
          flex
          fixed
          justify-center
          bottom-0
          p-4
          bg-slate-100
          w-[500px]
          text-sm
          space-x-5
        ">
        <UIButton @click="closeCreateContactDrawer"
          :disabled="!contactsStore.contact.email || !contactsStore.contact.name">
          Cancelar
        </UIButton>

        <UIButton @click="closeCreateContactDrawer"
          :disabled="!contactsStore.contact.email || !contactsStore.contact.name">
          Crear y agregar otro
        </UIButton>

        <UIButton @click="closeCreateContactDrawer" :active="true">
          Crear
        </UIButton>

      </div>

    </div>
  </Transition>
</template>

<script setup>

import { XIcon } from "@heroicons/vue/outline";
import { useUIStore } from "@/stores/ui";
import { useContactsStore } from "~~/stores/contacts";
import { useUsersStore } from "@/stores/users";

const uiStore = useUIStore();
const contactsStore = useContactsStore();
const usersStore = useUsersStore();

const closeCreateContactDrawer = () => {
  contactsStore.resetContact()
  uiStore.toggleCreateContactDrawer();
};

</script>
<template>
  <Transition duration="550" name="drawer" appear>
    <div v-if="showDrawer"
         class="w-[500px] fixed h-auto z-10 min-h-screen  shadow-xl  right-0 top-0 bg-white inner">

      <!-- Header -->
      <div class="flex justify-between bg-cyan-500 h-16 items-center">
        <div class="text-white text-lg font-semibold pl-4">{{ !contactsStore.isEditing ? 'Agregar' : 'Actualizar' }}
          contacto
        </div>
        <XIcon class="
            mr-4
            h-6
            text-white
            cursor-pointer
            transition-all
            hover:text-slate-300
          " @click="showDrawer = false" />
      </div>

      <!-- Formulario -->
      <div class="p-10 text-slate-600 text-[14px] overflow-scroll h-screen">

        <div class="mb-6">
          <label class="block mb-2">Correo</label>
          <input type="email" class="
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
            " v-model="contactsStore.contact.firstName" />
        </div>
        <div class="mb-6">
          <label class="block mb-2">Apellido</label>
          <input type="text" class="
              w-full
              h-10
              rounded-sm
              bg-slate-100
              border border-slate-200
              p-2
            " v-model="contactsStore.contact.lastName" />
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
            " v-model="contactsStore.contact.mobilePhoneNumber" />
        </div>

        <div class="mb-6">
          <UISelectBox name="Propietario del contacto" :options="usersStore.users" field="firstName" type="user"
                       v-model:modelValue="contactsStore.contact.owner" :disabled="contactsStore.disabledFormContact" />
        </div>

        <div class="mb-6">
          <UISelectBox name="Etapa del ciclo de vida" :options="contactsStore.contactStage"
                       v-model:modelValue="contactsStore.contact.contactLifeCycleStage"
                       :disabled="contactsStore.disabledFormContact" />
        </div>

        <div class="mb-6">
          <UISelectBox name="Estado del lead" :options="contactsStore.contactStatus"
                       v-model:modelValue="contactsStore.contact.contactStatus"
                       :disabled="contactsStore.disabledFormContact" />
        </div>
        <div class="h-32"></div>
      </div>


      <!-- Footer -->
      <div class="
          flex
          fixed
          bottom-0
          p-4
          bg-slate-100
          w-[500px]
          text-sm
          space-x-5
        "
           :class="!contactsStore.isEditing ? ' justify-center':'justify-between'">
        <UIButton @click="showDrawer = false" :disabled="contactsStore.disabledFormContact">
          Cancelar
        </UIButton>

        <UIButton @click="showDrawer = false" :disabled="contactsStore.disabledFormContact"
                  v-if="!contactsStore.isEditing">
          Crear y agregar otro
        </UIButton>

        <UIButton @click="saveContact" :active="true">
          {{ !contactsStore.isEditing ? 'Crear' : 'Actualizar' }}
        </UIButton>


      </div>

    </div>
  </Transition>
</template>

<script setup>

import { XIcon } from '@heroicons/vue/outline'

import { useContactsStore } from '@/stores/contactsStore'
import { useContacts } from '@/composables/useContacts'

import { useUsersStore } from '@/stores/usersStore'


const contactsStore = useContactsStore()
const { showDrawer } = useContacts()

const usersStore = useUsersStore()

await usersStore.getUsers()

const saveContact = async () => {
  await contactsStore.saveContact()
}


</script>
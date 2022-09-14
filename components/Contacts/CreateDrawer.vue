<template>
  <Transition duration="550" name="drawer" appear>
    <div v-if="showDrawer"
         class="w-[500px] fixed h-auto z-10 min-h-screen  shadow-xl  right-0 top-0 bg-white inner">

      <!-- Header -->
      <div class="flex justify-between bg-cyan-500 h-16 items-center">
        <div class="text-white text-lg font-semibold pl-4">
          {{ !isEditing ? "Agregar" : "Actualizar" }}
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
            " v-model="contact.email" />
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
            " v-model="contact.firstName" />
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
            " v-model="contact.lastName" />
        </div>

        <div class="mb-6">
          <label class="block mb-2">Número de teléfono (opcional)</label>
          <input type="text" class="
              w-full
              h-10
              rounded-sm
              bg-slate-100
              border border-slate-200
              p-2
            " v-model="contact.mobilePhoneNumber" />
        </div>

        <div class="mb-6">
          <UISelectBox :options="usersStore.users" field="firstName" type="user"
                       v-model:modelValue="contact.owner" :disabled="disabledFormContact">
            <template #label>
              <label class="block mb-2">Propietario del contacto (opcional)</label>
            </template>
          </UISelectBox>

        </div>

        <div class="mb-6">
          <UISelectBox :options="contactLifeCycleStage"
                       v-model:modelValue="contact.contactLifeCycleStage"
                       :disabled="disabledFormContact">
            <template #label>
              <label class="block mb-2">Etapa del ciclo de vida (opcional)</label>
            </template>
          </UISelectBox>
        </div>

        <div class="mb-6">
          <UISelectBox :options="contactStatus"
                       v-model:modelValue="contact.contactStatus"
                       :disabled="disabledFormContact">
            <template #label>
              <label class="block mb-2">Estado del lead (opcional)</label>
            </template>
          </UISelectBox>
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
           :class="!isEditing ? ' justify-center':'justify-between'">
        <UIButton @click="showDrawer = false">
          Cancelar
        </UIButton>

        <UIButton @click="showDrawer = false" :disabled="disabledFormContact"
                  v-if="!isEditing">
          Crear y agregar otro
        </UIButton>

        <UIButton @click="saveOrUpdateContact" :active="!disabledFormContact" :disabled="disabledFormContact">
          {{ !isEditing ? "Crear" : "Actualizar" }}
        </UIButton>


      </div>

    </div>
  </Transition>
</template>

<script setup lang="ts">

import { XIcon } from "@heroicons/vue/outline";
import { useUsersStore } from "@/stores/usersStore";

const {
        showDrawer,
        isEditing,
        contact,
        contactStatus,
        contactLifeCycleStage,
        disabledFormContact,
        saveContact,
        updateContact
      } = useContacts();

const usersStore = useUsersStore();

await usersStore.getUsers();

const saveOrUpdateContact = async () => {
  if (!isEditing)
    await saveContact();
  else
    await updateContact(contact);
};


</script>
<script setup lang="ts">

import { XIcon } from "@heroicons/vue/outline";
import { useContactsStore } from "@/stores/contactsStore";

const contactStore = useContactsStore();

const {
        showDrawer,
        isEditing,
        contact,
        contactStatus,
        contactLifeCycleStage,
        disabledFormContact,
        saveContact,
        updateContact,
        loadContacts,
        resetContact
      } = useContacts();

const { users, loadUsers } = useUsers();

let errorsMessages = ref([]);

await loadUsers();

contactStore.$subscribe((mutation, state) => {
  if (state.showDrawer)
    errorsMessages.value = [];
}, { detached: true });

const saveOrUpdateContact = async () => {
  if (!isEditing.value)
    afterPost(await saveContact());
  else
    afterPost(await updateContact(contact.value));
};

const afterPost = (res) => {
  const { data: { errors }, response: { status } }: any = res;

  if (status === 200) {
    isEditing.value  = false;
    showDrawer.value = false;
    loadContacts();
    resetContact();
  } else {
    errorsMessages.value = errors;
  }
};

</script>
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
      <div v-for="(error, key) in errorsMessages" :key="key" class="w-[90%] bg-red-400 text-white mx-auto my-4 p-4 rounded">
        <div v-for="(e, k) in error" :key="k" class="my-2">
          <p>
            - {{ e }}
          </p>
        </div>
      </div>
      <form @submit.prevent="saveOrUpdateContact">
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
            <UISelectBox :options="users" field="firstName" type="user"
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
        <div class="flex  fixed bottom-0 p-4 bg-slate-100 w-[500px] text-sm space-x-5"
             :class="!isEditing ? ' justify-center':'justify-between'">

          <UIButton type="button" @click="showDrawer = false">
            Cancelar
          </UIButton>

          <UIButton type="button" @click="showDrawer = false" :disabled="disabledFormContact"
                    v-if="!isEditing">
            Crear y agregar otro
          </UIButton>

          <UIButton type="submit" :active="!disabledFormContact" :disabled="disabledFormContact">
            {{ !isEditing ? "Crear" : "Actualizar" }}
          </UIButton>

        </div>
      </form>

    </div>
  </Transition>
</template>


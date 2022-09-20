<template>
  <div class="border rounded h-full px-3 py-2">
    <div class="flex justify-between items-center py-2">
      <div class="text-xs font-medium text-cyan-700">INFORMACIÓN</div>
      <PencilAltIcon class="h-5 text-cyan-600 cursor-pointer" @click="isEditing = true" />
    </div>
    <hr>
    <!-- Formulario-->
    <form class="text-sm py-4" @submit.prevent="updateContactInfo">

      <div class="h-12 items-center mb-4">
        <div class="text-slate-500 text-xs text-cyan-700">Nombre</div>
        <div class=" pt-2 text-slate-600" v-if="!isEditing">{{ contactLocal.firstName }}</div>
        <input type="text" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" v-model="contactLocal.firstName" v-else />
      </div>

      <div class="h-12 items-center mb-4">
        <div class="text-slate-500 text-xs text-cyan-700">Apellidos</div>
        <div class=" pt-2 text-slate-600" v-if="!isEditing">{{ contactLocal.lastName }}</div>
        <input type="text" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" v-model="contactLocal.lastName" v-else />
      </div>

      <div class="h-12 items-center mb-4">
        <div class="text-slate-500 text-xs text-cyan-700">Email</div>
        <div class="pt-2 text-slate-600" v-if="!isEditing">{{ contactLocal.email }}</div>
        <input type="text" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" v-model="contactLocal.email" v-else />
      </div>

      <div class="h-12 items-center mb-4">
        <div class="text-slate-500 text-xs text-cyan-700">Etapa del ciclo de vida</div>
        <div class="pt-2 text-slate-600" v-if="!isEditing">{{ contactLocal.contactLifeCycleStage?.name }}</div>
        <UISelectBox class="mt-2"
                     :options="contactLifeCycleStage"
                     v-model:modelValue="contactLocal.contactLifeCycleStage"
                     v-else>
        </UISelectBox>
      </div>

      <div class="h-12 items-center" :class="isEditing ? 'pt-2' : ''">
        <div class="text-slate-500 text-xs text-cyan-700">Estado del lead</div>
        <div class="pt-2 text-slate-600" v-if="!isEditing">{{ contactLocal.contactStatus?.name }}</div>
        <UISelectBox class="mt-2"
                     :options="contactStatus"
                     v-model:modelValue="contactLocal.contactStatus"
                     v-else>
        </UISelectBox>
      </div>

      <div class="flex w-auto h-auto justify-end mt-16" v-if="isEditing">

        <button type="button"
                class="inline-flex items-center px-4 py-2 mr-4 font-semibold leading-6 text-sm shadow rounded text-indigo-500 bg-white border hover:shadow-md border-indigo-500 transition ease-in-out duration-150"
                :class="pending ? 'cursor-not-allowed opacity-70' :''"
                :disabled="pending"
                @click="cancelEdit">
          Cancelar
        </button>

        <button type="submit"
                class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-white bg-indigo-600 hover:shadow-lg transition ease-in-out duration-150"
                :class="pending ? 'cursor-not-allowed opacity-70' :''"
                :disabled="pending"
                @click="updateContactInfo">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-show="pending">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ !pending ? "Guardar" : "Guardando..." }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

import { PencilAltIcon } from "@heroicons/vue/outline";

const {
        contact,
        contactStatus,
        contactLifeCycleStage,
        updateContact,
        getContactStatus,
        getContactStages
      } = useContacts();

const contactLocal = ref({ ...contact.value });
const isEditing    = ref(false);
const pending      = ref(false);

onBeforeMount(async () => {
  await getContactStatus();
  await getContactStages();
});

const cancelEdit = () => {
  contactLocal.value = { ...contact.value };
  isEditing.value    = false;
};

const updateContactInfo = async () => {
  pending.value = true;
    const res = await updateContact(contactLocal.value);

    const { data: { errors }, response: { status } }: any = res;

    if (status === 200) {
      isEditing.value = false;
      pending.value   = false;
    }

};
</script>

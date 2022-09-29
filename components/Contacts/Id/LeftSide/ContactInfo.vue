<script lang="ts" setup>

import { ChevronDownIcon, ChevronRightIcon, PencilAltIcon } from "@heroicons/vue/outline";
import useContacts from "@/composables/useContacts";
import { onMounted, ref } from "#imports";

const {
        contact,
        contactStatus,
        contactLifeCycleStage,
        updateContact,
        getContactStatus,
        getContactStages
      } = useContacts();

const contactLocal    = ref({ ...contact.value });
const isEditing       = ref(false);
const pending         = ref(false);
const showContactInfo = ref(true);

onMounted(async () => {
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

<template>
  <div v-auto-animate class="border rounded h-auto px-3 py-2 bg-white">
    <div class="flex justify-between items-center py-2">
      <!--    Header    -->
      <button class="flex items-center text-cyan-700 hover:text-cyan-500 " @click="showContactInfo = !showContactInfo">
        <ChevronRightIcon v-if="!showContactInfo" class="h-5 mr-1" />
        <ChevronDownIcon v-else class="h-5 mr-1" />
        <div class="text-xs font-semibold">INFORMACIÓN</div>
      </button>
      <PencilAltIcon v-if="showContactInfo && !isEditing && contact" class="h-5 text-cyan-600 cursor-pointer hover:text-cyan-500" @click="isEditing = true" />
    </div>
    <div v-auto-animate>
      <div v-if="showContactInfo " v-auto-animate class="mt-3">
        <hr>
        <!-- Formulario-->
        <form v-auto-animate class="py-4 text-sm" @submit.prevent="updateContactInfo">

          <div v-auto-animate class="h-12 items-center mb-4">
            <div class="text-slate-500 text-xs text-cyan-700">Nombre</div>
            <div v-if="!isEditing" class=" pt-2 text-slate-600">{{ contactLocal.firstName }}</div>
            <input v-else v-model="contactLocal.firstName" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" type="text" />
          </div>

          <div v-auto-animate class="h-12 items-center mb-4">
            <div class="text-slate-500 text-xs text-cyan-700">Apellidos</div>
            <div v-if="!isEditing" class=" pt-2 text-slate-600">{{ contactLocal.lastName }}</div>
            <input v-else v-model="contactLocal.lastName" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" type="text" />
          </div>

          <div v-auto-animate class="h-12 items-center mb-4">
            <div class="text-slate-500 text-xs text-cyan-700">Email</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ contactLocal.email }}</div>
            <input v-else v-model="contactLocal.email" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" type="text" />
          </div>

          <div v-auto-animate class="h-12 items-center mb-4">
            <div class="text-slate-500 text-xs text-cyan-700">Etapa del ciclo de vida</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ contactLocal.contactLifeCycleStage?.name }}</div>
            <UISelectBox v-else
                         v-model:modelValue="contactLocal.contactLifeCycleStage"
                         :options="contactLifeCycleStage"
                         class="mt-2">
            </UISelectBox>
          </div>

          <div v-auto-animate :class="isEditing ? 'pt-2' : ''" class="h-12 items-center">
            <div class="text-slate-500 text-xs text-cyan-700">Estado del lead</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ contactLocal.contactStatus?.name }}</div>
            <UISelectBox v-else
                         v-model:modelValue="contactLocal.contactStatus"
                         :options="contactStatus"
                         class="mt-2">
            </UISelectBox>
          </div>

          <div v-if="isEditing" class="flex w-auto h-auto justify-end mt-16">

            <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                    :disabled="pending"
                    class="inline-flex items-center px-4 py-2 mr-4 font-semibold leading-6 text-sm shadow rounded text-indigo-500 bg-white border hover:shadow-md border-indigo-500 transition ease-in-out duration-150"
                    type="button"
                    @click="cancelEdit">
              Cancelar
            </button>

            <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                    :disabled="pending"
                    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-white bg-indigo-600 hover:shadow-lg transition ease-in-out duration-150"
                    type="submit"
                    @click="updateContactInfo">
              <svg v-show="pending" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
              </svg>
              {{ !pending ? "Guardar" : "Guardando..." }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<template>
  <div class="border rounded h-full px-3 py-2">
    <div class="flex justify-between items-center py-2">
      <div class="text-xs font-medium text-cyan-700">INFORMACIÓN</div>
      <PencilAltIcon class="h-5 text-cyan-600 cursor-pointer" @click="isEditing = true" />
    </div>
    <hr>
    <!-- Formulario-->
    <form class="text-sm py-4" v-if="!pending" @submit.prevent="updateContactInfo">

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
        <div class="pt-2 text-slate-600" v-if="!isEditing">{{ contactLocal.contactLifeCycleStage.name }}</div>
        <UISelectBox class="mt-2"
                     :options="contactLifeCycleStage"
                     v-model:modelValue="contactLocal.contactLifeCycleStage"
                     v-else>
        </UISelectBox>
      </div>

      <div class="h-12 items-center mb-4" :class="isEditing ? 'pt-2' : ''">
        <div class="text-slate-500 text-xs text-cyan-700">Estado del lead</div>
        <div class="pt-2 text-slate-600" v-if="!isEditing">{{ contactLocal.contactStatus.name }}</div>
        <UISelectBox class="mt-2"
                     :options="contactStatus"
                     v-model:modelValue="contactLocal.contactStatus"
                     v-else>
        </UISelectBox>
      </div>

      <div class="flex w-auto h-auto justify-end mt-16" v-if="isEditing">
        <div class="bg-slate-100 hover:bg-slate-200 py-2 px-3 rounded border text-sm mr-2 cursor-pointer" @click="cancelEdit">
          Cancelar
        </div>
        <button type="submit" class="bg-green-600 hover:bg-green-500 text-white py-2 px-3 rounded border text-sm cursor-pointer" @click="updateContactInfo">
          Guardar
        </button>
      </div>

    </form>
    <div class="py-4 h-60 flex items-center justify-center" v-else>
      <UILoading :pending="pending" />
    </div>
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

  setTimeout(async () => {

    // @ts-ignore
    const { status } = await updateContact(contactLocal.value);

    if (status === 200) {
      isEditing.value = false;
      pending.value   = false;
    }
  }, 1000);
};
</script>

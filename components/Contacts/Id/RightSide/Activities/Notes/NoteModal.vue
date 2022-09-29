<script lang="ts" setup>
import { ChevronDownIcon, ChevronRightIcon, XIcon } from "@heroicons/vue/outline";
import useActivities from "@/composables/useActivities";
import useContacts from "@/composables/useContacts";
import useDeals from "@/composables/useDeals";
import { onMounted, watch } from "#imports";

const {
        task: note,
        showModal,
        isEditing,
        disabledNoteForm,
        showAssociations,
        minimize,
        saveTask,
        closeTaskModal
      } = useActivities();

let { contacts } = useContacts();

const { getDeals, deals } = useDeals();

onMounted(async () => {
  await getDeals();
});

contacts.value = contacts.value.sort(function(a, b) {
  if (a.firstName < b.firstName) {
    return -1;
  }
  if (a.firstName > b.firstName) {
    return 1;
  }
  return 0;
});

watch(() => [disabledNoteForm.value], () => {
  if (disabledNoteForm.value) {
    showAssociations.value = !disabledNoteForm.value;
  }
});

</script>

<template>
  <form v-if="showModal && note.type === 'note'"
        class="w-[650px] bg-white fixed bottom-2 left-1/2 mr-10 h-auto shadow-2xl"
        @submit.prevent="saveTask"
  >
    <!--  Header  -->
    <div class="w-full bg-indigo-800 text-white py-2 px-4 flex items-center justify-between">
      <div class="flex items-center justify-center">
        <button v-if="!minimize" class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full" @click="minimize = true">
          <ChevronDownIcon class="w-6" />
        </button>
        <button v-else class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full" @click="minimize = false">
          <ChevronRightIcon class="w-6" />
        </button>
        <p class="font-semibold tracking-wider">Nota</p>
      </div>
      <button @click.prevent="closeTaskModal">
        <XIcon class="h-6" />
      </button>
    </div>
    <!--  Content  -->
    <div v-if="!minimize">
      <textarea v-model="note.text" class="w-full p-4 focus:outline-none" placeholder="Empieza a escribir una nota...." rows="6" />
      <!-- showAssociations -->
      <div v-if="showAssociations" class="w-full h-auto bg-white p-4 absolute z-50 fixed bottom-20 flex space-x-4">
        <div class="w-full">
          <div class="text-slate-500 text-xs text-cyan-700">Contacto</div>
          <UISelectBox v-model:modelValue="note.contact"
                       :options="contacts"
                       class="mt-2"
                       type="user"
          />
        </div>
        <div class="w-full">
          <div class="text-slate-500 text-xs text-cyan-700">Negocio</div>
          <UISelectBox v-model:modelValue="note.deal"
                       :options="deals"
                       class="mt-2"
          />
        </div>
      </div>
      <!--  Footer  -->
      <hr>
      <div class="p-4 flex justify-between">
        <UIButton :active="!disabledNoteForm" :disabled="disabledNoteForm" type="submit">
          {{ !isEditing ? "Guardar Nota" : "Actualizar Nota" }}
        </UIButton>

        <button :class="disabledNoteForm ? 'cursor-not-allowed opacity-50' : 'border-orange-500 text-orange-500 bg-white'" :disabled="disabledNoteForm"
                class="h-10 w-h-auto py-2 px-6 border rounded text-sm"
                type="button"
                @click="showAssociations = !showAssociations">
          Asociaciones
        </button>

      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ChevronDownIcon, ChevronRightIcon, XIcon } from "@heroicons/vue/outline";
import useActivities from "@/composables/useActivities";
import useContacts from "@/composables/useContacts";
import useDeals from "@/composables/useDeals";
import { watch } from "@vue/runtime-core";

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

await getDeals();

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
  <form class="w-[650px] bg-white fixed bottom-2 left-1/2 mr-10 h-auto shadow-2xl"
        @submit.prevent="saveTask"
        v-if="showModal && note.type === 'note'"
        v-auto-animate>
    <!--  Header  -->
    <div class="w-full bg-indigo-800 text-white py-2 px-4 flex items-center justify-between">
      <div class="flex items-center justify-center">
        <button class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full" @click="minimize = true" v-if="!minimize">
          <ChevronDownIcon class="w-6" />
        </button>
        <button class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full" @click="minimize = false" v-else>
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
      <textarea rows="6" placeholder="Empieza a escribir una nota...." class="w-full p-4 focus:outline-none" v-model="note.text" />
      <div class="w-full h-auto bg-white p-4 absolute z-50 fixed bottom-20 flex space-x-4" v-if="showAssociations">
        <div class="w-full">
          <div class="text-slate-500 text-xs text-cyan-700">Contacto</div>
          <UISelectBox class="mt-2"
                       :options="contacts"
                       type="user"
                       v-model:modelValue="note.contact"
          />
        </div>
        <div class="w-full">
          <div class="text-slate-500 text-xs text-cyan-700">Negocio</div>
          <UISelectBox class="mt-2"
                       :options="deals"
                       v-model:modelValue="note.deal"
          />
        </div>
      </div>
      <!--  Footer  -->
      <hr>
      <div class="p-4 flex justify-between ">
        <UIButton type="submit" :active="!disabledNoteForm" :disabled="disabledNoteForm">
          {{ !isEditing ? "Guardar Nota" : "Actualizar Nota" }}
        </UIButton>

        <button type="button" class="h-10 w-h-auto py-2 px-6 border rounded text-sm"
                :class="disabledNoteForm ? 'cursor-not-allowed opacity-50' : 'border-orange-500 text-orange-500 bg-white'"
                :disabled="disabledNoteForm"
                @click="showAssociations = !showAssociations">
          Asociaciones
        </button>

      </div>
    </div>
  </form>
</template>
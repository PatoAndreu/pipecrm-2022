<script lang="ts" setup>
import { computed, onMounted, watch } from "#imports";
import { ChevronDownIcon, ChevronRightIcon, XIcon } from "@heroicons/vue/outline";
import useActivities from "@/composables/useActivities";
import useContacts from "@/composables/useContacts";
import useDeals from "@/composables/useDeals";
import useUsers from "@/composables/useUsers";

const { task, showModal, isEditing, minimize, showAssociations, saveTask, closeTaskModal } = useActivities();

let { contact, contacts, getContacts } = useContacts();

const { getDeals, deals } = useDeals();
const { getUsers, users } = useUsers();

onMounted(async () => {
  await getContacts();
  await getDeals();
  await getUsers();
});

const disabledNoteForm = computed(() => {
  return task.value.text?.length < 1;
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
  <div>
    <form v-if="showModal && task.type !== 'note'"
          class="w-[650px] bg-white fixed bottom-[20px] right-[20px] h-auto shadow-2xl"
          @submit.prevent="saveTask"
    >
      <!--  Header  -->
      <div class="min-w-fit bg-indigo-800 text-white py-2 px-4 flex items-center justify-between">
        <div class="flex items-center justify-center">
          <button v-if="!minimize"
                  class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full"
                  type="button"
                  @click="minimize = true">
            <ChevronDownIcon class="w-6" />
          </button>
          <button v-else
                  class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full"
                  type="button"
                  @click="minimize = false">
            <ChevronRightIcon class="w-6" />
          </button>
          <p class="font-semibold tracking-wider">Tarea</p>
        </div>
        <button type="button" @click.prevent="closeTaskModal">
          <XIcon class="h-6" />
        </button>
      </div>

      <!--  Content  -->
      <div v-show="!minimize">

        <input v-model="task.text" class="w-full p-4 outline-none" placeholder="Ingresa tu tarea" type="text">
        <div class="flex space-x-10 p-4 items-start">
          <div class="w-40">
            <div class="text-xs text-slate-600">Fecha de vencimiento</div>
            <input v-model="task.date" class="py-2 text-cyan-600 w-full" type="date">
          </div>
          <div class="w-max">
            <div class="text-xs text-slate-600">Hora</div>
            <input v-model="task.time" class="py-2 text-cyan-600 w-full" type="time">
          </div>
        </div>

        <hr class="mx-4">

        <div class="flex p-4 space-x-8 items-center">
          <div class="w-32">
            <div class="text-xs text-slate-600">Tipo</div>
            <select v-model="task.type" class="py-2 text-cyan-600 min-w-fit">
              <option value="other">Otro</option>
              <option value="call">Llamada</option>
              <option value="email">Correo</option>
              <option value="meeting">Reunión</option>
            </select>
          </div>

          <div class="w-32">
            <div class="text-xs text-slate-600">Prioridad</div>
            <select v-model="task.priority" class="py-2 text-cyan-600 min-w-fit">
              <option value="">Ninguno</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div class="w-60">
            <div class="text-xs text-slate-600">Asignado a</div>
            <UISelectBox v-model:modelValue="task.owner"
                         :options="users"
                         class="w-full mt-2"
                         type="user"
            />
          </div>

        </div>

        <hr class="mx-4">

        <textarea v-model="task.note" class="w-full p-4 focus:outline-none"
                  placeholder="Empieza a escribir una nota...."
                  rows="3" />

        <!-- showAssociations -->
        <div v-if="showAssociations" class="w-full h-auto bg-white p-4 absolute z-50 fixed bottom-20 flex space-x-4">
          <div class="w-full">
            <div class="text-slate-500 text-xs text-cyan-700">Contacto</div>
            <UISelectBox v-model:modelValue="task.contact"
                         :options="contacts"
                         class="mt-2"
                         type="user"
            />
          </div>
          <div class="w-full">
            <div class="text-slate-500 text-xs text-cyan-700">Negocio</div>
            <UISelectBox v-model:modelValue="task.deal"
                         :options="deals"
                         class="mt-2"
            />
          </div>
        </div>
        <!--  Footer  -->
        <hr>
        <div class="p-4 flex justify-between">
          <UIButton :active="!disabledNoteForm"
                    :disabled="disabledNoteForm"
                    type="submit">
            {{ !isEditing ? "Guardar Tarea" : "Actualizar Tarea" }}
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
  </div>
</template>
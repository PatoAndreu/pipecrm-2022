<script setup lang="ts">
import useActivities from "@/composables/useActivities";
import { ChevronDownIcon, ChevronRightIcon, XIcon } from "@heroicons/vue/outline";
import { computed } from "@vue/reactivity";
import useContacts from "@/composables/useContacts";
import { useUsers } from "~/composables/useUsers";

const { task, showModal, isEditing, minimize, saveTask, closeTaskModal } = useActivities();

const { loadUsers, users } = useUsers()

await loadUsers();

const disabledNoteForm = computed(() => {
  return task.value.text?.length > 0;
});

</script>


<template>
  <form class="w-[650px] bg-white fixed bottom-[20px] right-[20px] h-auto shadow-2xl"
        @submit.prevent="saveTask"
        v-if="showModal && task.type !== 'note'">
    <!--  Header  -->
    <div class="min-w-fit bg-indigo-800 text-white py-2 px-4 flex items-center justify-between">
      <div class="flex items-center justify-center">
        <button class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full"
                @click="minimize = true"
                v-if="!minimize">
          <ChevronDownIcon class="w-6" />
        </button>
        <button class="w-8 h-8 flex items-center justify-center hover:opacity-50 rounded-full"
                @click="minimize = false"
                v-else>
          <ChevronRightIcon class="w-6" />
        </button>
        <p class="font-semibold tracking-wider">Tarea</p>
      </div>
      <button @click.prevent="closeTaskModal">
        <XIcon class="h-6" />
      </button>
    </div>

    <!--  Content  -->
    <div v-show="!minimize">

      <input type="text" class="w-full p-4 outline-none" placeholder="Ingresa tu tarea" v-model="task.text">
      <div class="flex space-x-10 p-4 items-start">
        <div class="w-40">
          <div class="text-xs text-slate-600">Fecha de vencimiento</div>
          <input type="date" class="py-2 text-cyan-600 w-full" v-model="task.date">
        </div>
        <div class="w-max">
          <div class="text-xs text-slate-600">Hora</div>
          <input type="time" class="py-2 text-cyan-600 w-full" v-model="task.time">
        </div>
      </div>

      <hr class="mx-4">

      <div class="flex p-4 space-x-8 items-center">
        <div class="w-32">
          <div class="text-xs text-slate-600">Tipo</div>
          <select class="py-2 text-cyan-600 min-w-fit" v-model="task.type">
            <option value="other">Otro</option>
            <option value="call">Llamada</option>
            <option value="email">Correo</option>
            <option value="meeting">Reunión</option>
          </select>
        </div>

        <div class="w-32">
          <div class="text-xs text-slate-600">Prioridad</div>
          <select class="py-2 text-cyan-600 min-w-fit" v-model="task.priority">
            <option value="">Ninguno</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div class="w-60">
          <div class="text-xs text-slate-600">Asignado a</div>
          <UISelectBox class="w-full mt-2"
                       :options="users"
                       type="user"
                       v-model:modelValue="task.owner"
          />
        </div>

      </div>

      <hr class="mx-4">

      <textarea rows="3" placeholder="Empieza a escribir una nota...."
                class="w-full p-4 focus:outline-none"
                v-model="task.note"></textarea>
      <!--  Footer  -->
      <hr>
      <div class="p-4">
        <UIButton type="submit"
                  :active="disabledNoteForm"
                  :disabled="!disabledNoteForm">
          {{ !isEditing ? "Guardar Tarea" : "Actualizar Tarea" }}
        </UIButton>
      </div>
    </div>
  </form>
</template>
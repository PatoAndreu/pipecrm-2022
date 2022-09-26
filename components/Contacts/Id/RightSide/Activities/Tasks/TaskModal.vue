<script setup lang="ts">
import useActivities from "@/composables/useActivities";
import { ChevronDownIcon, ChevronRightIcon, XIcon } from "@heroicons/vue/outline";
import { computed } from "@vue/reactivity";

const { task, showModal, isEditing, minimize, saveTask, closeTaskModal } = useActivities();

const disabledNoteForm = computed(() => {
  return task.value.text?.length > 0;
});

</script>


<template>
  <form class="w-[650px] bg-white fixed bottom-2 left-1/2 mr-10 h-auto shadow-2xl"
        @submit.prevent="saveTask"
        v-if="showModal && task.type !== 'note'">
    <!--  Header  -->
    <div class="w-full bg-indigo-800 text-white py-2 px-4 flex items-center justify-between">
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
      <textarea rows="6" placeholder="Empieza a escribir una nota...."
                class="w-full p-4 focus:outline-none"
                v-model="task.text"></textarea>
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
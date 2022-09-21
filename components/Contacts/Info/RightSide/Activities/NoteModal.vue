<script setup lang="ts">
import { ChevronDownIcon,ChevronRightIcon, XIcon } from "@heroicons/vue/outline";

const { note, noteModalOpen, isEditing, saveNote, closeNoteModal, minimize } = useActivities();

const disabledForm = computed(() => {
  return note.value?.length > 0;
});
</script>


<template>
  <form class="w-[650px] bg-white absolute bottom-2 right-10 h-auto shadow-2xl" @submit.prevent="saveNote" v-show="noteModalOpen">
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
      <button @click.prevent="closeNoteModal">
        <XIcon class="h-6" />
      </button>
    </div>
    <!--  Content  -->
    <div v-show="!minimize">
      <textarea rows="6" placeholder="Empieza a escribir una nota...." class="w-full p-4 focus:outline-none" v-model="note"></textarea>
      <!--  Footer  -->
      <hr>
      <div class="p-4">
        <UIButton type="submit" :active="disabledForm" :disabled="!disabledForm">
          {{ !isEditing ? "Guardar nota" : "Actualizar nota" }}
        </UIButton>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import Note from "@/components/Contacts/Info/RightSide/Activities/Notes/Note";

const { notes, pinnedNotes, addNote, getActivities } = useActivities();

const { contact } = useContacts();

await getActivities(contact);

</script>

<template>
  <div class="flex justify-center py-4">
    <UIButton type="submit" :active="true" @click="addNote()">
      Crear Nota
    </UIButton>
  </div>

  <div v-if="pinnedNotes.length > 0">
    <p class="text-slate-500 font-normal py-4">Ancladas</p>
    <hr>
    <Note v-for="activity in pinnedNotes"
          :key="activity.id"
          :activity="activity" />
  </div>

  <div v-if="notes.length > 0">
    <p class="text-slate-500 font-normal py-4">Pasadas</p>
    <hr>
    <Note v-for="activity in notes"
          :key="activity.id"
          :activity="activity" />
  </div>


</template>
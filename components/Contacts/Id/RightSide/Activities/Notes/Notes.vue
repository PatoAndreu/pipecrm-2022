<script setup lang="ts">
import useActivities, { useActivitiesComponents } from "@/composables/useActivities";
import { onBeforeMount } from "#imports";
import useContacts from "@/composables/useContacts";

const { notes, pinnedNotes, addTask, getActivityByContact } = useActivities();
const { Note } = useActivitiesComponents();

const { contact } = useContacts();

onBeforeMount(async () => {
  await getActivityByContact(contact);
});

</script>

<template>
  <div class="flex justify-center py-4">
    <UIButton type="submit" :active="true" @click="addTask('note', contact)">
      Crear Nota
    </UIButton>
  </div>

  <div class="activities" v-if="pinnedNotes?.length > 0">
    <p class="text-slate-500 font-normal py-4">Ancladas</p>
    <hr>
    <Note v-for="task in pinnedNotes"
          :key="task.id"
          :note="task" />
  </div>

  <div class="activities" v-if="notes?.length > 0">
    <p class="text-slate-500 font-normal py-4">Pasadas</p>
    <hr>
    <Note v-for="task in notes"
          :key="task.id"
          :note="task" />
  </div>


</template>
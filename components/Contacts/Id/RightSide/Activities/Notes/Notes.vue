<script setup lang="ts">
import useActivities, { useActivitiesComponents } from "@/composables/useActivities";
import { onBeforeMount } from "#imports";
import useContacts from "@/composables/useContacts";

const { notes, pinnedNotes, addActivity, getActivities } = useActivities();
const { Note } = useActivitiesComponents();

const { contact } = useContacts();

onBeforeMount(async () => {
  await getActivities(contact);
});

</script>

<template>
  <div class="flex justify-center py-4">
    <UIButton type="submit" :active="true" @click="addActivity('note')">
      Crear Nota
    </UIButton>
  </div>

  <div v-if="pinnedNotes?.length > 0">
    <p class="text-slate-500 font-normal py-4">Ancladas</p>
    <hr>
    <Note v-for="activity in pinnedNotes"
          :key="activity.id"
          :activity="activity" />
  </div>

  <div v-if="notes?.length > 0">
    <p class="text-slate-500 font-normal py-4">Pasadas</p>
    <hr>
    <Note v-for="activity in notes"
          :key="activity.id"
          :activity="activity" />
  </div>


</template>
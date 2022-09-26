<script setup lang="ts">
import useContacts from "@/composables/useContacts";
import useActivities, { useActivitiesComponents } from "@/composables/useActivities";
import { onBeforeMount } from "#imports";

const { contact } = useContacts();
const { Task } = useActivitiesComponents();

const {
  getActivities,
  pinnedActivities,
  pendingTasks,
  completedActivities,
  delayedActivities,
  addActivity
} = useActivities();

onBeforeMount(async () => {
  await getActivities(contact);
});
</script>

<template>
  <div class="p-2 text-slate-500">

    <div class="flex justify-center py-4">
      <UIButton type="submit" :active="true" @click="addActivity('task')">
        Crear Tarea
      </UIButton>
    </div>

    <div v-if="pinnedActivities?.length > 0">
      <p class="font-normal py-4">Ancladas</p>
      <hr>
      <Task v-for="activity in pinnedActivities" :key="activity.id" :activity="activity" />
    </div>

    <div v-if="delayedActivities?.length > 0">
      <p class="font-normal py-4">Atrasadas</p>
      <hr>
      <Task v-for="activity in delayedActivities" :key="activity.id" :activity="activity" />
    </div>

    <div v-if="pendingTasks?.length > 0">
      <p class="font-normal py-4">Pendientes</p>
      <hr>
      <Task v-for="activity in pendingTasks" :key="activity.id" :activity="activity" />
    </div>

    <div v-if="completedActivities?.length > 0">
      <p class="font-normal py-4">Completadas</p>
      <hr>
      <Task v-for="activity in completedActivities" :key="activity.id" :activity="activity" />
    </div>
  </div>

</template>
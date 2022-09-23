<script setup lang="ts">
import Task from "@/components/Contacts/Info/RightSide/Activities/Tasks/Task";

const { contact } = useContacts();

const {
        getActivities,
        pinnedActivities,
        pendingTasks,
        completedActivities,
        delayedActivities,
        addActivity
      } = useActivities();

await getActivities(contact);

</script>

<template>
  <div class="p-2 text-slate-500">

    <div class="flex justify-center py-4">
      <UIButton type="submit" :active="true" @click="addActivity('note')">
        Crear Tarea
      </UIButton>
    </div>

    <div v-if="pinnedActivities.length > 0">
      <p class="font-normal py-4">Ancladas</p>
      <hr>
      <Task v-for="activity in pinnedActivities"
            :key="activity.id"
            :activity="activity" />
    </div>

    <div v-if="delayedActivities.length > 0">
      <p class="font-normal py-4">Atrasadas</p>
      <hr>
      <Task v-for="activity in delayedActivities"
            :key="activity.id"
            :activity="activity" />
    </div>

    <div>
      <p class="font-normal py-4">Pendientes</p>
      <hr>
      <Task v-for="activity in pendingTasks"
            :key="activity.id"
            :activity="activity" />
    </div>

    <div v-if="completedActivities.length > 0">
      <p class="font-normal py-4">Completadas</p>
      <hr>
      <Task v-for="activity in completedActivities"
            :key="activity.id"
            :activity="activity" />
    </div>
  </div>

</template>
<script setup lang="ts">
import useContacts from "@/composables/useContacts";
import useActivities, { useActivitiesComponents } from "@/composables/useActivities";
import { onBeforeMount } from "#imports";

const { contact } = useContacts();
const { Task }    = useActivitiesComponents();

const {
        getActivityByContact,
        pinnedTasks,
        pendingTasks,
        completedTasks,
        delayedTasks,
        addTask
      } = useActivities();

onBeforeMount(async () => {
  await getActivityByContact(contact);
});
</script>

<template>
  <div class="p-2 text-slate-500">

    <div class="flex justify-center py-4">
      <UIButton type="submit" :active="true" @click="addTask('call')">
        Crear Tarea
      </UIButton>
    </div>

    <div class="activities" v-if="pinnedTasks?.length > 0">
      <p class="font-normal py-4">Ancladas</p>
      <hr>
      <Task v-for="task in pinnedTasks" :key="task.id" :task="task" />
    </div>

    <div class="activities" v-if="delayedTasks?.length > 0">
      <p class="font-normal py-4">Atrasadas</p>
      <hr>
      <Task v-for="task in delayedTasks" :key="task.id" :task="task" />
    </div>

    <div class="activities" v-if="pendingTasks?.length > 0">
      <p class="font-normal py-4">Pendientes</p>
      <hr>
      <div class="activities">
        <Task v-for="task in pendingTasks" :key="task.id" :task="task" />
      </div>
    </div>

    <div class="activities" v-if="completedTasks?.length > 0">
      <p class="font-normal py-4">Pasadas</p>
      <hr>
      <Task v-for="task in completedTasks" :key="task.id" :task="task" />
    </div>
  </div>

</template>

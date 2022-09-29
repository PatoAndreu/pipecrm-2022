<script lang="ts" setup>
import useContacts from "@/composables/useContacts";
import useActivities, { useActivitiesComponents } from "@/composables/useActivities";

const { contact } = useContacts();
const { Task }    = useActivitiesComponents();

const {
        pinnedTasks,
        pendingTasks,
        completedTasks,
        delayedTasks,
        addTask
      } = useActivities();

</script>

<template>
  <div class="p-2 text-slate-500">

    <div class="flex justify-center py-4">
      <UIButton :active="true" type="submit" @click="addTask('call')">
        Crear Tarea
      </UIButton>
    </div>
    <div v-auto-animate>
      <div v-if="pinnedTasks?.length > 0" v-auto-animate class="activities">
        <p class="font-normal py-4">Ancladas</p>
        <hr>
        <Task v-for="task in pinnedTasks" :key="task.id" :task="task" />
      </div>

      <div v-if="delayedTasks?.length > 0" v-auto-animate class="activities">
        <p class="font-normal py-4">Atrasadas</p>
        <hr>
        <Task v-for="task in delayedTasks" :key="task.id" :task="task" />
      </div>

      <div v-if="pendingTasks?.length > 0" v-auto-animate class="activities">
        <p class="font-normal py-4">Pendientes</p>
        <hr>
        <Task v-for="task in pendingTasks" :key="task.id" :task="task" />
      </div>

      <div v-if="completedTasks?.length > 0" v-auto-animate class="activities">
        <p class="font-normal py-4">Pasadas</p>
        <hr>
        <Task v-for="task in completedTasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>

</template>

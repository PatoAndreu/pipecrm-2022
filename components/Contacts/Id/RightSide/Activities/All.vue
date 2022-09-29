<script lang="ts" setup>
import useContacts from "@/composables/useContacts";
import useActivities, { useActivitiesComponents } from "@/composables/useActivities";

const { contact }    = useContacts();
const { Note, Task } = useActivitiesComponents();

const {
        pinnedActivities,
        pendingActivities,
        completedActivities,
        delayedTasks
      } = useActivities();

</script>

<template>
  <div v-auto-animate class="p-2 text-slate-500">

    <div v-if="pinnedActivities?.length > 0" v-auto-animate class="activities">
      <p class="font-normal py-4">Ancladas</p>
      <hr>
      <template v-for="task in pinnedActivities"
                :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>

    <div v-if="delayedTasks?.length > 0" v-auto-animate class="activities">
      <p class="font-normal py-4">Atrasadas</p>
      <hr>
      <template v-for="task in delayedTasks"
                :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>

    <div v-if="pendingActivities?.length > 0" v-auto-animate class="activities">
      <p class="font-normal py-4">Pendientes</p>
      <hr>
      <template v-for="task in pendingActivities"
                :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>

    <div v-if="completedActivities?.length > 0" v-auto-animate class="activities">
      <p class="font-normal py-4">Pasadas</p>
      <hr>
      <template v-for="task in completedActivities"
                :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>
  </div>
</template>



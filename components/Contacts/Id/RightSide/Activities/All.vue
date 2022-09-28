<script setup lang="ts">
import useContacts from "@/composables/useContacts";
import useActivities, { useActivitiesComponents } from "@/composables/useActivities";
import { onMounted } from "#imports";

const { contact }    = useContacts();
const { Note, Task } = useActivitiesComponents();

const {
        getActivityByContact,
        pinnedActivities,
        pendingActivities,
        completedActivities,
        delayedTasks
      } = useActivities();

onMounted(async () => {
  await getActivityByContact(contact);
});

</script>

<template>
  <div class="p-2 text-slate-500" v-auto-animate>

    <div class="activities" v-if="pinnedActivities?.length > 0" v-auto-animate>
      <p class="font-normal py-4">Ancladas</p>
      <hr>
      <template v-for="task in pinnedActivities"
                :key="task.id">
        <Note :note="task" v-if="task.type === 'note'"/>
        <Task :task="task" v-else/>
      </template>
    </div>

    <div class="activities" v-if="delayedTasks?.length > 0" v-auto-animate>
      <p class="font-normal py-4">Atrasadas</p>
      <hr>
      <template v-for="task in delayedTasks"
                :key="task.id">
        <Note :note="task" v-if="task.type === 'note'" />
        <Task :task="task" v-else />
      </template>
    </div>

    <div class="activities" v-if="pendingActivities?.length > 0" v-auto-animate>
      <p class="font-normal py-4">Pendientes</p>
      <hr>
      <template v-for="task in pendingActivities"
                :key="task.id">
        <Note :note="task" v-if="task.type === 'note'" />
        <Task :task="task" v-else />
      </template>
    </div>

    <div class="activities" v-if="completedActivities?.length > 0" v-auto-animate>
      <p class="font-normal py-4">Pasadas</p>
      <hr>
      <template v-for="task in completedActivities"
                :key="task.id">
        <Note :note="task" v-if="task.type === 'note'" />
        <Task :task="task" v-else />
      </template>
    </div>
  </div>
</template>



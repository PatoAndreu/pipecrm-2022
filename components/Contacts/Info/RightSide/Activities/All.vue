<script setup lang="ts">
import Task from "@/components/Contacts/Info/RightSide/Activities/Tasks/Task";
import Note from "@/components/Contacts/Info/RightSide/Activities/Notes/Note";

const { contact } = useContacts();

const { getActivities, pinnedActivities, pendingActivities, completedActivities, delayedActivities } = useActivities();

await getActivities(contact);

</script>

<template>
  <div class="p-2 text-slate-500">

    <div v-if="pinnedActivities.length > 0">
      <p class="font-normal py-4">Ancladas</p>
      <hr>
      <template v-for="activity in pinnedActivities"
                :key="activity.id"
                :activity="activity">
        <Note :activity="activity" v-if="activity.type === 'note'" />
        <Task :activity="activity" v-else />
      </template>
    </div>

    <div v-if="delayedActivities.length > 0">
      <p class="font-normal py-4">Atrasadas</p>
      <hr>
      <template v-for="activity in delayedActivities"
                :key="activity.id"
                :activity="activity">
        <Note :activity="activity" v-if="activity.type === 'note'" />
        <Task :activity="activity" v-else />
      </template>
    </div>

    <div v-if="pendingActivities.length > 0">
      <p class="font-normal py-4">Pendientes</p>
      <hr>
      <template v-for="activity in pendingActivities"
                :key="activity.id"
                :activity="activity">
        <Note :activity="activity" v-if="activity.type === 'note'" />
        <Task :activity="activity" v-else />
      </template>
    </div>

    <div v-if="completedActivities.length > 0">
      <p class="font-normal py-4">Completadas</p>
      <hr>
      <template v-for="activity in completedActivities"
                :key="activity.id"
                :activity="activity">
        <Note :activity="activity" v-if="activity.type === 'note'" />
        <Task :activity="activity" v-else />
      </template>
    </div>

  </div>
</template>
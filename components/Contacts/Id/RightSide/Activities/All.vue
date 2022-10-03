<script lang="ts" setup>
  import useTasks, { useTasksComponents } from '@/composables/useTasks'
  import useNotes, { useNotesComponents } from '@/composables/useNotes'

  const { Task } = useTasksComponents()
  const { Note } = useNotesComponents()
  const { contact } = useContacts()
  const {
    getActivityByContact,
    delayedActivities,
    pinnedActivities,
    pendingActivities,
    completedActivities
  } = useActivity()

  await getActivityByContact(contact.value.id)
</script>

<template>
  <div class="p-2 text-slate-500">
    <div v-if="pinnedActivities?.length > 0" class="activities" v-auto-animate>
      <p class="py-4 font-normal">Ancladas</p>
      <hr />
      <template v-for="task in pinnedActivities" :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>

    <div v-if="delayedActivities?.length > 0" class="activities" v-auto-animate>
      <p class="py-4 font-normal">Atrasadas</p>
      <hr />
      <template v-for="task in delayedActivities" :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>

    <div v-if="pendingActivities?.length > 0" class="activities" v-auto-animate>
      <p class="py-4 font-normal">Pendientes</p>
      <hr />
      <template v-for="task in pendingActivities" :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>

    <div v-if="completedActivities?.length > 0" class="activities" v-auto-animate>
      <p class="py-4 font-normal">Pasadas</p>
      <hr />
      <template v-for="task in completedActivities" :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>
  </div>
</template>

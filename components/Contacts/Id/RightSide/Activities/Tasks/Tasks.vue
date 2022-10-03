<script lang="ts" setup>
import useContacts from "@/composables/useContacts"
import useTasks, { useTasksComponents } from "@/composables/useTasks"

const { contact } = useContacts()
const { Task } = useTasksComponents()

const {
  pinnedTasks,
  pendingTasks,
  completedTasks,
  delayedTasks,
  getTasksByContact,
  addTask
} = useTasks()

await getTasksByContact(contact.value.id)
</script>

<template>
  <div class="p-2 text-slate-500">
    <div class="flex justify-center py-4">
      <UIButton :active="true" type="submit" @click="addTask('call', contact)">
        Crear Tarea
      </UIButton>
    </div>
    <div v-auto-animate>
      <div v-if="pinnedTasks?.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal">Ancladas</p>
        <hr />
        <Task v-for="task in pinnedTasks" :key="task.id" :task="task" />
      </div>

      <div v-if="delayedTasks?.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal">Atrasadas</p>
        <hr />
        <Task v-for="task in delayedTasks" :key="task.id" :task="task" />
      </div>

      <div v-if="pendingTasks?.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal">Pendientes</p>
        <hr />
        <Task v-for="task in pendingTasks" :key="task.id" :task="task" />
      </div>

      <div v-if="completedTasks?.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal">Pasadas</p>
        <hr />
        <Task v-for="task in completedTasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>

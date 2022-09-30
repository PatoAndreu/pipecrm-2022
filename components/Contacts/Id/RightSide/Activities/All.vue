<script lang="ts" setup>
import useContacts from "@/composables/useContacts";
import useTasks, { useTasksComponents } from "@/composables/useTasks";


const { contact }    = useContacts();
const { Note, Task } = useTasksComponents();

const {
        pinnedTasks,
        pendingTasks,
        completedTasks,
        delayedTasks
      } = useTasks();

</script>

<template>
  <div v-auto-animate class="p-2 text-slate-500">

    <div v-if="pinnedTasks?.length > 0" v-auto-animate class="activities">
      <p class="font-normal py-4">Ancladas</p>
      <hr>
      <template v-for="task in pinnedTasks"
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

    <div v-if="pendingTasks?.length > 0" v-auto-animate class="activities">
      <p class="font-normal py-4">Pendientes</p>
      <hr>
      <template v-for="task in pendingTasks"
                :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>

    <div v-if="completedTasks?.length > 0" v-auto-animate class="activities">
      <p class="font-normal py-4">Pasadas</p>
      <hr>
      <template v-for="task in completedTasks"
                :key="task.id">
        <Note v-if="task.type === 'note'" :note="task" />
        <Task v-else :task="task" />
      </template>
    </div>
  </div>
</template>



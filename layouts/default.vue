<script lang="ts" setup>
import useTasks, { useTasksComponents } from "@/composables/useTasks";

const { showModal } = useTasks();
const { TaskModal, NoteModal } = useTasksComponents();

</script>

<template>
  <div class="min-w-[1024px]" style="background-color: #f5f8fa;">
    <UIHeader />
    <slot />
    <NoteModal v-if="showModal" />
    <TaskModal v-if="showModal" />
  </div>
</template>
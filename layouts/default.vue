<script lang="ts" setup>
import useActivities, { useActivitiesComponents } from "../composables/useActivities";

const { showModal } = useActivities();
const { TaskModal, NoteModal } = useActivitiesComponents();

</script>

<template>
  <div class="min-w-[1024px]" style="background-color: #f5f8fa;">
    <UIHeader />
    <slot />
    <NoteModal v-if="showModal" />
    <TaskModal v-if="showModal" />
  </div>
</template>
<script lang="ts" setup>
  import DeleteModal from '@/components/UI/DeleteModal.vue'
  import TaskModal from '@/components/Tasks/TaskModal.vue'
  import NoteModal from '@/components/Notes/NoteModal.vue'
  import MeetingModal from '@/components/Meetings/MeetingModal.vue'
</script>

<template>
  <div id="default-layout" class="min-h-screen min-w-[1024px]">
    <UIHeader />
    <div id="main-content">
      <slot />
    </div>
    <NoteModal />
    <TaskModal />
    <MeetingModal />
    <DeleteModal />
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,600&display=swap');
  body {
    font-family: 'Nunito', sans-serif;
  }
</style>
<style scoped>
  .modal-bg {
    background-color: rgb(93, 106, 120, 0.9);
  }

  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.25s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }
</style>

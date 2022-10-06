<script lang="ts" setup>
  import useTasks from '@/composables/useTasks'
  import useNotes from '@/composables/useNotes'
  import DeleteModal from '@/components/UI/DeleteModal.vue'

  import TaskModal from '@/components/Tasks/TaskModal.vue'
  import NoteModal from '@/components/Notes/NoteModal.vue'
  import MeetingModal from '@/components/Meetings/MeetingModal.vue'

  const { showTaskModal } = useTasks()
  const { showNoteModal } = useNotes()
  const { showMeetingModal } = useMeetings()
</script>

<template>
  <div id="default-layout" class="min-h-screen min-w-[1024px]" style="background-color: #f5f8fa">
    <UIHeader />
    <slot />
    <NoteModal />
    <TaskModal />
    <MeetingModal />
    <DeleteModal />
  </div>
</template>

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

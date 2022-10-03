<script lang="ts" setup>
  import useTasks, { useTasksComponents } from '@/composables/useTasks'
  import useNotes, { useNotesComponents } from '@/composables/useNotes'
  import DeleteModal from '@/components/UI/DeleteModal.vue'

  const { showTaskModal } = useTasks()
  const { showNoteModal } = useNotes()

  const { TaskModal } = useTasksComponents()
  const { NoteModal } = useNotesComponents()
</script>

<template>
  <div id="default-layout" class="min-h-screen min-w-[1024px]" style="background-color: #f5f8fa">
    <UIHeader />
    <slot />
    <NoteModal v-if="showNoteModal" />
    <TaskModal v-if="showTaskModal" />
    <DeleteModal />
  </div>
</template>

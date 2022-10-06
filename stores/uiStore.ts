
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showSearchBox: false,
    showCreateContactDrawer: false,
    deleteModalOpen: false,
    deleteMessage: null,
    errorMessage: false,
    deleteAction: null,
    pending: false
  }),
  actions: {
    toggleSearchBox(): void {
      this.showSearchBox = !this.showSearchBox
    },
    toggleCreateContactDrawer(): void {
      this.showCreateContactDrawer = !this.showCreateContactDrawer
    },
    openDeleteModal(message: string, action: string): void {
      this.deleteMessage = message
      this.deleteModalOpen = true
      this.deleteAction = action
    },
    cancelDeleteModal(): void {
      this.deleteMessage = null
      this.deleteModalOpen = false
      this.deleteAction = null
    },
    async confirmDeleteModal() {

      this.errorMessage = false
      this.pending = true

      let response: any

      switch (this.deleteAction) {
        case 'deleteNote':
          const { deleteNote } = useNotes()
          response = await deleteNote()
          break;

        case 'deleteTask':
          const { deleteTask } = useTasks()
          response = await deleteTask()
          break;
      }

      if (response.response.status === 200) {
        this.pending = false
        this.cancelDeleteModal()
      } else {
        this.errorMessage = true
      }
    },
    closeAllModals(): void {
      const { closeTaskModal } = useTasks()
      const { closeNoteModal } = useNotes()
      const { closeMeetingModal } = useMeetings()
      this.cancelDeleteModal()
      closeTaskModal()
      closeNoteModal()
      closeMeetingModal()
    }
  }
})

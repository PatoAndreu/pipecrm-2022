import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showSearchBox: false,
    showCreateContactDrawer: false,
    deleteModalOpen: false,
    confirmDelete: false,
    deleteMessage: null
  }),
  actions: {
    toggleSearchBox(): void {
      this.showSearchBox = !this.showSearchBox
    },
    toggleCreateContactDrawer(): void {
      this.showCreateContactDrawer = !this.showCreateContactDrawer
    },
    showDeleteModal(message: string): void {
      this.deleteMessage = message
      this.deleteModalOpen = true
    },
    hideDeleteModal(): void {
      this.deleteMessage = null
      this.deleteModalOpen = false
    },
    confirmDeleteModal(): void {
      this.confirmDelete = true
    }
  }
})

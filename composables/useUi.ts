import { useUIStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

export default function useTasks() {
  const uiStore = useUIStore()

  const { showSearchBox, showCreateContactDrawer, deleteMessage, pending, deleteModalOpen, errorMessage } = storeToRefs(uiStore)

  const toggleSearchBox = () => uiStore.toggleSearchBox()
  const toggleCreateContactDrawer = () => uiStore.toggleCreateContactDrawer()
  const openDeleteModal = (message: string, action: string) => uiStore.openDeleteModal(message, action)
  const cancelDeleteModal = () => uiStore.cancelDeleteModal()
  const confirmDeleteModal = () => uiStore.confirmDeleteModal()

  return {
    showSearchBox,
    showCreateContactDrawer,
    deleteModalOpen,
    deleteMessage,
    errorMessage,
    pending,
    toggleSearchBox,
    toggleCreateContactDrawer,
    openDeleteModal,
    cancelDeleteModal,
    confirmDeleteModal
  }
}

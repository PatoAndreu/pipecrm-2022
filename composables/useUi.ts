import { useUIStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'

export default function useTasks() {
  const uiStore = useUIStore()

  const { showSearchBox, showCreateContactDrawer, deleteModalOpen, confirmDelete, deleteMessage } = storeToRefs(uiStore)

  const toggleSearchBox = () => uiStore.toggleSearchBox()
  const toggleCreateContactDrawer = () => uiStore.toggleCreateContactDrawer()
  const showDeleteModal = (message: string) => uiStore.showDeleteModal(message)
  const hideDeleteModal = () => uiStore.hideDeleteModal()
  const confirmDeleteModal = () => uiStore.confirmDeleteModal()

  return {
    showSearchBox,
    showCreateContactDrawer,
    deleteModalOpen,
    confirmDelete,
    deleteMessage,
    toggleSearchBox,
    toggleCreateContactDrawer,
    showDeleteModal,
    hideDeleteModal,
    confirmDeleteModal
  }
}

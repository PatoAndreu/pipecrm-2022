import { useActivitiesStore } from "@/stores/activitiesStore";
import { storeToRefs } from "pinia";

export default function useActivities() {

  const activitiesStore = useActivitiesStore();

  const { note, noteModalOpen, isEditing, minimize } = storeToRefs(activitiesStore);
  const saveNote = (): Promise<void> => activitiesStore.saveNote()
  const closeNoteModal = () => activitiesStore.closeNoteModal()

  return {
    note, noteModalOpen, isEditing, minimize,
    saveNote, closeNoteModal
  }
}
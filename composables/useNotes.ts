import { INote } from "@/interfaces/INotes"
import { storeToRefs } from "pinia"
import { useNotesStore } from "@/stores/notesStore"
import { IContact } from "@/interfaces/IContacts"
import useUi from "@/composables/useUi"

export default function useNotes() {
  const notesStore = useNotesStore()

  const { notes, note, showNoteModal, openDeleteModal, isEditing, minimize, showAssociations } = storeToRefs(notesStore)

  const getNotesByContact = (id: number) => notesStore.getNotesByContact(id)
  const addNote = (contact?: IContact): void => notesStore.addNote(contact)
  const saveNote = async () => await notesStore.saveNote()
  const pinOrUnpinNote = async (note: INote, status: boolean) => await notesStore.pinOrUnpinNote(note, status)
  const editNote = (note: INote): void => notesStore.editNote(note)
  const closeNoteModal = (): void => notesStore.closeNoteModal()
  const deleteNote = async () => await notesStore.deleteNote()
  const openNoteDeleteModal = (note: INote) => notesStore.openNoteDeleteModal(note)

  const pinnedNotes = computed<INote[]>(() => {
    return notes?.value?.filter((a) => a.pinned)
  })

  const unpinnedNotes = computed<INote[]>(() => {
    return notes?.value?.filter((a) => !a.pinned)
  })

  const disabledNoteForm = computed(() => {
    return note.value.text.length < 1
  })


  return {
    note,
    notes,
    pinnedNotes,
    unpinnedNotes,
    showNoteModal,
    openDeleteModal,
    isEditing,
    minimize,
    disabledNoteForm,
    showAssociations,
    getNotesByContact,
    addNote,
    saveNote,
    pinOrUnpinNote,
    editNote,
    deleteNote,
    openNoteDeleteModal,
    closeNoteModal
  }
}


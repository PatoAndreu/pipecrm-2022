import { INote } from "@/interfaces/INotes"
import { storeToRefs } from "pinia"
import { useNotesStore } from "@/stores/notesStore"
import { IContact } from "@/interfaces/IContacts"
import useUi from "@/composables/useUi"

import Notes from "@/components/Contacts/Id/RightSide/Activities/Notes/Notes.vue"
import Note from "@/components/Contacts/Id/RightSide/Activities/Notes/Note.vue"
import NoteModal from "@/components/Contacts/Id/RightSide/Activities/Notes/NoteModal.vue"

export default function useNotes() {
  const notesStore = useNotesStore()
  const { deleteModalOpen } = useUi()

  const { notes, note, showNoteModal, showDeleteModal, isEditing, minimize, showAssociations } = storeToRefs(notesStore)

  const getNotesByContact = (id: number) => notesStore.getNotesByContact(id)
  const addNote = (contact?: IContact): void => notesStore.addNote(contact)
  const saveNote = async () => await notesStore.saveNote()
  const pinOrUnpinNote = async (note: INote, status: boolean) => await notesStore.pinOrUnpinNote(note, status)
  const editNote = (note: INote): void => notesStore.editNote(note)
  const closeNoteModal = (): void => notesStore.closeNoteModal()
  const deleteNote = async (note: INote) => {
    await notesStore.deleteNote(note)
  }

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
    showDeleteModal,
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
    closeNoteModal
  }
}

export function useNotesComponents() {
  return {
    Note,
    Notes,
    NoteModal
  }
}

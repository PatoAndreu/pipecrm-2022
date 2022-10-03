import { NotesState, INote } from '@/interfaces/INotes'
import { IContact } from '@/interfaces/IContacts'
import { defineStore } from 'pinia'

const initialNote: INote = {
  id: null,
  text: '',
  pinned: false,
  type: null,
  owner: null,
  deal: null,
  contact: null,
  company: null,
  createdAt: null,
  updatedAt: null
}



export const useNotesStore = defineStore('notes', {
  state: (): NotesState => ({
    note: { ...initialNote },
    notes: [],
    showNoteModal: false,
    showDeleteModal: false,
    isEditing: false,
    minimize: false,
    showAssociations: false
  }),
  actions: {
    async getNotesByContact(id: number): Promise<void> {
      try {
        let data: INote[]
          ; ({ data } = await $fetch(`http://pipecrm-api.test/api/notes/contact/${id}`))
        this.notes = []
        this.notes = data
      } catch (error) {
        console.error(error)
      }
    },

    async saveNote() {
      const { contact } = useContacts()
      const url = this.isEditing
        ? `http://pipecrm-api.test/api/notes/${this.note.id}`
        : 'http://pipecrm-api.test/api/notes'

      try {
        const response = await $fetch(url, {
          method: this.isEditing ? 'PATCH' : 'POST',
          body: { ...this.note }
        })
        await this.getNotesByContact(contact.value.id)
        this.showNoteModal = false
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async pinOrUnpinNote(note: INote, status: boolean) {
      const { contact } = useContacts()
      const { getActivityByContact, activeTab } = useActivity()

      try {
        const response = await $fetch(`http://pipecrm-api.test/api/notes/${note.id}`, {
          method: 'PATCH',
          body: {
            ...note,
            pinned: status
          }
        })
        if (activeTab.value === 'activity') {
          await getActivityByContact(contact.value.id)
        }
        await this.getNotesByContact(contact.value.id)
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async deleteNote(note: INote) {
      try {

        const response = await $fetch(`http://pipecrm-api.test/api/notes/${note.id}`, {
          method: 'DELETE'
        })

        if (note.id === this.note.id) {
          this.isEditing = false
          this.minimize = false
        }

        const { activeTab, getActivityByContact } = useActivity()
        const { contact } = useContacts()
        const { deleteModalOpen, deleteMessage } = useUi()

        if (activeTab.value === 'activity') {
          await getActivityByContact(contact.value.id)
        } else {
          await this.getNotesByContact(contact.value.id)
        }

        deleteModalOpen.value = false
        deleteMessage.value = null
        this.note = null

        return response
      } catch (error) {
        console.error(error)
      }
    },
    closeNoteModal() {
      this.note = { ...initialNote }
      this.showNoteModal = false
      this.minimize = false
      this.showAssociations = false
    },
    addNote(contact?: IContact) {
      this.note = {
        ...initialNote,
        owner: { id: 1 },
        contact: contact
      }
      this.showNoteModal = false
      this.minimize = false
      this.isEditing = false
      this.showAssociations = false

      this.showNoteModal = true
    },
    editNote(note: INote) {
      this.note = { ...note }
      this.showNoteModal = true
      this.minimize = false
      this.isEditing = true
    },
    deleteModal(note: INote) {

      const { deleteModalOpen, deleteMessage, confirmDelete } = useUi()

      this.note = { ...note }
      deleteMessage.value = '¿Está seguro de que desea eliminar esta nota?'
      deleteModalOpen.value = true
      confirmDelete.value = false
    }
  }
})

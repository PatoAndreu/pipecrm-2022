import { IContact } from '@/interfaces/IContacts';
import { defineStore } from "pinia"
import { IMeeting, MeetingsState } from "@/interfaces/IMeetings"

interface HttpResponse<T> {
  data: T[];
}

const initialMeeting: IMeeting = {
  title: null,
  date: null,
  time: null,
  type: 'program',
  pinned: false,
  duration: null,
  attenders: null,
  result: null,
  description: null,
  createdAt: null,
  updatedAt: null
}

export const useMeetingsStore = defineStore("meetings", {
  state: (): MeetingsState => ({
    meeting: { ...initialMeeting },
    meetings: null,
    showMeetingModal: false,
    openDeleteModal: false,
    isEditing: false,
    minimize: false,
    showAssociations: false,
  }),
  actions: {
    async getMeetingsByContact<T>(id: number): Promise<void> {
      try {
        let data: IMeeting[]
        ({ data } = await $fetch(`http://pipecrm-api.test/api/meetings/contact/${id}`))
        this.meetings = []
        this.meetings = data
      } catch (error) {
        console.error(error)
      }
    },
    async saveMeeting() {
      const { contact } = useContacts()
      const url = this.isEditing
        ? `http://pipecrm-api.test/api/meetings/${this.meeting.id}`
        : "http://pipecrm-api.test/api/meetings"

      try {
        const response = await $fetch(url, {
          method: this.isEditing ? "PATCH" : "POST",
          body: { ...this.meeting }
        })

        await this.getMeetingsByContact(contact.value.id)

        this.showMeetingModal = false
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async changeMeetingStatus(meeting: IMeeting, status: object) {
      const { contact } = useContacts()
      try {
        const response = await $fetch(`http://pipecrm-api.test/api/meetings/${meeting.id}`, {
          method: "PATCH",
          body: {
            ...meeting,
            [Object.keys(status)[0]]: Object.values(status)[0],
          }
        })

        await this.getMeetingsByContact(contact.value.id)
        return response
      } catch (error) {
        console.error(error)
      }
    },
    addMeeting(type: string, contact?: IContact) {

      this.meeting = {
        ...initialMeeting,
        owner: {
          id: 1,
          firstName: "Patricio",
          lastName: "Andreu",
          email: "patricioandreu@gmail.com",
        },
        type: type,
        contact: { ...contact }
      }
      this.showMeetingModal = false
      this.minimize = false
      this.isEditing = false
      this.showAssociations = false
      this.showMeetingModal = true
    },
    editMeeting(meeting: IMeeting) {
      this.meeting = { ...meeting }
      this.showMeetingModal = true
      this.minimize = false
      this.isEditing = true
    },
    closeMeetingModal() {
      this.meeting = { ...initialMeeting }
      this.showMeetingModal = false
      this.minimize = false
      this.showAssociations = false
    },
    openTaskDeleteModal(meeting: IMeeting) {

      const { openDeleteModal } = useUi()

      this.meeting = { ...meeting }
      openDeleteModal('¿Está seguro de que desea eliminar esta reunión?', 'deleteMeeting')
    }
  }

})
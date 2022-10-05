import { IContact } from '@/interfaces/IContacts';
import { IMeeting } from '@/interfaces/IMeetings';
import { storeToRefs } from "pinia"
import { useMeetingsStore } from "@/stores/meetingsStore"

import Meetings from "@/components/Contacts/Id/RightSide/Activities/Meetings/Meetings.vue"
import Meeting from "@/components/Contacts/Id/RightSide/Activities/Meetings/Meeting.vue"
import MeetingModal from "@/components/Contacts/Id/RightSide/Activities/Meetings/MeetingModal.vue"

export default function useMeetings() {
  const meetingsStore = useMeetingsStore()

  const {
    meeting,
    meetings,
    showMeetingModal,
    openDeleteModal,
    isEditing,
    minimize,
    showAssociations,
  } = storeToRefs(meetingsStore)

  const getMeetingsByContact = (id: number) => meetingsStore.getMeetingsByContact(id)
  const addMeeting = (type: string, contact?: IContact): void => meetingsStore.addMeeting(type, contact)
  const saveMeeting = async () => await meetingsStore.saveMeeting()
  const editMeeting = (meeting: IMeeting): void => meetingsStore.editMeeting(meeting)
  const changeMeetingStatus = async (meeting: IMeeting, status: object) => await meetingsStore.changeMeetingStatus(meeting, status)

  const closeMeetingModal = (): void => meetingsStore.closeMeetingModal()
  const openMeetingDeleteModal = async (meeting: IMeeting) => meetingsStore.openTaskDeleteModal(meeting)

  const pinnedMeetings = computed<IMeeting[]>(() => {
    return meetings.value.filter((a) => a.pinned)
  })

  const unpinnedMeetings = computed<IMeeting[]>(() => {
    return meetings.value.filter((a) => !a.pinned)
  })

  return {
    meeting,
    meetings,
    pinnedMeetings,
    unpinnedMeetings,
    showMeetingModal,
    openDeleteModal,
    isEditing,
    minimize,
    showAssociations,
    getMeetingsByContact,
    addMeeting,
    saveMeeting,
    editMeeting,
    changeMeetingStatus,
    closeMeetingModal,
    openMeetingDeleteModal
  }
}

export function useMeetingsComponents() {
  return {
    Meetings,
    Meeting,
    MeetingModal
  }
}
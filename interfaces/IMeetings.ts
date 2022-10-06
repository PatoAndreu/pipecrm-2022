import { IDeal } from '@/interfaces/IDeals';
import { IUser } from '@/interfaces/IUsers';
import { ICompany } from '@/interfaces/ICompany';
import { IContact } from '@/interfaces/IContacts';

export interface IMeeting {
  readonly id?: number
  title: string
  date: string
  time: string
  type: string
  pinned: boolean
  duration: string
  attenders: []
  result: string
  description: string
  contact?: IContact
  company?: ICompany
  owner?: IUser
  deal?: IDeal
  createdAt: string,
  updatedAt: string
}

export interface MeetingsState {
  meeting: IMeeting
  meetings: IMeeting[]
  showMeetingModal: boolean
  openDeleteModal: boolean
  isEditing: boolean
  showAssociations: boolean
  minimize: boolean
}
import { IDeal } from "./IDeals"
import { IUser } from "./IUsers"
import { IContact } from "./IContacts"
import { ICompany } from "./ICompany"

export interface INote {
  readonly id: number
  text: string
  pinned: boolean
  type: string
  company: ICompany
  contact: IContact
  owner: IUser
  deal: IDeal
  createdAt?: string
  updatedAt?: string
}

export interface NotesState {
  note: INote
  notes: INote[]
  showNoteModal: boolean
  openDeleteModal: boolean
  isEditing: boolean
  showAssociations: boolean
  minimize: boolean
}

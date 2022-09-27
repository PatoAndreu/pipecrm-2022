import { IUser } from "@/interfaces/IUsers";
import { IDeal } from "@/interfaces/IDeals";
import { IContact } from "@/interfaces/IContacts";
import { ICompany } from "@/interfaces/ICompany";

export interface IActivity {
  readonly id: number | undefined,
  text: string | undefined
  pinned?: boolean
  completed: boolean
  date: string
  time: string
  type: string
  priority: string | undefined
  note: string | undefined
  delayed: boolean
  owner: IUser
  deal: IDeal
  contact: IContact
  company: ICompany
  createdAt: string
  updatedAt?: string
}

export interface ActivitiesState {
  activities: IActivity[];
  task: IActivity;
  showModal: boolean;
  isEditing: boolean;
  showAssociations: boolean;
  minimize: boolean;
  activeTab: string;
}
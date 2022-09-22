import { UserInterface } from "@/interfaces/IUsers";
import { Deal } from "@/interfaces/IDeals";
import { ContactInterface } from "@/interfaces/IContacts";
import { Company } from "@/interfaces/ICompany";

export interface Activity {
  readonly id: number | undefined,
  text: string | undefined
  pinned?: boolean
  completed: boolean
  date: string
  time: string
  type: string
  delayed: boolean
  owner: UserInterface
  deal: Deal
  contact: ContactInterface
  company: Company
  createdAt: string
  updatedAt?: string
}

export interface ActivitiesState {
  activity: Activity;
  activities: Activity[];
  activityModalOpen: boolean;
  isEditing: boolean;
  minimize: boolean;
  activeTab: string;
}
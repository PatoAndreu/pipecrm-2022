import { IDeal } from '@/interfaces/IDeals'

interface LifecycleStage {
  id: number,
  name: string,
}

interface Owner {
  id: number,
  first_name: string,
  last_name: string,
}

interface Company {
  id: number,
  name: string,
}

interface ContactStage {
  id: number,
  name: string,
}

interface ContactStatus {
  id: number,
  name: string,
}

export interface ContactInterface {
  city: number | undefined,
  company?: Company,
  contactStatus?: ContactStatus | undefined
  created_at: string,
  updated_at: string,
  deals: Array<IDeal> | undefined,
  email: string,
  firstName: string,
  jobTitle: string | undefined,
  lastName: string,
  lifeCycleStage: LifecycleStage,
  mobilePhoneNumber: number | undefined,
  owner: Owner,
  phoneNumber: string | undefined,
  region: number | undefined,
  address: string | undefined,
  websiteUrl: string | undefined,
}

export interface ContactState {
  pending: boolean,
  contact: ContactInterface,
  contacts: ContactInterface[],
  contactStatus: ContactStatus[],
  contactStage: ContactStage[]
  errorMessages: [],
  showDrawer: boolean,
  isEditing: boolean
}
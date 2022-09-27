import { IDeal } from "@/interfaces/IDeals";

interface IContactLifecycleStage {
  readonly id: number,
  name: string,
}

interface IOwner {
  readonly id: number,
  firstName: string,
  lastName: string,
}

interface ICompany {
  readonly id: number,
  name: string,
}

interface IContactStatus {
  readonly id: number | undefined,
  name: string | undefined,
}

export interface IContact {
  readonly id: number,
  city: number | undefined,
  company: ICompany,
  contactStatus: IContactStatus | undefined
  createdAt: string,
  updatedAt: string,
  deals: Array<IDeal> | undefined,
  email: string,
  firstName: string,
  jobTitle: string | undefined,
  lastName: string,
  contactLifeCycleStage?: IContactLifecycleStage | undefined,
  mobilePhoneNumber: number | undefined,
  owner: IOwner | undefined,
  phoneNumber: string | undefined,
  region: number | undefined,
  address: string | undefined,
  websiteUrl: string | undefined,
}

export interface IContactState {
  pending: boolean,
  contact: IContact,
  contacts: IContact[],
  contactStatus: IContactStatus[],
  contactLifeCycleStage: IContactLifecycleStage[]
  errorMessages: [],
  showDrawer: boolean,
  isEditing: boolean,
  tabSelected: string,
  filterUser: IOwner,
  filterDate:
    {
      readonly id: number,
      name: string
    },
}


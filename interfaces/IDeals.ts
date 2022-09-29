import { IContact } from "~/interfaces/IContacts";
import { ICompany } from "~/interfaces/ICompany";
import { IUser } from "~/interfaces/IUsers";

export interface IDeal {
  readonly id: number,
  name: string,
  amount: number,
  priority: string,
  closeDate: string,
  probabilityOfClose: string,
  contact: IContact,
  company: ICompany,
  owner: IUser,
  pipeline: object,
  pipelineStage: object,
  createdAt: string,
  updatedAt: string,
}

export interface IDealStore {
  deal: IDeal,
  deals: IDeal[]
}
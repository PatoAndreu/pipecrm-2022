import { IContact } from "@/interfaces/IContacts"
import { ICompany } from "@/interfaces/ICompany"
import { IUser } from "@/interfaces/IUsers"
import { IPipeline, IPipelineStage } from "@/interfaces/IPipelines"


export interface IDeal {
  readonly id: number
  name: string
  amount?: number
  priority?: string
  type?: string
  order?: number
  closeDate: string
  contact: IContact
  company: ICompany
  owner: IUser
  pipeline: IPipeline
  pipelineStage?: IPipelineStage
  createdAt: string
  updatedAt: string
}

export interface IDealStore {
  deal: IDeal
  deals: IDeal[]
  tabSelected: string
  pipeline: IPipeline
}

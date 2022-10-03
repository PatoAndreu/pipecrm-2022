import { IContact } from "~/interfaces/IContacts"
import { ICompany } from "~/interfaces/ICompany"
import { IUser } from "~/interfaces/IUsers"

interface Pipeline {
  readonly id: number
  name: string
  order: number
  pipelineStage: PipelineStage
}

interface PipelineStage extends Pipeline {
  probabilityOfClose: string
  pipelineId: number
  order: number
}

export interface IDeal {
  readonly id: number
  name: string
  amount: number
  priority: string
  closeDate: string
  contact: IContact
  company: ICompany
  owner: IUser
  pipeline: Pipeline
  createdAt: string
  updatedAt: string
}

export interface IDealStore {
  deal: IDeal
  deals: IDeal[]
}

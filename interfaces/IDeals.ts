import { IContact } from "~/interfaces/IContacts"
import { ICompany } from "~/interfaces/ICompany"
import { IUser } from "~/interfaces/IUsers"

interface Pipeline {
  readonly id: number
  name?: string
  order?: number
  pipelineStage: PipelineStage
}

interface PipelineStage {
  readonly id: number
  name?: string
  order?: number
  probabilityOfClose?: string
  pipelineId?: number
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
  pipelineStage?: PipelineStage
  createdAt: string
  updatedAt: string
}

export interface IDealStore {
  deal: IDeal
  deals: IDeal[]
}

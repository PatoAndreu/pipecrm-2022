import { IDeal } from './IDeals';

export interface IPipelineStage {
  readonly id: number
  name?: string
  order?: number
  probabilityOfClose?: string
  pipelineId?: number
  deals?: IDeal[] | null
}

export interface IPipeline {
  readonly id: number
  name: string
  order?: number
  createdAt: string
  updatedAt?: string
  pipelineStage?: IPipelineStage
  pipelineStages?: IPipelineStage[]
}

export interface IPipelineStore {
  pipeline: IPipeline,
  pipelines: IPipeline[],
}

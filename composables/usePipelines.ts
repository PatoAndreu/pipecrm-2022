import { storeToRefs } from "pinia";
import { usePipelinesStore } from "@/stores/pipelinesStore";

export default function usePipelines() {

  const pipelinesStore = usePipelinesStore();

  const { pipeline, pipelines } = storeToRefs(pipelinesStore);

  const getPipelines = () => pipelinesStore.getPipelines();
  const getPipelinesStages = (pipeline: number) => pipelinesStore.getPipelinesStages(pipeline);

  return {
    pipeline,
    pipelines,
    getPipelines,
    getPipelinesStages
  }
}
import { storeToRefs } from "pinia";
import { usePipelinesStore } from "@/stores/pipelinesStore";

export default function usePipelines() {

  const pipelinesStore = usePipelinesStore();

  const { pipelines } = storeToRefs(pipelinesStore);

  const getPipelines = () => pipelinesStore.getPipelines();

  return {
    pipelines,
    getPipelines,
  }
}
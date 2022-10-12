import { defineStore } from "pinia";
import { IPipelineStore } from "@/interfaces/IPipelines"

export const usePipelinesStore = defineStore("pipelines", {
  state: (): IPipelineStore => ({
    pipeline: null,
    pipelines: null,
  }),
  actions: {
    async getPipelines(): Promise<void> {
      try {
        const { data } = await $fetch(`http://pipecrm-api.test/api/pipelines`);
        this.pipelines = data
      } catch (error) {
        console.error(error);
      }
    },
    async getPipelinesStages(pipeline: number): Promise<void> {
      try {
        const { data } = await $fetch(`http://pipecrm-api.test/api/pipelines/${pipeline}`);
        this.pipeline = data
      } catch (error) {
        console.error(error);
      }
    },
  }
});
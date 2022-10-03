import { defineStore } from "pinia"
import { ActivitiesState, IActivity } from "@/interfaces/IActivities"

export const useActivitiesStore = defineStore("activity", {
  state: (): ActivitiesState => ({
    activities: null,
    activeTab: "activity"
  }),
  actions: {
    // Requests
    async getActivityByContact(id: number): Promise<void> {
      try {
        let data: IActivity[]
        ;({ data } = await $fetch(`http://pipecrm-api.test/api/contact/activity/${id}`))
        this.activities = []
        this.activities = data
      } catch (error) {
        console.error(error)
      }
    }
  }
})

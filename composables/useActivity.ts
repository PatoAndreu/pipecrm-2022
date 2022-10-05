import { INote } from "./../interfaces/INotes"
import { ITask } from "./../interfaces/ITasks"
import { useActivitiesStore } from "@/stores/activitiesStore"
import { storeToRefs } from "pinia"
import dayjs from "dayjs"

import All from "@/components/Contacts/Id/RightSide/Activities/All.vue"
import ActivityMenu from "@/components/Contacts/Id/RightSide/Activities/Menu.vue"

export default function useActivity() {
  const activitiesStore = useActivitiesStore()

  const { activities, activeTab } = storeToRefs(activitiesStore)

  const formatDate: string = "YYYY- MM-DD hh:mm:ss"
  const hoy: string = dayjs().format(formatDate)

  const getActivityByContact = (id: number) => activitiesStore.getActivityByContact(id)

  const delayedActivities = computed(() => {
    return activities?.value?.filter((a) => !a.completed && !a.pinned && a.delayed)
  })

  const pinnedActivities = computed(() => {
    return activities?.value?.filter((a) => a.pinned)
  })

  const pendingActivities = computed(() => {
    return activities?.value?.filter((a) => !a.completed && !a.pinned && !a.delayed)
  })

  const completedActivities = computed(() => {
    return activities?.value?.filter((a) => a.completed && !a.pinned && !a.delayed)
  })

  return {
    activities,
    activeTab,
    delayedActivities,
    pinnedActivities,
    pendingActivities,
    completedActivities,
    getActivityByContact
  }
}

export function useActivitiesComponents() {
  return {
    All,
    ActivityMenu
  }
}

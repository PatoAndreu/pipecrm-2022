import { useActivitiesStore } from "@/stores/activitiesStore";
import { storeToRefs } from "pinia";

export default function useActivities() {

  const activitiesStore = useActivitiesStore();

  const { activities, activity, activityModalOpen, isEditing, minimize } = storeToRefs(activitiesStore);

  const saveActivity     = async (): Promise<void> => activitiesStore.saveActivity();
  const closeNoteModal   = (): void => activitiesStore.closeNoteModal();
  const setActivity      = async (activity): Promise<void> => activitiesStore.setActivity(activity);
  const filteredNotes     =  activitiesStore.filteredNotes;
  const filterActivities  = activitiesStore.filterActivities;

  return {
    activities, activity, activityModalOpen, isEditing, minimize,
    saveActivity, closeNoteModal, setActivity, filteredNotes, filterActivities
  };
}
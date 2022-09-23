import { useActivitiesStore } from "@/stores/activitiesStore";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { IActivity } from "@/interfaces/IActivities";
import { IContact } from "@/interfaces/IContacts";

export default function useActivities() {

  const activitiesStore = useActivitiesStore();

  const { activities, activity, activityModalOpen, isEditing, minimize, activeTab } = storeToRefs(activitiesStore);

  const getActivities  = (contact) => activitiesStore.getActivities(contact);
  const saveActivity   = async () => await activitiesStore.saveActivity();
  const closeNoteModal = (): void => activitiesStore.closeNoteModal();
  const editActivity   = (activity: IActivity): void => activitiesStore.editActivity(activity);
  const changeStatus   = async (activity: IActivity, status: boolean) => await activitiesStore.changeStatus(activity, status);
  const addActivity    = (type: string): void => activitiesStore.addActivity(type);
  const deleteActivity = async (activity: IActivity) => await activitiesStore.deleteActivity(activity);


  const formatDate: string = "YYYY-MM-DD hh:mm:ss";
  const hoy: string        = dayjs().format(formatDate);

  //Activities
  const pinnedActivities = computed<IActivity[]>(() => {
    return activities.value.filter(a => a.pinned);
  });

  const pendingActivities = computed<IActivity[]>(() => {
    return activities.value.filter(a => {

      const dateTime = new Date(a.date + " " + a.time);

      return !a.completed && !a.pinned && dayjs(dateTime).format(formatDate) >= hoy;

    });
  });

  const delayedActivities = computed<IActivity[]>(() => {
    return activities.value.filter(a => {

      return a.type !== "note" && !a.completed && !a.pinned && a.delayed;

      // const dateTime = new Date(a.date + " " + a.time);
      // return a.type !== "note" && !a.completed && !a.pinned && dayjs(dateTime).format(formatDate) <= hoy;

    });
  });

  const completedActivities = computed<IActivity[]>(() => {
    return activities.value.filter(a => a.completed && !a.pinned);
  });

  //Notes
  const notes = computed<IActivity[]>(() => {
    return activities.value.filter(a => a.type === "note" && !a.pinned);
  });

  const pinnedNotes = computed<IActivity[]>(() => {
    return activities.value.filter(a => a.type === "note" && a.pinned);
  });

  //Tasks
  const tasks = computed<IActivity[]>(() => {
    return activities.value.filter(a => a.type !== "note");
  });

  const pendingTasks = computed<IActivity[]>(() => {
    return pendingActivities.value.filter(a => a.type !== "note");
  });


  return {
    activities,
    activity,
    activityModalOpen,
    isEditing,
    minimize,
    activeTab,
    notes,
    pinnedNotes,
    tasks,
    delayedActivities,
    pinnedActivities,
    pendingActivities,
    completedActivities,
    pendingTasks,
    getActivities,
    saveActivity,
    closeNoteModal,
    editActivity,
    changeStatus,
    addActivity,
    deleteActivity
  };
}
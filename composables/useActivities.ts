import { useActivitiesStore } from "@/stores/activitiesStore";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { IActivity } from "@/interfaces/IActivities";
import { IContact } from "@/interfaces/IContacts";
import { Ref } from "@vue/reactivity";
import { computed } from "#build/imports";

import All from "@/components/Contacts/Id/RightSide/Activities/All.vue";
import ActivityMenu from "@/components/Contacts/Id/RightSide/Activities/Menu.vue";
import Task from "@/components/Contacts/Id/RightSide/Activities/Tasks/Task.vue";
import Tasks from "@/components/Contacts/Id/RightSide/Activities/Tasks/Tasks.vue";
import TaskModal from "@/components/Contacts/Id/RightSide/Activities/Tasks/TaskModal.vue";
import Note from "@/components/Contacts/Id/RightSide/Activities/Notes/Note.vue";
import Notes from "@/components/Contacts/Id/RightSide/Activities/Notes/Notes.vue";
import NoteModal from "@/components/Contacts/Id/RightSide/Activities/Notes/NoteModal.vue";

export default function useActivities() {

  const activitiesStore = useActivitiesStore();

  const { activities, activity, activityModalOpen, isEditing, minimize, activeTab } = storeToRefs(activitiesStore);

  const getActivities  = (contact: Ref<IContact>) => activitiesStore.getActivities(contact as Ref<IContact>);
  const saveActivity   = async () => await activitiesStore.saveActivity();
  const closeNoteModal = (): void => activitiesStore.closeNoteModal();
  const editActivity   = (activity: IActivity): void => activitiesStore.editActivity(activity);
  const changeStatus   = async (activity: IActivity, status: object) => await activitiesStore.changeStatus(activity, status);
  const deleteActivity = async (activity: IActivity) => await activitiesStore.deleteActivity(activity);

  //Notes
  const addActivity = (type: string): void => activitiesStore.addActivity(type);

  const formatDate: string = "YYYY- MM-DD hh:mm:ss";
  const hoy: string        = dayjs().format(formatDate);

  //Activities
  const pinnedActivities = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.pinned);
  });


  const pendingActivities = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => !a.completed && !a.pinned && a.type !== "note" && !a.delayed);
  });


  const delayedActivities = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.type !== "note" && !a.completed && !a.pinned && a.delayed
    );
  });

  const completedActivities = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.completed && !a.pinned);
  });

  //Notes
  const notes = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.type === "note" && !a.pinned);
  });

  const pinnedNotes = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.type === "note" && a.pinned);
  });

  //Tasks
  const tasks = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.type !== "note");
  });

  const pendingTasks = computed<IActivity[]>(() => {
    return pendingActivities?.value?.filter(a => a.type !== "note");
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

export function useActivitiesComponents() {
  return {
    All,
    ActivityMenu,
    Notes,
    Tasks,
    Task,
    TaskModal,
    Note,
    NoteModal
  };
}
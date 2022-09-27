import { useActivitiesStore } from "@/stores/activitiesStore";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { IActivity } from "@/interfaces/IActivities";
import { IContact } from "@/interfaces/IContacts";

import All from "@/components/Contacts/Id/RightSide/Activities/All.vue";
import ActivityMenu from "@/components/Contacts/Id/RightSide/Activities/Menu.vue";
import Task from "@/components/Contacts/Id/RightSide/Activities/Tasks/Task.vue";
import Tasks from "@/components/Contacts/Id/RightSide/Activities/Tasks/Tasks.vue";
import TaskModal from "@/components/Contacts/Id/RightSide/Activities/Tasks/TaskModal.vue";
import Note from "@/components/Contacts/Id/RightSide/Activities/Notes/Note.vue";
import Notes from "@/components/Contacts/Id/RightSide/Activities/Notes/Notes.vue";
import NoteModal from "@/components/Contacts/Id/RightSide/Activities/Notes/NoteModal.vue";
import { computed, Ref } from "@vue/reactivity";

export default function useActivities() {

  const activitiesStore = useActivitiesStore();

  const {
          activities,
          task,
          showModal,
          isEditing,
          minimize,
          showAssociations,
          activeTab
        } = storeToRefs(activitiesStore);

  const getActivityByContact = (contact: Ref<IContact>) => activitiesStore.getActivityByContact(contact as Ref<IContact>);
  const addTask              = (type: string, contact?: IContact): void => activitiesStore.addTask(type, contact);
  const saveTask             = async () => await activitiesStore.saveTask();
  const editTask             = (task: IActivity): void => activitiesStore.editTask(task);
  const closeTaskModal       = (): void => activitiesStore.closeTaskModal();
  const changeTaskStatus     = async (task: IActivity, status: object) => await activitiesStore.changeTaskStatus(task, status);
  const deleteTask           = async (task: IActivity) => await activitiesStore.deleteTask(task);

  const formatDate: string = "YYYY- MM-DD hh:mm:ss";

  const hoy: string = dayjs().format(formatDate);

  //Activities
  const pinnedActivities = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.pinned);
  });

  const pendingActivities = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => !a.completed && !a.pinned && a.type !== "note" && !a.delayed);
  });

  const completedActivities = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => {
      if (a.type !== "note")
        return a.completed && !a.pinned && !a.delayed;
      return !a.pinned;
    });
  });

  const disabledNoteForm = computed(() => {
    return task.value.text.length < 1;
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

  const pinnedTasks = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.type !== "note" && a.pinned);
  });

  const delayedTasks = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => a.type !== "note" && !a.completed && !a.pinned && a.delayed
    );
  });

  const pendingTasks = computed<IActivity[]>(() => {
    return pendingActivities?.value?.filter(a => a.type !== "note" && !a.completed);
  });

  const completedTasks = computed<IActivity[]>(() => {
    return activities?.value?.filter(a => {
      if (a.type !== "note")
        return a.completed && !a.pinned && !a.delayed;
    });
  });


  return {
    showModal,
    isEditing,
    disabledNoteForm,
    minimize,
    activeTab,
    showAssociations,
    //Activities
    activities,
    pinnedActivities,
    pendingActivities,
    completedActivities,
    getActivityByContact,
    //Notes
    notes,
    pinnedNotes,
    //Tasks
    tasks,
    task,
    pinnedTasks,
    delayedTasks,
    pendingTasks,
    completedTasks,
    addTask,
    saveTask,
    editTask,
    changeTaskStatus,
    deleteTask,
    closeTaskModal
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
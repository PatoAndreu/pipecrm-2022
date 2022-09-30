import { useTasksStore } from "@/stores/tasksStore";
import { storeToRefs } from "pinia";
import { IContact } from "@/interfaces/IContacts";
import { ITask } from "@/interfaces/ITasks";
import { computed } from "@vue/reactivity";
import All from "@/components/Contacts/Id/RightSide/Activities/All.vue";
import ActivityMenu from "@/components/Contacts/Id/RightSide/Activities/Menu.vue";
import Notes from "@/components/Contacts/Id/RightSide/Activities/Notes/Notes.vue";
import Tasks from "@/components/Contacts/Id/RightSide/Activities/Tasks/Tasks.vue";
import Task from "@/components/Contacts/Id/RightSide/Activities/Tasks/Task.vue";
import TaskModal from "@/components/Contacts/Id/RightSide/Activities/Tasks/TaskModal.vue";
import Note from "@/components/Contacts/Id/RightSide/Activities/Notes/Note.vue";
import NoteModal from "@/components/Contacts/Id/RightSide/Activities/Notes/NoteModal.vue";


export default function useTasks() {

  const tasksStore = useTasksStore();

  const {
          tasks,
          task,
          showModal,
          isEditing,
          minimize,
          showAssociations,
          activeTab
        } = storeToRefs(tasksStore);

  const getTasksByContact = (id: number) => tasksStore.getTasksByContact(id);
  const addTask           = (type: string, contact?: IContact): void => tasksStore.addTask(type, contact);
  const saveTask          = async () => await tasksStore.saveTask();
  const editTask          = (task: ITask): void => tasksStore.editTask(task);
  const closeTaskModal    = (): void => tasksStore.closeTaskModal();
  const changeTaskStatus  = async (task: ITask, status: object) => await tasksStore.changeTaskStatus(task, status);
  const deleteTask        = async (task: ITask) => await tasksStore.deleteTask(task);


  const delayedTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter(a => !a.completed && !a.pinned && a.delayed
    );
  });

  const pinnedTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter(a => a.pinned);
  });

  const pendingTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter(a => !a.completed && !a.pinned && !a.delayed);
  });

  const completedTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter(a => a.completed && !a.pinned && !a.delayed);
  });

  return {
    showModal,
    isEditing,
    minimize,
    activeTab,
    showAssociations,
    tasks,
    task,
    delayedTasks,
    pinnedTasks,
    pendingTasks,
    completedTasks,
    getTasksByContact,
    addTask,
    saveTask,
    editTask,
    changeTaskStatus,
    deleteTask,
    closeTaskModal
  };
}

export function useTasksComponents() {
  return {
    Notes,
    Tasks,
    Task,
    TaskModal,
    Note,
    NoteModal
  };
}

export function useActivitiesComponents() {
  return {
    All,
    ActivityMenu
  };
}
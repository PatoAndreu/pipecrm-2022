import { useTasksStore } from "@/stores/tasksStore"
import { storeToRefs } from "pinia"
import { IContact } from "@/interfaces/IContacts"
import { ITask } from "@/interfaces/ITasks"
import { computed } from "@vue/reactivity"

import Tasks from "@/components/Contacts/Id/RightSide/Activities/Tasks/Tasks.vue"
import Task from "@/components/Contacts/Id/RightSide/Activities/Tasks/Task.vue"
import TaskModal from "@/components/Contacts/Id/RightSide/Activities/Tasks/TaskModal.vue"

export default function useTasks() {
  const tasksStore = useTasksStore()

  const {
    tasks,
    task,
    showTaskModal,
    openDeleteModal,
    isEditing,
    minimize,
    showAssociations,
    activeTab
  } = storeToRefs(tasksStore)

  const getTasksByContact = (id: number) => tasksStore.getTasksByContact(id)
  const addTask = (type: string, contact?: IContact): void => tasksStore.addTask(type, contact)
  const saveTask = async () => await tasksStore.saveTask()
  const editTask = (task: ITask): void => tasksStore.editTask(task)
  const closeTaskModal = (): void => tasksStore.closeTaskModal()
  const changeTaskStatus = async (task: ITask, status: object) => await tasksStore.changeTaskStatus(task, status)
  const deleteTask = async () => await tasksStore.deleteTask()
  const openTaskDeleteModal = async (task: ITask) => tasksStore.openTaskDeleteModal(task)

  const delayedTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter((a) => !a.completed && !a.pinned && a.delayed)
  })

  const pinnedTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter((a) => a.pinned)
  })

  const pendingTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter((a) => !a.completed && !a.pinned && !a.delayed)
  })

  const completedTasks = computed<ITask[]>(() => {
    return tasks?.value?.filter((a) => a.completed && !a.pinned && !a.delayed)
  })

  return {
    showTaskModal,
    openDeleteModal,
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
    openTaskDeleteModal,
    closeTaskModal
  }
}

export function useTasksComponents() {
  return {
    Tasks,
    Task,
    TaskModal
  }
}

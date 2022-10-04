import { defineStore } from "pinia"
import { ITask, TasksState } from "@/interfaces/ITasks"
import useContacts from "@/composables/useContacts"
import { IContact } from "@/interfaces/IContacts"

const initialTask = {
  id: null,
  text: "",
  pinned: false,
  completed: false,
  delayed: false,
  priority: null,
  note: "",
  date: null,
  time: null,
  type: null,
  owner: null,
  deal: null,
  contact: null,
  company: null,
  createdAt: null,
  updatedAt: null
}

export const useTasksStore = defineStore("tasks", {
  state: (): TasksState => ({
    task: { ...initialTask },
    tasks: null,
    showTaskModal: false,
    openDeleteModal: false,
    isEditing: false,
    minimize: false,
    showAssociations: false,
    activeTab: "notes"
  }),
  actions: {
    async getTasksByContact(id: number): Promise<void> {
      try {
        let data: ITask[]
          ; ({ data } = await $fetch(`http://pipecrm-api.test/api/tasks/contact/${id}`))
        this.tasks = []
        this.tasks = data
      } catch (error) {
        console.error(error)
      }
    },
    async saveTask() {
      const { contact } = useContacts()
      const url = this.isEditing
        ? `http://pipecrm-api.test/api/tasks/${this.task.id}`
        : "http://pipecrm-api.test/api/tasks"

      try {
        const response = await $fetch(url, {
          method: this.isEditing ? "PATCH" : "POST",
          body: { ...this.task }
        })

        const { activeTab, getActivityByContact } = useActivity()

        if (activeTab.value === 'activity') {
          await getActivityByContact(contact.value.id)
        } else {
          await this.getTasksByContact(contact.value.id)
        }

        this.showTaskModal = false
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async changeTaskStatus(task: ITask, status: object) {
      const { contact } = useContacts()
      try {
        const response = await $fetch(`http://pipecrm-api.test/api/tasks/${task.id}`, {
          method: "PATCH",
          body: {
            ...task,
            [Object.keys(status)[0]]: Object.values(status)[0],
            delayed: false
          }
        })

        const { activeTab, getActivityByContact } = useActivity()

        if (activeTab.value === 'activity') {
          await getActivityByContact(contact.value.id)
        } else {
          await this.getTasksByContact(contact.value.id)
        }
        return response
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTask() {

      try {
        const response = await $fetch(`http://pipecrm-api.test/api/tasks/${this.task.id}`, {
          method: "DELETE"
        })

        this.isEditing = false
        this.showTaskModal = false
        this.minimize = false
        this.task = null

        const { contact } = useContacts()
        const { activeTab, getActivityByContact } = useActivity()

        if (activeTab.value === 'activity') {
          await getActivityByContact(contact.value.id)
        } else {
          await this.getTasksByContact(contact.value.id)
        }

        return response
      } catch (error) {
        console.error(error)
      }
    },
    closeTaskModal() {
      this.task = { ...initialTask }
      this.showTaskModal = false
      this.minimize = false
      this.showAssociations = false
    },
    addTask(type: string, contact?: IContact) {
      this.task = {
        ...initialTask,
        type: type,
        owner: { id: 1 },
        contact: contact
      }
      this.showTaskModal = false
      this.minimize = false
      this.isEditing = false
      this.showAssociations = false

      this.showTaskModal = true
    },
    editTask(task: ITask) {
      this.task = { ...task }
      this.showTaskModal = true
      this.minimize = false
      this.isEditing = true
    },
    openTaskDeleteModal(task: ITask) {

      const { openDeleteModal } = useUi()

      this.task = { ...task }
      openDeleteModal('¿Está seguro de que desea eliminar esta actividad?', 'deleteTask')
    }
  }
})

import { defineStore } from "pinia";
import { ITask, TasksState } from "@/interfaces/ITasks";
import useContacts from "@/composables/useContacts";
import { IContact } from "@/interfaces/IContacts";

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
};

export const useTasksStore = defineStore("tasks", {
  state: (): TasksState => ({
    task: { ...initialTask },
    tasks: null,
    showModal: false,
    isEditing: false,
    minimize: false,
    showAssociations: false,
    activeTab: "activity"
  }),
  actions: {
    async getTasksByContact(id: number): Promise<void> {
      try {
        let data: ITask[];
        ({ data } = await $fetch(`http://pipecrm-api.test/api/tasks/contact/${id}`));
        this.tasks = [];
        this.tasks = data;
      } catch (error) {
        console.error(error);
      }
    },
    async saveTask() {
      const { contact } = useContacts();
      const url         = this.isEditing ?
        `http://pipecrm-api.test/api/tasks/${this.task.id}` :
        "http://pipecrm-api.test/api/tasks";

      try {
        const response = await $fetch(url,
          {
            method: this.isEditing ? "PATCH" : "POST",
            body: { ...this.task }
          });
        await this.getTasksByContact(contact.value.id);
        this.showModal = false;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async changeTaskStatus(task, status) {
      const { contact } = useContacts();
      try {
        const response = await $fetch(`http://pipecrm-api.test/api/tasks/${task.id}`,
          {
            method: "PATCH",
            body: {
              ...task,
              [Object.keys(status)[0]]: Object.values(status)[0],
              delayed: false
            }
          });
        await this.getTasksByContact(contact.value.id);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(task) {
      if (confirm(`¿Esta seguro que desea eliminar la tarea: ${task.text}?`) === true) {
        const { contact } = useContacts();
        try {
          const response = await $fetch(`http://pipecrm-api.test/api/tasks/${task.id}`,
            {
              method: "DELETE"
            });
          await this.getTasksByContact(contact.value.id);
          if (task.id === this.task.id) {
            this.isEditing = false;
            this.showModal = false;
            this.minimize  = false;
          }
          return response;
        } catch (error) {
          console.error(error);
        }
      }
    },
    closeTaskModal() {
      this.task             = { ...initialTask };
      this.showModal        = false;
      this.minimize         = false;
      this.showAssociations = false;
    },
    addTask(type: string, contact?: IContact) {
      this.task             = {
        ...initialTask,
        type: type,
        owner: { id: 1 },
        contact: contact
      };
      this.showModal        = false;
      this.minimize         = false;
      this.isEditing        = false;
      this.showAssociations = false;

      this.showModal = true;
    },
    editTask(task: ITask) {
      this.task      = { ...task };
      this.showModal = true;
      this.minimize  = false;
      this.isEditing = true;
    }
  }
});
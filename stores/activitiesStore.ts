import { defineStore } from "pinia";
import { ActivitiesState, IActivity } from "@/interfaces/IActivities";
import { IContact } from "@/interfaces/IContacts";
import useContacts from "@/composables/useContacts";
import { Ref } from "@vue/reactivity";

const initialActivity = {
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

export const useActivitiesStore = defineStore("activities", {
  state: (): ActivitiesState => ({
    task: { ...initialActivity },
    activities: null,
    showModal: false,
    isEditing: false,
    minimize: false,
    showAssociations: false,
    activeTab: "activities"
  }),
  actions: {
    // Requests
    async getActivityByContact(contact: Ref<IContact>): Promise<void> {
      try {
        let data: IActivity[];
        ({ data } = await $fetch(`http://pipecrm-api.test/api/activities/contact/${contact.value.id}`));
        this.activities = data;
      } catch (error) {
        console.error(error);
      }
    },
    async saveTask() {
      const { contact } = useContacts();
      const url         = this.isEditing ?
        `http://pipecrm-api.test/api/activities/${this.task.id}` :
        "http://pipecrm-api.test/api/activities";

      try {
        const response = await $fetch(url,
          {
            method: this.isEditing ? "PATCH" : "POST",
            body: { ...this.task, contact: { id: contact.value.id } }
          });
        await this.getActivityByContact(contact);
        this.showModal = false;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async changeTaskStatus(task, status) {
      const { contact } = useContacts();
      try {
        const response = await $fetch(`http://pipecrm-api.test/api/activities/${task.id}`,
          {
            method: "PATCH",
            body: {
              ...task,
              [Object.keys(status)[0]]: Object.values(status)[0],
              delayed: false
            }
          });
        await this.getActivityByContact(contact);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask(task) {
      if (confirm(`¿Esta seguro que desea eliminar la tarea: ${task.text}?`) === true) {
        const { contact } = useContacts();
        try {
          const response = await $fetch(`http://pipecrm-api.test/api/activities/${task.id}`,
            {
              method: "DELETE"
            });
          await this.getActivityByContact(contact);
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
    // Setters
    closeTaskModal() {
      this.task             = { ...initialActivity };
      this.showModal        = false;
      this.minimize         = false;
      this.showAssociations = false;
    },
    addTask(type: string, contact?: IContact) {
      this.task             = {
        ...initialActivity,
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
    editTask(task: IActivity) {
      this.task      = { ...task };
      this.showModal = false;
      this.showModal = false;
      this.minimize  = false;
      this.isEditing = true;
      (task.type === "note") ? this.showModal = true : this.showModal = true;
    }
  }
});
import { defineStore } from "pinia";
import { ActivitiesState, Activity } from "@/interfaces/IActivities";


const initialActivity = {
  id: null,
  text: null,
  pinned: false,
  completed: false,
  delayed: false,
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
    activity: { ...initialActivity },
    activities: null,
    activityModalOpen: false,
    isEditing: false,
    minimize: false,
    activeTab: "tasks"
  }),
  actions: {
    // Requests
    async getActivities(contact): Promise<void> {
      try {
        let data: Activity[];
        ({ data } = await $fetch(`http://pipecrm-api.test/api/activities/contact/${contact.value.id}`));
        this.activities = data;
      } catch (error) {
        console.error(error);
      }
    },
    async saveActivity() {
      const { contact } = useContacts();

      const url = this.isEditing ?
        `http://pipecrm-api.test/api/activities/${this.activity.id}` :
        "http://pipecrm-api.test/api/activities";

      try {
        const response = await $fetch(url,
          {
            method: this.isEditing ? "PATCH" : "POST",
            body: { ...this.activity }
          });
        await this.getActivities(contact);
        this.activityModalOpen = false;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async changeStatus(activity, status) {
      const { contact } = useContacts();
      try {
        const response = await $fetch(`http://pipecrm-api.test/api/activities/${activity.id}`,
          {
            method: "PATCH",
            body: {
              ...activity,
              [Object.keys(status)[0]]: Object.values(status)[0] ,
              delayed: false
            }
          });
        await this.getActivities(contact);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteActivity(activity) {
      const { contact } = useContacts();
      try {
        const response = await $fetch(`http://pipecrm-api.test/api/activities/${activity.id}`,
          {
            method: "DELETE",
          });
        await this.getActivities(contact);
        if (activity.id === this.activity.id){
          this.isEditing         = false;
          this.activityModalOpen = false;
          this.minimize          = false;
        }
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    // Setters
    closeNoteModal() {
      this.activity          = { id: null, text: null };
      this.activityModalOpen = false;
      this.minimize          = false;
    },
    editActivity(activity) {
      this.activity          = { ...activity };
      this.isEditing         = true;
      this.activityModalOpen = true;
      this.minimize          = false;
    },
    addActivity(type: string) {
      const { contact } = useContacts();

      this.activity          = {
        ...initialActivity,
        type: type,
        owner: { id: 1 },
        contact: contact
      };
      this.activityModalOpen = true;
      this.minimize          = false;
      this.isEditing         = false;
    }
  }
});
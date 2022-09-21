import { defineStore } from "pinia";
import { ActivitiesState } from "@/interfaces/IActivities";

export const useActivitiesStore = defineStore("activities", {
  state: (): ActivitiesState => ({
    activity: { id: null, type: null, text: null },
    activities: [
      {
        id: 1,
        type: "note",
        text: "Test"
      },
      {
        id: 2,
        type: "note",
        text: "Test 2"
      },
      {
        id: 3,
        type: "note",
        text: "Test 3"
      },
      {
        id: 4,
        type: "note",
        text: "Test 4"
      },
      {
        id: 5,
        type: "llamada",
        text: "Llamar el Lunes 20 AM",
        pinned: true
      },
      {
        id: 5,
        type: "correo",
        text: "Enviar presupuesto por correo"
      }
    ],
    activityModalOpen: false,
    isEditing: false,
    minimize: false
  }),
  actions: {
    async saveActivity(): Promise<void> {
      await console.log(this.activity);
    },
    closeNoteModal() {
      this.activity          = { id: null, text: null };
      this.activityModalOpen = false;
      this.minimize          = false;
    },
    async setActivity(activity): Promise<void> {
      this.activity = await { ...activity };
    }
  },
  getters: {
    filterActivities: (state) => {
      return  state.activities.filter((a) => a.type !== 'note');
    },
    filteredNotes:(state) => {
      return state.activities.filter((a) => a.type === "note");
    }
  }
});
import { defineStore } from "pinia";
import { ActivitiesState } from "@/interfaces/IActivities";

export const useActivitiesStore = defineStore("activities", {
  state: (): ActivitiesState => ({
    note: null,
    noteModalOpen: false,
    isEditing: false,
    minimize: false
  }),
  actions: {
    async saveNote(): Promise<void> {
      await console.log(this.note);
    },
    closeNoteModal() {
      this.note          = null;
      this.noteModalOpen = false;
      this.minimize      = 'false';
    }
  }
});
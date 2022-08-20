import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    showSearchBox: false,
    showCreateContactDrawer: false,
  }),
  actions: {
    toggleSearchBox() {
      this.showSearchBox = !this.showSearchBox
    },
    toggleCreateContactDrawer() {
      this.showCreateContactDrawer = !this.showCreateContactDrawer
    },
  }
})
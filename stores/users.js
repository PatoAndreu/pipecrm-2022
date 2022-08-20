import { defineStore } from 'pinia'

const initialUser = {
  email: "",
  name: "",
  phone: "",
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    user: { ...initialUser },
    users: [
      {
        id: 1,
        name: "Patricio Andreu",
      },
      {
        id: 2,
        name: "Fernanda Pellin",
      }
    ],
  }),
  actions: {
    setUser(user) {
      this.user = { ...user }
    },
    resetUser() {
      this.user = { ...initialUser }
    }
  }
})
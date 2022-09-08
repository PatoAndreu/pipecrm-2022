import { defineStore } from 'pinia'

import { User, UserState } from '~~/interfaces/IUsers'

const initialUser: User = {
  id: null,
  email: "",
  firstName: "",
  lastName: "",
}

export const useUsersStore = defineStore('users', {
  state: (): UserState => ({
    user: { ...initialUser },
    users: []
  }),
  actions: {
    async getUsers() {
      try {
        // @ts-ignore
        const { data } = await $fetch('http://pipecrm-api.test/api/users')
        this.users = data
      } catch (error) {
        console.log(error);
      }
    },
    setUser(user: User) {
      this.user = { ...user }
    },
    resetUser() {
      this.user = { ...initialUser }
    }
  }
})
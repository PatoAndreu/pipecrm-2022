import { defineStore } from "pinia";

import { IUser, IUserState } from "@/interfaces/IUsers";

const initialUser: IUser = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  createdAt: null
};

export const useUsersStore = defineStore("users", {
  state: (): IUserState => ({
    user: { ...initialUser },
    users: []
  }),
  actions: {
    async getUsers() {
      try {
        // @ts-ignore
        const { data } = await $fetch("http://pipecrm-api.test/api/users");
        this.users     = data;
      } catch (error) {
        console.log(error);
      }
    },
    setUser(user: IUser) {
      this.user = { ...user };
    },
    resetUser() {
      this.user = { ...initialUser };
    }
  }
});
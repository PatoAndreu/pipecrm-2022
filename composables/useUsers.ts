import { useUsersStore } from "@/stores/usersStore";
import { storeToRefs } from "pinia";

export const useUsers = () => {

  const usersStore      = useUsersStore();
  const { user, users } = storeToRefs(usersStore);

  const loadUsers = () => usersStore.getUsers();
  const setUser   = (user) => usersStore.setUser(user);
  const resetUser = () => usersStore.resetUser();

  return {
    user, users,
    loadUsers, setUser, resetUser
  };
};
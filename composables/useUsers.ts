import { useUsersStore } from "@/stores/usersStore";
import { storeToRefs } from "pinia";

export default function useUsers() {

  const usersStore      = useUsersStore();
  const { user, users } = storeToRefs(usersStore);

  const getUsers  = () => usersStore.getUsers();
  const setUser   = (user) => usersStore.setUser(user);
  const resetUser = () => usersStore.resetUser();

  return {
    user, users,
    getUsers, setUser, resetUser
  };
}
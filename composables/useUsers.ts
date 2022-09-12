import { useUsersStore } from '@/stores/usersStore'
import { storeToRefs } from 'pinia'

export const useUsers = () => {

  const usersStore      = useUsersStore()
  const { user, users } = storeToRefs(usersStore)

  const loadUsers = () => usersStore.getUsers()

  return {
    user, users,
    loadUsers
  }
}
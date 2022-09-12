import { useContactsStore } from '@/stores/contactsStore'
import { storeToRefs } from 'pinia'

import { ContactInterface } from '~/interfaces/IContacts'

export const useContacts = () => {

  const contactsStore = useContactsStore()
  const {
          filteredContacts,
          contact,
          contacts,
          errorMessages,
          showDrawer,
          tabSelected,
          filterUser,
          filterDate
        }             = storeToRefs(contactsStore)

  const loadContacts   = (): Promise<void> => contactsStore.getContacts()
  const addContact     = () => contactsStore.addContact()
  const editContact    = (contact: ContactInterface): Promise<void> => contactsStore.editContact(contact)
  const setTabSelected = (tab: string) => contactsStore.setTabSelected(tab)

  return {
    filteredContacts, contact, contacts, errorMessages, showDrawer, tabSelected, filterUser, filterDate,
    loadContacts, addContact, editContact, setTabSelected
  }
}

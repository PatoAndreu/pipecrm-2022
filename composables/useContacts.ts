import { useContactsStore } from '@/stores/contactsStore'
import { storeToRefs } from 'pinia'

import { ContactInterface } from '@/interfaces/IContacts'

export const useContacts = () => {

  const contactsStore = useContactsStore()
  const { pending, contact, contacts, errorMessages, showDrawer } = storeToRefs(contactsStore)

  const loadContacts = (): Promise<void> => contactsStore.getContacts()
  const addContact = () => contactsStore.addContact()
  const editContact = (contact: ContactInterface) => contactsStore.editContact(contact)

  return {
    pending, contact, contacts, errorMessages, showDrawer,
    loadContacts, addContact, editContact
  }
}

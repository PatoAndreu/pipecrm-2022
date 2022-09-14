import { useContactsStore } from "@/stores/contactsStore";
import { storeToRefs } from "pinia";

import { ContactInterface } from "~/interfaces/IContacts";

export const useContacts = () => {

  const contactsStore = useContactsStore();
  const {
          pending,
          isEditing,
          contact,
          contacts,
          contactStatus,
          contactLifeCycleStage,
          errorMessages,
          showDrawer,
          tabSelected,
          filterUser,
          filterDate,
          filteredContacts,
          disabledFormContact
        }             = storeToRefs(contactsStore);

  const loadContacts     = (): Promise<void> => contactsStore.getContacts();
  const loadContact      = (id: number): Promise<void> => contactsStore.getContact(id);
  const addContact       = () => contactsStore.addContact();
  const saveContact      = () => contactsStore.saveContact();
  const updateContact    = (contact) => contactsStore.updateContact(contact);
  const editContact      = (contact: ContactInterface): Promise<void> => contactsStore.editContact(contact);
  const setTabSelected   = (tab: string) => contactsStore.setTabSelected(tab);
  const getContactStatus = () => contactsStore.getContactStatus();
  const getContactStages = () => contactsStore.getContactStages();

  return {
    pending,
    isEditing,
    contact,
    contacts,
    contactStatus,
    contactLifeCycleStage,
    errorMessages,
    showDrawer,
    tabSelected,
    filterUser,
    filterDate,
    disabledFormContact,
    filteredContacts,
    loadContacts,
    loadContact,
    addContact,
    saveContact,
    updateContact,
    editContact,
    setTabSelected,
    getContactStatus,
    getContactStages
  };
};

import { useContactsStore } from "@/stores/contactsStore";
import { storeToRefs } from "pinia";

import { IContact } from "~/interfaces/IContacts";

export default function useContacts() {

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
  const saveContact      = (): Promise<void> => contactsStore.saveContact();
  const updateContact    = (contact) => contactsStore.updateContact(contact);
  const editContact      = (contact: IContact): Promise<void> => contactsStore.editContact(contact);
  const setTabSelected   = (tab: string) => contactsStore.setTabSelected(tab);
  const getContactStatus = () => contactsStore.getContactStatus();
  const getContactStages = () => contactsStore.getContactStages();
  const resetContact     = () => contactsStore.resetContact();
  const deleteContact    = () => contactsStore.deleteContact();

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
    getContactStages,
    resetContact,
    deleteContact
  };
};

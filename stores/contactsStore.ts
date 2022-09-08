import { defineStore } from 'pinia'
import { ContactInterface, ContactState } from '@/interfaces/IContacts'

const initialContact: ContactInterface = {
  city                   : null,
  company                : null,
  contactStatus          : null,
  created_at             : '',
  updated_at             : '',
  deals                  : [],
  email                  : '',
  firstName               : '',
  jobTitle               : '',
  lastName               : '',
  contactLifeCycleStageId: null,
  mobilePhoneNumber      : null,
  owner                  : null,
  phoneNumber            : null,
  region                 : null,
  address                : '',
  websiteUrl             : ''
}


export const useContactsStore = defineStore('contacts', {
  state  : (): ContactState => ({
    pending      : true,
    contact      : { ...initialContact },
    contacts     : [],
    contactStage : [],
    contactStatus: [],
    errorMessages: [],
    showDrawer   : false,
    isEditing    : false,
    tabSelected  : 'all'
  }),
  actions: {
    addContact() {
      this.contact = { ...initialContact }
      this.isEditing = false
      this.showDrawer = true
    },
    async getContacts() {
      try {
        // @ts-ignore
        const { data } = await $fetch('http://pipecrm-api.test/api/contacts')
        await this.getContactStatus()
        await this.getContactStages()
        this.contacts = data
      } catch (error) {
        console.log(error)
      }
    },
    async getContactStatus() {
      try {
        // @ts-ignore
        const { data } = await $fetch('http://pipecrm-api.test/api/contact/status')
        this.contactStatus = data
      } catch (error) {
        console.log(error)
      }

    }, async getContactStages() {
      try {
        // @ts-ignore
        const { data } = await $fetch('http://pipecrm-api.test/api/contact/stages')
        this.contactStage = data
      } catch (error) {
        console.log(error)
      }

    },
    async saveContact() {
      try {
        const url = this.isEditing ? `http://pipecrm-api.test/api/contacts/${ this.contact.id }` : 'http://pipecrm-api.test/api/contacts'
        const method = this.isEditing ? 'PATCH' : 'POST'
        await $fetch(url, {
          method: method,
          body  : this.beforePost()
        })
        .then(({ status }) => {
          if (status === 200) {
            this.afterPost()
          }
        })
        .catch(error => {
          this.errorMessages = []
          this.errorMessages.push(error.data.errors)
          console.log(error.data.errors)
        })
      } catch (err) {
        // this.errorMessages = err.response
        console.log({ err })
      }
    },
    beforePost(): object {
      return {
        ...this.contact,
        ownerId                : this.contact.owner?.id,
        companyId              : this.contact.company?.id,
        contactLifeCycleStageId: this.contact.contactLifeCycleStageId?.id,
        contactStatusId        : this.contact.contactStatus?.id
      }
    },
    afterPost() {
      this.resetContact()
      this.getContacts()
      this.showDrawer = false
    },
    resetContact() {
      this.contact = { ...initialContact }
    },
    async editContact(contact) {
      this.isEditing = true
      this.showDrawer = true
      this.contact = await { ...contact }
    },
    setTabSelected(tab) {
      this.tabSelected = tab
    }
  },
  getters: {
    disabledFormContact: (state) => {
      return (!state.contact.email || !state.contact.firstName || !state.contact.lastName)
    },
    filteredContacts(state) {
      if (state.tabSelected == 'myContacts') {
        return this.contacts.filter(contact => contact.owner?.id === 1)
      }
      if (state.tabSelected == 'unassigned') {
        return this.contacts.filter(contact => contact.owner === null)
      }
      return this.contacts
    }
  }
})
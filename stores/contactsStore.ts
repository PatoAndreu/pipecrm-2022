import { defineStore } from 'pinia'
import { ContactInterface, ContactState } from '@/interfaces/IContacts'

const initialContact: ContactInterface = {
  city             : null,
  company          : null,
  contactStatus    : null,
  created_at       : '',
  updated_at       : '',
  deals            : [],
  email            : '',
  firstName        : '',
  jobTitle         : '',
  lastName         : '',
  lifeCycleStage   : null,
  mobilePhoneNumber: null,
  owner            : null,
  phoneNumber      : null,
  region           : null,
  address          : '',
  websiteUrl       : ''
}


export const useContactsStore = defineStore('contacts', {
  state  : (): ContactState => ({
    pending      : true,
    contact      : { ...initialContact },
    contacts     : [],
    contactStage : [
      {
        id  : 1,
        name: 'Suscriptor'
      },
      {
        id  : 2,
        name: 'Lead'
      },
      {
        id  : 3,
        name: 'Lead calificado por marketing'
      },
      {
        id  : 4,
        name: 'Lead calificado por ventas'
      },
      {
        id  : 5,
        name: 'Oportunidad'
      },
      {
        id  : 6,
        name: 'Cliente'
      },
      {
        id  : 7,
        name: 'Otra'
      }
    ],
    contactStatus: [
      {
        id  : 1,
        name: 'Nuevo'
      },
      {
        id  : 2,
        name: 'Abierto'
      },
      {
        id  : 3,
        name: 'En curso'
      },
      {
        id  : 4,
        name: 'Negocio abierto'
      },
      {
        id  : 5,
        name: 'Sin calificar'
      },
      {
        id  : 6,
        name: 'Intento de contacto'
      },
      {
        id  : 7,
        name: 'Contactado'
      },
      {
        id  : 8,
        name: 'Mal momento'
      }
    ],
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
        this.contacts = data
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
        ownerId         : this.contact.owner?.id,
        companyId       : this.contact.company?.id,
        lifeCycleStageId: this.contact.lifeCycleStage?.id,
        contactStatusId : this.contact.contactStatus?.id
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
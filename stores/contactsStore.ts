import { defineStore } from 'pinia'
import { ContactInterface, ContactState } from '@/interfaces/IContacts'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear.js'

dayjs.extend(quarterOfYear)

const initialContact: ContactInterface = {
  city                 : null,
  company              : null,
  contactStatus        : null,
  createdAt            : '',
  updatedAt            : '',
  deals                : [],
  email                : '',
  firstName            : '',
  jobTitle             : '',
  lastName             : '',
  contactLifeCycleStage: null,
  mobilePhoneNumber    : null,
  owner                : null,
  phoneNumber          : null,
  region               : null,
  address              : '',
  websiteUrl           : ''
}

export const useContactsStore = defineStore('contacts', {
  state  : (): ContactState => ({
    pending              : true,
    contact              : { ...initialContact },
    contacts             : [],
    contactLifeCycleStage: [],
    contactStatus        : [],
    errorMessages        : [],
    showDrawer           : false,
    isEditing            : false,
    tabSelected          : 'all',
    filterUser           : null,
    filterDate           : null
  }),
  actions: {
    addContact(): void {
      this.contact    = { ...initialContact }
      this.isEditing  = false
      this.showDrawer = true
    },
    async getContacts(): Promise<void> {
      try {
        let data: ContactInterface[]
        ({ data } = await $fetch('http://pipecrm-api.test/api/contacts'))
        await this.getContactStatus()
        await this.getContactStages()
        this.contacts = data
      } catch (error) {
        console.log(error)
      }
    },
    async getContactStatus(): Promise<void> {
      try {
        // @ts-ignore
        const { data }     = await $fetch('http://pipecrm-api.test/api/contact/status')
        this.contactStatus = data
      } catch (error) {
        console.log(error)
      }

    },
    async getContactStages(): Promise<void> {
      try {
        // @ts-ignore
        const { data }             = await $fetch('http://pipecrm-api.test/api/contact/stages')
        this.contactLifeCycleStage = data
      } catch (error) {
        console.log(error)
      }

    },
    async saveContact(): Promise<void> {
      try {
        const url    = this.isEditing ? `http://pipecrm-api.test/api/contacts/${ this.contact.id }` : 'http://pipecrm-api.test/api/contacts'
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
        owner                : this.contact.owner,
        company              : this.contact.company,
        contactLifeCycleStage: this.contact.contactLifeCycleStage,
        contactStatus        : this.contact.contactStatus
      }
    },
    afterPost(): void {
      this.resetContact()
      this.getContacts()
      this.showDrawer = false
    },
    resetContact(): void {
      this.contact = { ...initialContact }
    },
    async editContact(contact): Promise<void> {
      this.isEditing  = true
      this.showDrawer = true
      this.contact    = await { ...contact }
    },
    setTabSelected(tab): void {
      this.tabSelected = tab
    }
  },
  getters: {
    disabledFormContact: (state) => {
      return (!state.contact.email || !state.contact.firstName || !state.contact.lastName)
    },
    filteredContacts(state) {

      if (state.tabSelected == 'myContacts') {
        return state.contacts.filter(contact => contact.owner?.id === 1)
      }

      if (state.tabSelected == 'unassigned') {
        return state.contacts.filter(contact => contact.owner === null)
      }

      /*
       - Filtros --------------------------------------------------------
       */

      //--- Por usuario -------->

      if (state.filterUser?.id) {
        return state.contacts.filter(contact => contact.owner.id === this.filterUser.id)
      }

      //--- Por Fecha -------->

      const formatDate: string = 'YYYY-MM-DD'

      const hoy: string  = dayjs().format(formatDate)
      const ayer: string = dayjs().subtract(1, 'days').format(formatDate)

      const primerDiaDeLaSemana: string       = dayjs().startOf('week').format(formatDate)
      const primerDiaDeLaSemanaPasada: string = dayjs().subtract(1, 'weeks').startOf('week').format(formatDate)
      const ultimoDiaDeLaSemanaPasada: string = dayjs().subtract(1, 'weeks').endOf('week').format(formatDate)

      const primerDiaDelMes: string = dayjs().startOf('month').format(formatDate)
      const ultimoDiaDelMes: string = dayjs().endOf('month').format(formatDate)

      const primerDiaDelMesPasado: string = dayjs().subtract(1, 'months').startOf('month').format(formatDate)
      const ultimoDiaDelMesPasado: string = dayjs().subtract(1, 'months').endOf('month').format(formatDate)


      switch (state.filterDate?.id) {
        case 1:
          return state.contacts.filter(contact => dayjs(contact.createdAt).format(formatDate) === hoy)
        case 2:
          return state.contacts.filter(contact => dayjs(contact.createdAt).format(formatDate) === ayer)
        case 3:
          return state.contacts.filter(contact => dayjs(contact.createdAt).format(formatDate) <= hoy && dayjs(contact.createdAt).format(formatDate) >= primerDiaDeLaSemana)
        case 4:
          return state.contacts.filter(contact => dayjs(contact.createdAt).format(formatDate) >= primerDiaDeLaSemanaPasada && dayjs(contact.createdAt).format(formatDate) <= ultimoDiaDeLaSemanaPasada)
        case 5:
          return state.contacts.filter(contact => dayjs(contact.createdAt).format(formatDate) >= primerDiaDelMes && dayjs(contact.createdAt).format(formatDate) <= ultimoDiaDelMes)
        case 6:
          return state.contacts.filter(contact => dayjs(contact.createdAt).format(formatDate) >= primerDiaDelMesPasado && dayjs(contact.createdAt).format(formatDate) <= ultimoDiaDelMesPasado)
      }

      return state.contacts
    }
  }
})
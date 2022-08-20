import { defineStore } from 'pinia'

const initialContact = {
  email: "",
  name: "",
  phone: "",
  leadOwner: {},
  leadCycle: {},
  leadStatus: {},
}

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contact: { ...initialContact },
    contactStage: [
      {
        id: 1,
        name: "Suscriptor",
      },
      {
        id: 2,
        name: "Lead",
      },
      {
        id: 3,
        name: "Lead calificado por marketing",
      },
      {
        id: 4,
        name: "Lead calificado por ventas",
      },
      {
        id: 5,
        name: "Oportunidad",
      },
      {
        id: 6,
        name: "Cliente",
      },
      {
        id: 7,
        name: "Otra",
      }
    ],
    contactStatus: [
      {
        id: 1,
        name: "Nuevo",
      },
      {
        id: 2,
        name: "Abierto",
      },
      {
        id: 3,
        name: "En curso",
      },
      {
        id: 4,
        name: "Negocio abierto",
      },
      {
        id: 5,
        name: "Sin calificar",
      },
      {
        id: 6,
        name: "Intento de contacto",
      },
      {
        id: 7,
        name: "Contactado",
      },
      {
        id: 8,
        name: "Mal momento",
      }
    ]
  }),
  actions: {
    setContact(contact) {
      this.contact = {...contact}
    },
    resetContact() {
      this.contact = {...initialContact}
    }
  }
})
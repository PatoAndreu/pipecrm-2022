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
    contacts:[
      {
        name: "1 Carlos Patricio Andreu Becerra",
        email: "patricioandreu@gmail.com",
        associatedBusiness: ["Hubspot, Inc. - Nuevo negocio","Hubspot, Inc. - Nuevo negocio 2"],
        phoneNumber: "56984446080",
        contactOwner: "fernanda pellin",
        company: "FullMedia Studio",
        lastActivityDate: "Hoy a la(s) 12:03 PM",
        leadStatus: "En curso",
        creationDate: "23 de agosto 2022",
        status: "activo",
      },
      {
        name: "2 Fernanda pellin",
        email: "ferpfono@gmail.com",
        associatedBusiness: ["Hubspot, Inc. - Nuevo negocio"],
        phoneNumber: "56946195574",
        contactOwner: "Propietario contacto",
        company: "Novared",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "3 Ernesto diaz",
        email: "ernesto.diaz@oqo.cl",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "56986854568",
        contactOwner: "Propietario contacto",
        company: "OQO",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "4 Patricio Andreu",
        email: "patricioandreu@oqo.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "5 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "6 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "7 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "8 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "9 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "10 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "11 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "12 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "13 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "14 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "15 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "16 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "17 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "18 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "19 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "20 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
      {
        name: "21 Patricio Andreu",
        email: "patricioandreu@gmail.com",
        associatedBusiness: "Negocios asociados",
        phoneNumber: "Número de teléfono",
        contactOwner: "Propietario contacto",
        company: "Empresa principal",
        lastActivityDate: "Fecha última actividad",
        leadStatus: "Estado del lead",
        creationDate: "Fecha creación",
        status: "Estado",
      },
    ],
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
    ],
  }),
  actions: {
    setContact(contact) {
      this.contact = {...contact}
    },
    resetContact() {
      this.contact = {...initialContact}
    },

  }
})
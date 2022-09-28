import { defineStore } from "pinia";
import { ICompany, ICompanyState } from "@/interfaces/ICompany";
import useContacts from "~/composables/useContacts";

const initialCompany: ICompany = {
  id: null,
  name: null,
  domain: null,
  type: null,
  city: null,
  address: null,
  description: null
};

export const useCompanyStore = defineStore("companies", {
  state: (): ICompanyState => ({
    company: { ...initialCompany },
    companies: null
  }),
  actions: {
    async getCompanies(): Promise<void> {
      try {
        let data: ICompany[];
        ({ data } = await $fetch("http://pipecrm-api.test/api/companies"));
        this.companies = data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCompany(company): Promise<any> {
      const { contact, getContact } = useContacts();
      console.log(contact.value.id);

      try {
        const response = await $fetch(`http://pipecrm-api.test/api/companies/${company.id}`,
          {
            method: "PATCH",
            body: { ...company }
          });

        await getContact(contact.value.id)
        return response;
      } catch (error) {
        return error;
      }
    }
  }

});
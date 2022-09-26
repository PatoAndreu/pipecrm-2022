import { defineStore } from "pinia";
import { IDeal, IDealStore } from "@/interfaces/IDeals";
import { Ref } from "@vue/reactivity";
import { IContact } from "@/interfaces/IContacts";

export const useDealsStore = defineStore("deals", {
  state: (): IDealStore => ({
    deal: null,
    deals: null
  }),
  actions: {
    async getDealsByContact(contact: Ref<IContact>): Promise<void> {
      try {
        let data: IDeal[];
        ({ data } = await $fetch(`http://pipecrm-api.test/api/deals/contact/${contact.value.id}`));
        this.deals = data;
      } catch (error) {
        console.error(error);
      }
    },
    async getDeals(): Promise<void> {
      try {
        let data: IDeal[];
        ({ data } = await $fetch('http://pipecrm-api.test/api/deals'));
        this.deals = data;
      } catch (error) {
        console.error(error);
      }
    }
  }

});
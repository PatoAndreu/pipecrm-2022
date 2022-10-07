import { defineStore } from "pinia";
import { IDeal, IDealStore } from "@/interfaces/IDeals";
import { Ref } from "@vue/reactivity";
import { IContact } from "@/interfaces/IContacts";

export const useDealsStore = defineStore("deals", {
  state: (): IDealStore => ({
    deal: null,
    deals: null,
    pipeline: null,
    tabSelected: "all",
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
        ({ data } = await $fetch("http://pipecrm-api.test/api/deals"));
        this.deals = data;
      } catch (error) {
        console.error(error);
      }
    },
    async addDeal(deal: IDeal): Promise<void> {
      try {
        return await $fetch(`http://pipecrm-api.test/api/deals`,
          {
            method: "POST",
            body: { ...deal }
          });
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    async updateDeal(deal: IDeal): Promise<void> {
      try {
        return await $fetch(`http://pipecrm-api.test/api/deals/${deal.id}`,
          {
            method: "PATCH",
            body: { ...deal }
          });
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    async deleteDeal(deal: IDeal): Promise<void> {
      try {
        return await $fetch(`http://pipecrm-api.test/api/deals/${deal.id}`,
          {
            method: "DELETE"
          });
      } catch (error) {
        console.error(error);
        return error;
      }
    },

    async getPipelineByUser(pipelineId: number, userId?: number): Promise<void> {
      try {
        let data: [];
        ({ data } = await $fetch(`http://pipecrm-api.test/api/pipeline/${pipelineId}/user/${userId}`));
        this.pipeline = data;
      } catch (error) {
        console.error(error);
      }
    },

    setTabSelected(tab: string): void {
      this.tabSelected = tab
    },
  }

});
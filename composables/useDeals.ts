import { IDeal } from './../interfaces/IDeals';
import { useDealsStore } from "@/stores/dealsStore";
import { Ref } from "@vue/reactivity";
import { IContact } from "~/interfaces/IContacts";
import { storeToRefs } from "pinia";

export default function useDeals() {

  const dealsStore = useDealsStore();

  const { deal, deals, pipeline, tabSelected } = storeToRefs(dealsStore);

  const getDealsByContact = (contact: Ref<IContact>) => dealsStore.getDealsByContact(contact as Ref<IContact>);
  const getPipelineByUser = (pipelineId: number, userId?: number) => dealsStore.getPipelineByUser(pipelineId, userId);

  const getDeals = () => dealsStore.getDeals();
  const addDeal = (deal: IDeal) => dealsStore.addDeal(deal);
  const updateDeal = (deal: IDeal) => dealsStore.updateDeal(deal);
  const deleteDeal = (deal: IDeal) => dealsStore.deleteDeal(deal);

  const setTabSelected = (tab: string) => dealsStore.setTabSelected(tab)

  return {
    deal,
    deals,
    pipeline,
    getDealsByContact,
    getPipelineByUser,
    getDeals,
    addDeal,
    updateDeal,
    deleteDeal,
    tabSelected,
    setTabSelected
  };
}
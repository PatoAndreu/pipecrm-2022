import { IDeal } from '@/interfaces/IDeals';
import { useDealsStore } from "@/stores/dealsStore";
import { Ref } from "@vue/reactivity";
import { IContact } from "@/interfaces/IContacts";
import { storeToRefs } from "pinia";

export default function useDeals() {

  const dealsStore = useDealsStore();

  const { deal, deals, pipeline, tabSelected } = storeToRefs(dealsStore);

  const getDealsByContact = (contact: Ref<IContact>) => dealsStore.getDealsByContact(contact as Ref<IContact>);
  const getPipelineByUser = (pipelineId: number, userId?: number) => dealsStore.getPipelineByUser(pipelineId, userId);


  const getDeals = () => dealsStore.getDeals();
  const getDeal = (id: number) => dealsStore.getDeal(id);
  const addDeal = (deal: IDeal) => dealsStore.addDeal(deal);
  const updateDeal = (deal: IDeal) => dealsStore.updateDeal(deal);
  const deleteDeal = (deal: IDeal) => dealsStore.deleteDeal(deal);

  const setTabSelected = (tab: string) => dealsStore.setTabSelected(tab)

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'CLP'
  })

  const getPriorityClass = (priority: string) => {

    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-300'
      case 'low':
        return 'bg-green-500'
    }
  }
  const translatePriority = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'alta'
      case 'medium':
        return 'media'
      case 'low':
        return 'baja'
    }
  }

  return {
    deal,
    deals,
    pipeline,
    getDealsByContact,
    getPipelineByUser,
    getDeals,
    getDeal,
    addDeal,
    updateDeal,
    deleteDeal,
    tabSelected,
    setTabSelected,
    formatter,
    getPriorityClass,
    translatePriority
  };
}
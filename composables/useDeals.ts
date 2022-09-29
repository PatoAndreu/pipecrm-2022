import { useDealsStore } from "@/stores/dealsStore";
import { Ref } from "@vue/reactivity";
import { IContact } from "~/interfaces/IContacts";
import { storeToRefs } from "pinia";

export default function useDeals() {

  const dealsStore = useDealsStore();

  const { deal, deals } = storeToRefs(dealsStore);

  const getDealsByContact = (contact: Ref<IContact>) => dealsStore.getDealsByContact(contact as Ref<IContact>);
  const getDeals          = () => dealsStore.getDeals();
  const addDeal           = (deal) => dealsStore.addDeal(deal);
  const updateDeal        = (deal) => dealsStore.updateDeal(deal);

  return {
    deal, deals,
    getDealsByContact,
    getDeals,
    addDeal,
    updateDeal
  };
}
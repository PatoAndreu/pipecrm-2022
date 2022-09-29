import { storeToRefs } from "pinia";
import { useCompanyStore } from "@/stores/companiesStore";

export default function useCompanies() {

  const companiesStore = useCompanyStore();

  const { company, companies } = storeToRefs(companiesStore);

  const getCompanies  = () => companiesStore.getCompanies();
  const updateCompany = (company) => companiesStore.updateCompany(company);

  return {
    company,
    companies,
    getCompanies,
    updateCompany
  };
}
<script lang="ts" setup>
import { ChevronDownIcon, ChevronRightIcon, DotsHorizontalIcon } from "@heroicons/vue/outline";
import useContacts from "@/composables/useContacts";
import { ref } from "#imports";
import useDeals from "~/composables/useDeals";
import { SymbolKind } from "vscode-languageserver-types";

const { contact, updateContact, getContact } = useContacts();

const { getDeals, addDeal, updateDeal, deals } = useDeals();

const showDealsInfo = ref(false);
const isLinkingDeal = ref(false);
const isEditing     = ref(false);
const pending       = ref(false);
const dealToLink    = ref(null);

const linkDeal = async () => {
  await getDeals();
  isLinkingDeal.value = true;
};

const cancelLinkDeal = () => {
  isEditing.value     = true;
  isLinkingDeal.value = false;
};

const linkOrUnlinkCompanyToDeal = async (type: string, deal?: object) => {

  pending.value = true;
  let res       = null;

  if (type === "unlink") {
    res = await updateDeal({ ...deal, contact: null });
  } else {
    res = await addDeal({ ...dealToLink.value, contact: { ...contact.value } });
  }


  const { data: { errors }, response: { status } }: any = res;

  if (status === 200) {
    await getContact(contact.value.id);
    isEditing.value     = false;
    pending.value       = false;
    isLinkingDeal.value = false;
  }
};

const formatter = new Intl.NumberFormat("es", {
  style: "currency",
  currency: "CLP"
});

const getClass = (probabilityOfClose) => {
  if (probabilityOfClose === "won") {
    return "bg-green-100";
  }
  if (probabilityOfClose === "lost") {
    return "bg-red-100";
  }
};

</script>

<template>
  <div v-auto-animate class="border rounded h-auto px-3 py-2 bg-white">
    <!--    Header    -->
    <button class="flex items-center text-cyan-700 hover:text-cyan-500 py-2" @click="showDealsInfo = !showDealsInfo">
      <ChevronRightIcon v-if="!showDealsInfo" class="h-5 mr-1" />
      <ChevronDownIcon v-else class="h-5 mr-1" />
      <div class="text-xs font-semibold">NEGOCIOS ({{ contact.deals.length }})</div>
    </button>

    <div v-if="showDealsInfo " v-auto-animate>

      <!--    Show linked Deals     -->
      <div v-if="contact.deals.length > 0 && !isLinkingDeal" v-auto-animate class="mt-3 space-y-2 overflow-y-scroll max-h-80">
        <div v-for="deal in contact.deals"
             :key="deal.id"
             v-auto-animate
             :class="getClass(deal.pipelineStage.probabilityOfClose)"
             class="w-full border h-auto p-2 rounded-sm">
          <div class="flex-col space-y-2">
            <div class="flex justify-between">

              <div class="text-xs text-cyan-600 font-semibold w-full">
                {{ deal.name }}
              </div>

              <!--Menú-->
              <button
                class="relative h-6 w-6 border rounded border-slate-300 text-slate-400 text-sm hover:bg-slate-100 group">
                <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
                <div
                  class="z-50 dropdown-container absolute bg-white w-52 h-auto pt-4 pb-2 border rounded shadow-lg mt-6 -right-2.5 hidden group-focus:block text-left">
                  <ul class="flex-row space-y-1 text-slate-700">
                    <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="linkOrUnlinkCompanyToDeal('unlink', deal)">
                      Desvincular
                    </li>
                  </ul>
                </div>
              </button>

            </div>

            <div class="text-xs text-slate-500">
              Valor: <span class="font-semibold">$ {{ formatter.format(deal.amount) }}</span>
            </div>
            <div class="text-xs text-slate-500">
              Fecha de cierre: <span class="font-semibold">{{ $dayjs(deal.closeDate).format("DD MMMM YYYY") }}</span>
            </div>
            <div class="text-xs text-slate-500">
              Pipeline: <span class="font-semibold">{{ deal.pipeline.name }}</span>
            </div>
            <div class="text-xs text-slate-500">
              Etapa: <span class="font-semibold">{{ deal.pipelineStage.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!--    Show No hay negocios vinculados     -->
      <div v-else v-auto-animate class="mt-3">
        <div v-if="!isLinkingDeal">
          <p class="text-sm text-slate-500">No hay negocios vinculados a este contacto.</p>
          <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500"
                  @click="linkDeal">
            + Vincular un negocio
          </button>
        </div>

        <!--  Vincular Empresa  -->
        <div v-else v-auto-animate class="h-auto  items-center mb-4">
          <div class="text-slate-500 text-xs text-cyan-700">Negocios</div>
          <UISelectBox
            v-model:modelValue="dealToLink"
            :options="deals"
            class="mt-2">
          </UISelectBox>


          <div v-auto-animate class="flex w-auto h-auto justify-end mt-10">

            <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                    :disabled="pending"
                    class="inline-flex items-center px-4 py-2 mr-4 font-semibold leading-6 text-sm shadow rounded text-indigo-500 bg-white border hover:shadow-md border-indigo-500 transition ease-in-out duration-150"
                    type="button"
                    @click="cancelLinkDeal">
              Cancelar
            </button>

            <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                    :disabled="pending"
                    class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-white bg-indigo-600 hover:shadow-lg transition ease-in-out duration-150"
                    type="submit"
                    @click="linkOrUnlinkCompanyToDeal('link')">
              <svg v-show="pending" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
              </svg>
              {{ !pending ? "Guardar" : "Guardando..." }}
            </button>
          </div>
        </div>

      </div>

      <button v-if="contact.deals.length > 0" class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500"
              @click="linkDeal">
        + Vincular otro negocio
      </button>
    </div>

  </div>
</template>


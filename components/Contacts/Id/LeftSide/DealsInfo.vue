<script lang="ts" setup>
import { PlusCircleIcon } from "@heroicons/vue/outline";
import useContacts from "@/composables/useContacts";

const { contact } = useContacts();

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
  <div class="border rounded h-auto px-3 py-2 bg-white">
    <div class="flex justify-between items-center py-2">
      <div class="text-xs font-medium text-cyan-700">NEGOCIOS ({{ contact.deals.length }})</div>
      <PlusCircleIcon class="h-5 text-cyan-600 cursor-pointer hover:text-cyan-500" />
    </div>
    <hr>

    <div v-if="contact.deals.length > 0" class="mt-3 space-y-2">
      <div v-for="deal in contact.deals"
           :key="deal.id"
           :class="getClass(deal.pipelineStage.probabilityOfClose)"
           class="w-full border h-full p-2 rounded-sm">
        <div class="flex-col space-y-2">
          <div class="text-xs text-cyan-600 font-semibold">
            {{ deal.name }}
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

    <div v-else class="mt-3">
      <p class="text-sm text-slate-500">No hay tratos vinculados a este contacto.</p>
      <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500">+ Vincular un trato</button>
    </div>
  </div>
</template>


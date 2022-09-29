<script lang="ts" setup>
import useCompanies from "@/composables/useCompanies";
import useContacts from "@/composables/useContacts";
import { PencilAltIcon } from "@heroicons/vue/outline";
import { ICompany } from "~/interfaces/ICompany";
import { Ref } from "@vue/reactivity";

const { contact }       = useContacts();
const { updateCompany } = useCompanies();

const companyLocal: Ref<ICompany> = ref({ ...contact.value.company });
const isEditing                   = ref(false);
const pending                     = ref(false);

const cancelEdit = () => {
  companyLocal.value = { ...contact.value.company };
  isEditing.value    = false;
};

const updateCompanyInfo = async () => {
  pending.value = true;
  const res     = await updateCompany(companyLocal.value);

  const { data: { errors }, response: { status } }: any = res;

  if (status === 200) {
    isEditing.value = false;
    pending.value   = false;
  }
};
</script>

<template>
  <div class="border rounded h-auto px-3 py-2 bg-white">
    <div class="flex justify-between items-center py-2">
      <div class="text-xs font-medium text-cyan-700">EMPRESA</div>
      <PencilAltIcon class="h-5 text-cyan-600 cursor-pointer hover:text-cyan-500" @click="isEditing = true" />
    </div>
    <hr>
    <div v-if="companyLocal" class="mt-3">
      <form v-auto-animate class="text-sm py-4" @submit.prevent="updateCompanyInfo">

        <div v-auto-animate class="h-12 items-center mb-4">
          <div class="text-slate-500 text-xs text-cyan-700">Nombre</div>
          <div v-if="!isEditing" class=" pt-2 text-slate-600">{{ companyLocal.name }}</div>
          <input v-else v-model="companyLocal.name" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" type="text" />
        </div>

        <div v-auto-animate class="h-12 items-center mb-4">
          <div class="text-slate-500 text-xs text-cyan-700">Dominio</div>
          <div v-if="!isEditing" class=" pt-2 text-slate-600">{{ companyLocal.domain }}</div>
          <input v-else v-model="companyLocal.domain" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" type="text" />
        </div>

        <div v-auto-animate class="h-12 items-center mb-4">
          <div class="text-slate-500 text-xs text-cyan-700">Tipo</div>
          <div v-if="!isEditing" class="pt-2 text-slate-600 capitalize">{{ companyLocal.type }}</div>
          <UISelectBox v-else
                       v-model:modelValue="companyLocal.type"
                       :options="['cliente potencial', 'socio', 'revendedor', 'proveedor', 'other']"
                       class="mt-2"
                       type="array">
          </UISelectBox>
        </div>

        <div v-auto-animate class="h-12 items-center mb-4">
          <div class="text-slate-500 text-xs text-cyan-700">Ciudad</div>
          <div v-if="!isEditing" class=" pt-2 text-slate-600">{{ companyLocal.city }}</div>
          <input v-else v-model="companyLocal.city" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" type="text" />
        </div>

        <div v-auto-animate class="h-12 items-center mb-4">
          <div class="text-slate-500 text-xs text-cyan-700">Dirección</div>
          <div v-if="!isEditing" class=" pt-2 text-slate-600">{{ companyLocal.address }}</div>
          <input v-else v-model="companyLocal.address" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" type="text" />
        </div>

        <div v-if="isEditing" v-auto-animate class="flex w-auto h-auto justify-end mt-16">

          <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                  :disabled="pending"
                  class="inline-flex items-center px-4 py-2 mr-4 font-semibold leading-6 text-sm shadow rounded text-indigo-500 bg-white border hover:shadow-md border-indigo-500 transition ease-in-out duration-150"
                  type="button"
                  @click="cancelEdit">
            Cancelar
          </button>

          <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                  :disabled="pending"
                  class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-white bg-indigo-600 hover:shadow-lg transition ease-in-out duration-150"
                  type="submit"
                  @click="updateCompanyInfo">
            <svg v-show="pending" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
            </svg>
            {{ !pending ? "Guardar" : "Guardando..." }}
          </button>
        </div>

      </form>
    </div>
    <div v-else class="mt-3">
      <p class="text-sm text-slate-500">No hay organizaciones vinculadas a este contacto.</p>
      <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500">+ Vincular una empresa</button>
    </div>
  </div>
</template>


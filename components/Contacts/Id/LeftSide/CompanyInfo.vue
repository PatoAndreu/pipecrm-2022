<script setup lang="ts">
import useCompanies from "@/composables/useCompanies";
import useContacts from "@/composables/useContacts";
import { PencilAltIcon } from "@heroicons/vue/outline";
import { ICompany } from "~/interfaces/ICompany";
import { Ref } from "@vue/reactivity";

const { contact } = useContacts()
const { updateCompany } = useCompanies()

const companyLocal: Ref<ICompany> = ref({ ...contact.value.company });
const isEditing    = ref(false);
const pending      = ref(false);

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
}
</script>

<template>
  <div class="border rounded h-auto px-3 py-2 bg-white">
    <div class="flex justify-between items-center py-2">
      <div class="text-xs font-medium text-cyan-700">EMPRESA</div>
      <PencilAltIcon class="h-5 text-cyan-600 cursor-pointer hover:text-cyan-500" @click="isEditing = true" />
    </div>
    <hr>
    <div class="mt-3" v-if="companyLocal">
      <form class="text-sm py-4" @submit.prevent="" v-auto-animate>

        <div class="h-12 items-center mb-4" v-auto-animate>
          <div class="text-slate-500 text-xs text-cyan-700">Nombre</div>
          <div class=" pt-2 text-slate-600" v-if="!isEditing">{{ companyLocal.name }}</div>
          <input type="text" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" v-model="companyLocal.name" v-else />
        </div>

        <div class="h-12 items-center mb-4" v-auto-animate>
          <div class="text-slate-500 text-xs text-cyan-700">Dominio</div>
          <div class=" pt-2 text-slate-600" v-if="!isEditing">{{ companyLocal.domain }}</div>
          <input type="text" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" v-model="companyLocal.domain" v-else />
        </div>

        <div class="h-12 items-center mb-4" v-auto-animate>
          <div class="text-slate-500 text-xs text-cyan-700">Tipo</div>
          <div class="pt-2 text-slate-600 capitalize" v-if="!isEditing">{{ companyLocal.type }}</div>
          <UISelectBox class="mt-2"
                       :options="['cliente potencial', 'socio', 'revendedor', 'proveedor', 'other']"
                       type="array"
                       v-model:modelValue="companyLocal.type"
                       v-else>
          </UISelectBox>
        </div>

        <div class="h-12 items-center mb-4" v-auto-animate>
          <div class="text-slate-500 text-xs text-cyan-700">Ciudad</div>
          <div class=" pt-2 text-slate-600" v-if="!isEditing">{{ companyLocal.city }}</div>
          <input type="text" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" v-model="companyLocal.city" v-else />
        </div>

        <div class="h-12 items-center mb-4" v-auto-animate>
          <div class="text-slate-500 text-xs text-cyan-700">Dirección</div>
          <div class=" pt-2 text-slate-600" v-if="!isEditing">{{ companyLocal.address }}</div>
          <input type="text" class="w-full h-8 mt-1 pl-2 rounded-sm bg-slate-100 border border-slate-200" v-model="companyLocal.address" v-else />
        </div>

        <div class="flex w-auto h-auto justify-end mt-16" v-if="isEditing" v-auto-animate>

          <button type="button"
                  class="inline-flex items-center px-4 py-2 mr-4 font-semibold leading-6 text-sm shadow rounded text-indigo-500 bg-white border hover:shadow-md border-indigo-500 transition ease-in-out duration-150"
                  :class="pending ? 'cursor-not-allowed opacity-70' :''"
                  :disabled="pending"
                  @click="cancelEdit">
            Cancelar
          </button>

          <button type="submit"
                  class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-white bg-indigo-600 hover:shadow-lg transition ease-in-out duration-150"
                  :class="pending ? 'cursor-not-allowed opacity-70' :''"
                  :disabled="pending"
                  @click="updateCompanyInfo">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-show="pending">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ !pending ? "Guardar" : "Guardando..." }}
          </button>
        </div>

      </form>
    </div>
    <div class="mt-3" v-else>
      <p class="text-sm text-slate-500">No hay organizaciones vinculadas a este contacto.</p>
      <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500">+ Vincular una empresa</button>
    </div>
  </div>
</template>


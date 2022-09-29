<script lang="ts" setup>
import useCompanies from "@/composables/useCompanies";
import useContacts from "@/composables/useContacts";
import { ChevronDownIcon, ChevronRightIcon, DotsHorizontalIcon, PencilAltIcon } from "@heroicons/vue/outline";
import { ref } from "#imports";

const { contact, updateContact, getContact } = useContacts();

const { getCompanies, updateCompany, companies } = useCompanies();

const isEditing       = ref(false);
const pending         = ref(false);
const showCompanyInfo = ref(false);


// Update Company Info ------------

let companyLocal = ref({ ...contact.value.company });

const cancelEdit = () => {
  companyLocal.value = { ...contact.value.company };
  isEditing.value    = false;
};

const updateCompanyInfo = async () => {

  pending.value = true;

  const res = await updateCompany(companyLocal.value);

  const { data: { errors }, response: { status } }: any = res;

  if (status === 200) {

    await getContact(contact.value.id);

    companyLocal.value  = { ...contact.value.company };
    companyToLink.value = { ...contact.value.company };
    isEditing.value     = false;
    pending.value       = false;
  }
};


// Link Company ------------

let companyToLink      = ref({ ...contact.value.company });
const isLinkingCompany = ref(false);

const linkOrUnlinkCompanyToContact = async (type) => {

  pending.value = true;

  if (type === "link") {
    contact.value.company = { ...companyToLink.value };
  } else {
    contact.value.company = null;
  }

  const res = await updateContact(contact.value);

  const { data: { errors }, response: { status } }: any = res;

  if (status === 200) {
    await getContact(contact.value.id);
    companyLocal.value     = { ...contact.value.company };
    isEditing.value        = false;
    pending.value          = false;
    isLinkingCompany.value = false;
  }
};

const linkCompany = async () => {
  await getCompanies();
  isLinkingCompany.value = true;
};

const cancelLinkCompany = () => {
  companyLocal.value     = { ...contact.value.company };
  isEditing.value        = true;
  isLinkingCompany.value = false;
};

const reLinkCompany = async () => {
  await getContact(contact.value.id);
  await getCompanies();

  isEditing.value        = false;
  isLinkingCompany.value = true;
};

</script>

<template>
  <div class="border rounded h-auto px-3 py-2 bg-white">
    <div class="flex justify-between items-center py-2">
      <button class="flex items-center text-cyan-700 hover:text-cyan-500" @click="showCompanyInfo = !showCompanyInfo">
        <ChevronRightIcon v-if="!showCompanyInfo" class="h-5 mr-1" />
        <ChevronDownIcon v-else class="h-5 mr-1" />
        <div class="text-xs font-semibold">EMPRESA</div>
      </button>
      <PencilAltIcon v-if="showCompanyInfo && !isEditing && contact.company" class="h-5 text-cyan-600 cursor-pointer hover:text-cyan-500" @click="isEditing = true" />

      <div v-if="isEditing ">
        <!--Menú-->
        <button
          class="relative h-6 w-6 border rounded border-slate-300 text-slate-400 text-sm hover:bg-slate-100 group">
          <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
          <div
            class="z-50 dropdown-container absolute bg-white w-52 h-auto pt-4 pb-2 border rounded shadow-lg mt-6 -right-2.5 hidden group-focus:block text-left">
            <ul class="flex-row space-y-1 text-slate-700">
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="linkOrUnlinkCompanyToContact('unlink')">
                Desvincular
              </li>

              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2" @click="reLinkCompany">
                Vincular otra empresa
              </li>
            </ul>
          </div>
        </button>
      </div>
    </div>
    <div v-auto-animate>

      <div v-if="showCompanyInfo" v-auto-animate class="mt-3">
        <hr>
        <!--  Company Form -->
        <form v-if="contact.company && !isLinkingCompany" v-auto-animate class="text-sm py-4" @submit.prevent="updateCompanyInfo">

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

          <div v-if="isEditing" v-auto-animate class="flex w-auto h-auto justify-end mt-10">

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

        <!--  No existe una empresa vinculada  -->
        <div v-else v-auto-animate class="mt-3">
          <div v-if="!isLinkingCompany">
            <p class="text-sm text-slate-500">No existe una empresa vinculada a este contacto.</p>
            <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500"
                    @click="linkCompany">
              + Vincular una empresa
            </button>
          </div>

          <!--  Vincular Empresa  -->
          <div v-else v-auto-animate class="h-auto  items-center mb-4">
            <div class="text-slate-500 text-xs text-cyan-700">Empresa</div>
            <UISelectBox
              v-model:modelValue="companyToLink"
              :options="companies"
              class="mt-2">
            </UISelectBox>


            <div v-auto-animate class="flex w-auto h-auto justify-end mt-10">

              <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                      :disabled="pending"
                      class="inline-flex items-center px-4 py-2 mr-4 font-semibold leading-6 text-sm shadow rounded text-indigo-500 bg-white border hover:shadow-md border-indigo-500 transition ease-in-out duration-150"
                      type="button"
                      @click="cancelLinkCompany">
                Cancelar
              </button>

              <button :class="pending ? 'cursor-not-allowed opacity-70' :''"
                      :disabled="pending"
                      class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-white bg-indigo-600 hover:shadow-lg transition ease-in-out duration-150"
                      type="submit"
                      @click="linkOrUnlinkCompanyToContact('link')">
                <svg v-show="pending" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                </svg>
                {{ !pending ? "Guardar" : "Guardando..." }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


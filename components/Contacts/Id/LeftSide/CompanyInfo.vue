<script lang="ts" setup>
import useCompanies from "@/composables/useCompanies"
import useContacts from "@/composables/useContacts"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  PencilAltIcon
} from "@heroicons/vue/outline"
import { ref } from "#imports"

const { contact, updateContact, getContact } = useContacts()

const { getCompanies, updateCompany, companies } = useCompanies()

const isEditing = ref(false)
const pending = ref(false)
const showCompanyInfo = ref(false)

// Update Company Info ------------

let companyLocal = ref({ ...contact.value.company })

const cancelEdit = () => {
  companyLocal.value = { ...contact.value.company }
  isEditing.value = false
}

const updateCompanyInfo = async () => {
  pending.value = true

  const res = await updateCompany(companyLocal.value)

  const {
    data: { errors },
    response: { status }
  }: any = res

  if (status === 200) {
    await getContact(contact.value.id)

    companyLocal.value = { ...contact.value.company }
    companyToLink.value = { ...contact.value.company }
    isEditing.value = false
    pending.value = false
  }
}

// Link Company ------------

let companyToLink = ref({ ...contact.value.company })
const isLinkingCompany = ref(false)

const linkOrUnlinkCompanyToContact = async (type) => {
  pending.value = true

  if (type === "link") {
    contact.value.company = { ...companyToLink.value }
  } else {
    contact.value.company = null
  }

  const res = await updateContact(contact.value)

  const {
    data: { errors },
    response: { status }
  }: any = res

  if (status === 200) {
    await getContact(contact.value.id)
    companyLocal.value = { ...contact.value.company }
    isEditing.value = false
    pending.value = false
    isLinkingCompany.value = false
  }
}

const linkCompany = async () => {
  await getCompanies()
  isLinkingCompany.value = true
  companies.value = companies.value.sort(function (a, b) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

const cancelLinkCompany = () => {
  companyLocal.value = { ...contact.value.company }
  isEditing.value = true
  isLinkingCompany.value = false
}

const reLinkCompany = async () => {
  await getContact(contact.value.id)
  await getCompanies()

  isEditing.value = false
  isLinkingCompany.value = true
}
</script>

<template>
  <div class="h-auto rounded border bg-white px-3 py-2">
    <div class="flex items-center justify-between py-2">
      <button
        class="flex items-center text-cyan-700 hover:text-cyan-500"
        @click="showCompanyInfo = !showCompanyInfo">
        <ChevronRightIcon v-if="!showCompanyInfo" class="mr-1 h-5" />
        <ChevronDownIcon v-else class="mr-1 h-5" />
        <div class="text-xs font-semibold">EMPRESA ({{ contact.company?.id ? 1 : 0 }})</div>
      </button>
      <PencilAltIcon
        v-if="showCompanyInfo && !isEditing && contact.company"
        class="h-5 cursor-pointer text-cyan-600 hover:text-cyan-500"
        @click="isEditing = true" />

      <div v-if="isEditing">
        <!--Menú-->
        <button
          class="group relative h-6 w-6 rounded border border-slate-300 text-sm text-slate-400 hover:bg-slate-100">
          <DotsHorizontalIcon class="mx-auto h-4 w-4" />
          <div
            class="dropdown-container absolute -right-2.5 z-50 mt-6 hidden h-auto w-52 rounded border bg-white pt-4 pb-2 text-left shadow-lg group-focus:block">
            <ul class="flex-row space-y-1 text-slate-700">
              <li
                class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="linkOrUnlinkCompanyToContact('unlink')">
                Desvincular
              </li>

              <li
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="reLinkCompany">
                Vincular otra empresa
              </li>
            </ul>
          </div>
        </button>
      </div>
    </div>
    <div v-auto-animate>
      <div v-if="showCompanyInfo" v-auto-animate class="mt-3">
        <hr />
        <!--  Company Form -->
        <form
          v-if="contact.company && !isLinkingCompany"
          v-auto-animate
          class="py-4 text-sm"
          @submit.prevent="updateCompanyInfo">
          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-slate-500 text-cyan-700">Nombre</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ companyLocal.name }}</div>
            <input
              v-else
              v-model="companyLocal.name"
              class="mt-1 h-8 w-full rounded-sm border border-slate-200 bg-slate-100 pl-2"
              type="text" />
          </div>

          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-slate-500 text-cyan-700">Dominio</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ companyLocal.domain }}</div>
            <input
              v-else
              v-model="companyLocal.domain"
              class="mt-1 h-8 w-full rounded-sm border border-slate-200 bg-slate-100 pl-2"
              type="text" />
          </div>

          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-slate-500 text-cyan-700">Tipo</div>
            <div v-if="!isEditing" class="pt-2 capitalize text-slate-600">
              {{ companyLocal.type }}
            </div>
            <UISelectBox
              v-else
              v-model:modelValue="companyLocal.type"
              :options="['cliente potencial', 'socio', 'revendedor', 'proveedor', 'other']"
              class="mt-2"
              type="array">
            </UISelectBox>
          </div>

          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-slate-500 text-cyan-700">Ciudad</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ companyLocal.city }}</div>
            <input
              v-else
              v-model="companyLocal.city"
              class="mt-1 h-8 w-full rounded-sm border border-slate-200 bg-slate-100 pl-2"
              type="text" />
          </div>

          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-slate-500 text-cyan-700">Dirección</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ companyLocal.address }}</div>
            <input
              v-else
              v-model="companyLocal.address"
              class="mt-1 h-8 w-full rounded-sm border border-slate-200 bg-slate-100 pl-2"
              type="text" />
          </div>

          <div v-if="isEditing" v-auto-animate class="mt-10 flex h-auto w-auto justify-end">
            <button
              :class="pending ? 'cursor-not-allowed opacity-70' : ''"
              :disabled="pending"
              class="mr-4 inline-flex items-center rounded border border-indigo-500 bg-white px-4 py-2 text-sm font-semibold leading-6 text-indigo-500 shadow transition duration-150 ease-in-out hover:shadow-md"
              type="button"
              @click="cancelEdit">
              Cancelar
            </button>

            <button
              :class="pending ? 'cursor-not-allowed opacity-70' : ''"
              :disabled="pending"
              class="inline-flex items-center rounded bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:shadow-lg"
              type="submit"
              @click="updateCompanyInfo">
              <svg
                v-show="pending"
                class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"></path>
              </svg>
              {{ !pending ? "Guardar" : "Guardando..." }}
            </button>
          </div>
        </form>

        <!--  No existe una empresa vinculada  -->
        <div v-else v-auto-animate class="mt-3">
          <div v-if="!isLinkingCompany">
            <p class="text-sm text-slate-500">No existe una empresa vinculada a este contacto.</p>
            <button
              class="my-4 text-left text-sm font-bold text-cyan-600 hover:text-cyan-500"
              @click="linkCompany">
              + Vincular una empresa
            </button>
          </div>

          <!--  Vincular Empresa  -->
          <div v-else v-auto-animate class="mb-4 h-auto items-center">
            <div class="text-xs text-slate-500 text-cyan-700">Empresa</div>
            <UISelectBox v-model:modelValue="companyToLink" :options="companies" class="mt-2">
            </UISelectBox>

            <div v-auto-animate class="mt-10 flex h-auto w-auto justify-end">
              <button
                :class="pending ? 'cursor-not-allowed opacity-70' : ''"
                :disabled="pending"
                class="mr-4 inline-flex items-center rounded border border-indigo-500 bg-white px-4 py-2 text-sm font-semibold leading-6 text-indigo-500 shadow transition duration-150 ease-in-out hover:shadow-md"
                type="button"
                @click="cancelLinkCompany">
                Cancelar
              </button>

              <button
                :class="pending ? 'cursor-not-allowed opacity-70' : ''"
                :disabled="pending"
                class="inline-flex items-center rounded bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:shadow-lg"
                type="submit"
                @click="linkOrUnlinkCompanyToContact('link')">
                <svg
                  v-show="pending"
                  class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"></path>
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

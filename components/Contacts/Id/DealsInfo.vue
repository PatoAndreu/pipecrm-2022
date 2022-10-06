<script lang="ts" setup>
  import { ChevronDownIcon, ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/vue/outline'
  import useContacts from '@/composables/useContacts'
  import { ref } from '#imports'
  import useDeals from '@/composables/useDeals'
  import { IDeal } from '@/interfaces/IDeals'

  const { contact, getContact } = useContacts()

  const { getDeals, updateDeal, deals } = useDeals()

  const showDealsInfo = ref(false)
  const isLinkingDeal = ref(false)
  const isEditing = ref(false)
  const pending = ref(false)
  const dealToLink = ref(null)

  const linkDeal = async () => {
    await getDeals()

    deals.value = deals.value.filter((deal) => {
      return !contact.value.deals.some((d) => {
        return deal.id == d.id
      })
    })
    isLinkingDeal.value = true
  }

  const cancelLinkDeal = () => {
    isEditing.value = true
    isLinkingDeal.value = false
  }

  const linkOrUnlinkCompanyToDeal = async (type: string, deal?: IDeal) => {
    pending.value = true
    let res = null

    if (type === 'unlink') {
      res = await updateDeal({
        ...deal,
        pipelineStage: { id: deal.pipeline.pipelineStage.id },
        contact: null
      })
    } else {
      res = await updateDeal({ ...dealToLink.value, contact: { ...contact.value } })
    }

    const {
      data: { errors },
      response: { status }
    }: any = res

    if (status === 200) {
      await getContact(contact.value.id)
      dealToLink.value = null
    } else {
      alert(
        'Lo sentimos existió un problema al intentar vincular el negocio, por favor intente nuevamente'
      )
    }

    isEditing.value = false
    pending.value = false
    isLinkingDeal.value = false
  }

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'CLP'
  })

  const getClass = (probabilityOfClose) => {
    if (probabilityOfClose === 'won') {
      return 'bg-green-100'
    }
    if (probabilityOfClose === 'lost') {
      return 'bg-red-100'
    }
  }
</script>

<template>
  <div v-auto-animate class="h-auto rounded border bg-white px-3 py-2">
    <!--    Header    -->
    <button
      class="flex items-center py-2 text-cyan-700 hover:text-cyan-500"
      @click="showDealsInfo = !showDealsInfo">
      <ChevronRightIcon v-if="!showDealsInfo" class="mr-1 h-5" />
      <ChevronDownIcon v-else class="mr-1 h-5" />
      <div class="text-xs font-semibold">NEGOCIOS ({{ contact.deals?.length }})</div>
    </button>

    <div v-if="showDealsInfo" v-auto-animate>
      <!--    Show linked Deals     -->
      <div
        v-if="contact?.deals.length > 0 && !isLinkingDeal"
        v-auto-animate
        class="mt-3 max-h-80 space-y-2 overflow-y-scroll">
        <div
          v-for="deal in contact.deals"
          :key="deal.id"
          v-auto-animate
          :class="getClass(deal.pipeline.pipelineStage.probabilityOfClose)"
          class="h-auto w-full rounded-sm border p-2">
          <div class="flex-col space-y-2">
            <div class="flex justify-between">
              <div class="w-full text-xs font-semibold text-cyan-600">
                {{ deal.name }}
              </div>

              <!--Menú-->
              <button
                class="group relative h-6 w-6 rounded border border-slate-300 text-sm text-slate-400 hover:bg-slate-100">
                <DotsHorizontalIcon class="mx-auto h-4 w-4" />
                <div
                  class="dropdown-container absolute -right-2.5 z-50 mt-6 hidden h-auto w-52 rounded border bg-white pt-4 pb-2 text-left shadow-lg group-focus:block">
                  <ul class="flex-row space-y-1 text-slate-700">
                    <li
                      class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                      @click="linkOrUnlinkCompanyToDeal('unlink', deal)">
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
              Fecha de cierre:
              <span class="font-semibold">{{ $dayjs(deal.closeDate).format('DD MMMM YYYY') }}</span>
            </div>
            <div class="text-xs text-slate-500">
              Pipeline: <span class="font-semibold">{{ deal.pipeline.name }}</span>
            </div>
            <div class="text-xs text-slate-500">
              Etapa: <span class="font-semibold">{{ deal.pipeline.pipelineStage.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!--    Show No hay negocios vinculados     -->
      <div v-else v-auto-animate class="mt-3">
        <div v-if="!isLinkingDeal">
          <p class="text-sm text-slate-500">No hay negocios vinculados a este contacto.</p>
          <button
            class="my-4 text-left text-sm font-bold text-cyan-600 hover:text-cyan-500"
            @click="linkDeal">
            + Vincular un negocio
          </button>
        </div>

        <!--  Vincular Negocio  -->
        <div v-else v-auto-animate class="mb-4 h-auto items-center">
          <div class="text-xs text-cyan-700">Negocios</div>
          <UISelectBox v-model:modelValue="dealToLink" :options="deals" class="mt-2"> </UISelectBox>

          <div v-auto-animate class="mt-10 flex h-auto w-auto justify-end">
            <button
              :class="pending ? 'cursor-not-allowed opacity-70' : ''"
              :disabled="pending"
              class="mr-4 inline-flex items-center rounded border border-indigo-500 bg-white px-4 py-2 text-sm font-semibold leading-6 text-indigo-500 shadow transition duration-150 ease-in-out hover:shadow-md"
              type="button"
              @click="cancelLinkDeal">
              Cancelar
            </button>

            <button
              :class="pending ? 'cursor-not-allowed opacity-70' : ''"
              :disabled="pending"
              class="inline-flex items-center rounded bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:shadow-lg"
              type="submit"
              @click="linkOrUnlinkCompanyToDeal('link')">
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
              {{ !pending ? 'Guardar' : 'Guardando...' }}
            </button>
          </div>
        </div>
      </div>

      <button
        v-if="contact.deals.length > 0"
        class="my-4 text-left text-sm font-bold text-cyan-600 hover:text-cyan-500"
        @click="linkDeal">
        + Vincular otro negocio
      </button>
    </div>
  </div>
</template>

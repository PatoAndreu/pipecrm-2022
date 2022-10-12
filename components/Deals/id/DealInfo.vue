<script setup lang="ts">
  import useDeals from '@/composables/useDeals'
  import usePipelines from '@/composables/usePipelines'
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    PencilAltIcon,
    TrashIcon
  } from '@heroicons/vue/outline'

  const { getDeal, deal, formatter, getPriorityClass, translatePriority, updateDeal } = useDeals()
  const { getPipelines, pipelines } = usePipelines()
  const route = useRoute()

  await getDeal(Number(route.params.id))
  await getPipelines()

  const dealLocal = ref({ ...deal.value })
  const isEditing = ref(false)
  const pending = ref(false)
  const showDealInfo = ref(true)

  const cancelEdit = () => {
    dealLocal.value = { ...deal.value }
    isEditing.value = false
  }

  const updateDealInfo = async () => {
    pending.value = true

    const res = await updateDeal(dealLocal.value)

    const {
      data: { errors },
      response: { status }
    }: any = res

    if (status === 200) {
      isEditing.value = false
      pending.value = false
      await getDeal(Number(route.params.id))
    }
  }
</script>

<template>
  <div v-auto-animate class="h-auto rounded bg-white px-3 py-2">
    <div class="flex items-center justify-between py-2">
      <!--    Header    -->
      <button
        class="flex items-center text-cyan-700 hover:text-cyan-500"
        @click="showDealInfo = !showDealInfo">
        <ChevronRightIcon v-if="!showDealInfo" class="mr-1 h-5" />
        <ChevronDownIcon v-else class="mr-1 h-5" />
        <div class="text-xs font-semibold">INFORMACIÓN</div>
      </button>
      <PencilAltIcon
        v-if="showDealInfo && !isEditing && deal"
        class="h-5 cursor-pointer text-cyan-600 hover:text-cyan-500"
        @click="isEditing = true" />
    </div>
    <div v-auto-animate>
      <div v-if="showDealInfo" v-auto-animate class="mt-3">
        <hr />
        <!-- Formulario-->
        <form v-auto-animate class="py-4 text-sm" @submit.prevent="updateDealInfo">
          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-cyan-700">Nombre</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ dealLocal.name }}</div>
            <input
              v-else
              v-model="dealLocal.name"
              class="mt-1 h-8 w-full rounded-sm border border-slate-200 bg-slate-100 pl-2"
              type="text" />
          </div>

          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-cyan-700">Valor</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">{{ dealLocal.amount }}</div>
            <input
              v-else
              v-model="dealLocal.amount"
              class="mt-1 h-8 w-full rounded-sm border border-slate-200 bg-slate-100 pl-2"
              type="text" />
          </div>

          <div v-auto-animate class="mb-4 h-12 items-center">
            <div class="text-xs text-cyan-700">Fecha de cierre</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">
              {{ $dayjs(dealLocal.closeDate).format('D/M/YYYY') }}
            </div>
            <input
              v-else
              v-model="dealLocal.closeDate"
              class="mt-1 h-8 w-full rounded-sm border border-slate-200 bg-slate-100 pl-2"
              type="date" />
          </div>

          <div v-auto-animate :class="isEditing ? 'pt-2' : ''" class="h-12 items-center">
            <div class="text-xs text-cyan-700">Etapa</div>
            <div v-if="!isEditing" class="pt-2 text-slate-600">
              {{ dealLocal.pipeline.name }}
            </div>
            <UISelectBox
              v-else
              v-model:modelValue="dealLocal.pipeline"
              :options="pipelines"
              class="mt-2">
            </UISelectBox>
          </div>

          <div v-if="isEditing" class="mt-16 flex h-auto w-auto justify-end">
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
              @click="updateDealInfo">
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
        </form>
      </div>
    </div>
  </div>
</template>

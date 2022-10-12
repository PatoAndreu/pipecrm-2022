<script setup lang="ts">
  import useDeals from '@/composables/useDeals'
  import {
    ChevronLeftIcon,
    ChevronDownIcon,
    PencilAltIcon,
    TrashIcon
  } from '@heroicons/vue/outline'

  import DealInfo from '@/components/Deals/id/DealInfo.vue'

  const { getDeal, deal, formatter, getPriorityClass, translatePriority } = useDeals()

  const route = useRoute()

  await getDeal(Number(route.params.id))
</script>
<template>
  <div class="flex justify-between" style="height: calc(100vh - 60px)">
    <div class="h-full w-80">
      <!-- Deal Info -->
      <div class="w-full">
        <header class="flex justify-between p-4 text-sm">
          <div class="flex items-center font-semibold text-[#007a8c] hover:underline">
            <ChevronLeftIcon class="mr-1 w-3" />
            <NuxtLink to="/deals"> Negocios</NuxtLink>
          </div>
          <div>
            <VDropdown :distance="6" compute-transform-origin>
              <button class="flex items-center space-x-1 font-semibold text-[#007a8c]">
                <span> Acciones </span>
                <ChevronDownIcon class="h-4" />
              </button>

              <template #popper>
                <div class="flex w-40 flex-col space-y-1 text-sm text-[#33475b]">
                  <div class="h-2"></div>
                  <button class="flex items-center space-x-2 px-4 py-2 hover:bg-cyan-50">
                    <PencilAltIcon class="w-4" />
                    <span> Editar</span>
                  </button>
                  <hr class="w-full" />
                  <button class="flex items-center space-x-2 px-4 py-2 hover:bg-cyan-50">
                    <TrashIcon class="w-4" />
                    <span> Eliminar</span>
                  </button>
                </div>
              </template>
            </VDropdown>
          </div>
        </header>
        <main class="mt-6 text-sm font-normal">
          <DealInfo />
          <div class="text-xl">{{ deal.name }}</div>
          <div class="pt-2">
            <span>Valor: </span>
            <span class="font-semibold">$ {{ formatter.format(deal.amount) }}</span>
          </div>
          <div>
            <span>Fecha de cierre: </span>
            <span class="font-semibold">{{ $dayjs(deal.closeDate).format('D/M/YYYY') }}</span>
          </div>
          <div>
            <span>Etapa: </span>
            <span class="font-semibold">{{ deal.pipelineStage.name }}</span>
          </div>
        </main>
      </div>
      <hr />
      <div class="p-4 text-sm font-light">
        <h3 class="font-bold text-[#007a8c]">Acerca de este negocio</h3>
        <div class="pt-4">
          <span class="text-xs text-[#516f90]">Propietario del negocio</span>
          <div class="pt-1 font-medium">{{ deal.owner.firstName }} {{ deal.owner.lastName }}</div>
        </div>

        <div class="pt-4">
          <span class="text-xs text-[#516f90]">Tipo de negocio</span>
          <div class="pt-1 font-medium">
            {{ deal.type === 'new customer' ? 'Cliente nuevo' : 'Cliente existente' }}
          </div>
        </div>
        <div class="pt-4">
          <span class="text-xs text-[#516f90]">Prioridad</span>
          <div class="flex items-center justify-start space-x-1 pt-2 font-medium">
            <span class="h-2 w-2 rounded-full" :class="getPriorityClass(deal.priority)"></span>
            <span class="capitalize text-gray-800">
              {{ translatePriority(deal.priority) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity -->
    <div class="flex-1 overflow-auto bg-red-400">
      <div class="w-full"></div>
    </div>

    <!-- Right Panels -->
    <div class="h-full w-72 bg-slate-100">
      <div class="w-full">sdsd</div>
    </div>
  </div>
</template>

<style>
  .v-popper__popper.v-popper__popper--show-from .v-popper__wrapper {
    transform: scale(0.5);
  }

  .v-popper__popper.v-popper__popper--show-to .v-popper__wrapper {
    transform: none;
    transition: transform 0.15s;
  }
  .v-popper__popper.v-popper__popper--hide-from .v-popper__wrapper {
    transform: none;
    transition: transform 0.15s;
  }
  .v-popper__popper.v-popper__popper--hide-to .v-popper__wrapper {
    transform: scale(0.5);
    transition: transform 0.15s;
  }
</style>

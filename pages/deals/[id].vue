<script setup lang="ts">
  import {
    ChevronLeftIcon,
    ChevronDownIcon,
    PencilAltIcon,
    TrashIcon
  } from '@heroicons/vue/outline'

  import DealInfo from '@/components/Deals/id/DealInfo.vue'
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
        <hr />
        <main class="text-sm font-normal">
          <Suspense timeout="0">
            <DealInfo />
            <template #fallback> <UILoading /> </template>
          </Suspense>
        </main>
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

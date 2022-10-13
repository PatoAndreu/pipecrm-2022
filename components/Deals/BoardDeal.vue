<script setup lang="ts">
  import { IDeal } from '@/interfaces/IDeals'

  import useDeals from '@/composables/useDeals'

  interface Props {
    deal: IDeal
  }

  withDefaults(defineProps<Props>(), {
    deal: null
  })

  const { formatter, getPriorityClass, translatePriority } = useDeals()
</script>

<template>
  <div>
    <div
      class="my-2 h-full cursor-move space-y-1 rounded-md border bg-white p-3 text-sm"
      style="color: #33475b">
      <div class="cursor-pointer font-bold" style="color: #0091ae">
        <NuxtLink :to="'/deals/' + deal.id">
          {{ deal.name }}
        </NuxtLink>
      </div>

      <div>
        <span class="font-bold">Valor: </span>
        $ {{ formatter.format(deal.amount) }}
      </div>

      <div>
        <span class="font-bold">Fecha de cierre: </span>
        {{ $dayjs(deal.closeDate).format('D/M/YYYY') }}
      </div>

      <div class="flex items-center justify-between pt-2">
        <button
          class="group relative flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-white">
          <div
            class="inner absolute bottom-7 hidden h-auto w-max rounded bg-indigo-600 px-2 py-1 shadow group-hover:block">
            <p>{{ deal.owner.firstName }} {{ deal.owner.lastName }}</p>
          </div>
          <div class="flex items-center justify-center text-xs tracking-widest">
            <p class="p-2">
              {{
                deal.owner.firstName.charAt(0).toUpperCase() +
                deal.owner.lastName.charAt(0).toUpperCase()
              }}
            </p>
          </div>
        </button>
        <div class="flex items-center justify-between space-x-1">
          <span class="h-2 w-2 rounded-full" :class="getPriorityClass(deal.priority)"></span>
          <span class="text-xs capitalize text-gray-800">
            {{ translatePriority(deal.priority) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .drag > div {
    transform: rotate(5deg);
  }
  .ghost {
    background: rgb(212, 242, 255);
    border-radius: 6px;
  }
  .ghost > div {
    visibility: hidden;
  }
</style>

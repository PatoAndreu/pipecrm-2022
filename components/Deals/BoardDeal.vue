<script setup lang="ts">
  import { IDeal } from '~~/interfaces/IDeals'

  interface Props {
    deal: IDeal
  }

  withDefaults(defineProps<Props>(), {
    deal: null
  })

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'CLP'
  })
</script>

<template>
  <div>
    <div
      class="my-2 h-24 cursor-grab space-y-1 rounded-md border bg-white p-2 text-sm"
      style="color: #33475b">
      <div class="font-bold" style="color: #0091ae">{{ deal.name }}</div>

      <div>
        <span class="font-bold">Valor: </span>
        $ {{ formatter.format(deal.amount) }}
      </div>

      <div>
        <span class="font-bold">Fecha de cierre: </span>
        {{ $dayjs(deal.closeDate).format('D/M/YYYY') }}
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

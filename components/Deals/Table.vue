<script setup lang="ts">
  const { setTabSelected, tabSelected } = useDeals()
</script>
<template>
  <!-- Tabs -->
  <div class="mt-4 w-full px-10">
    <div class="flex text-sm text-slate-600">
      <button
        class="min-w-[300px] px-4 py-2 hover:bg-slate-50"
        :class="
          tabSelected === 'all'
            ? 'border-x border-t border-b-2  border-b-white font-semibold'
            : 'border bg-slate-100'
        "
        @click="setTabSelected('all')">
        Todos los negocios
      </button>
      <button
        class="-ml-0.5 min-w-[300px] px-4 py-2 hover:bg-slate-50"
        :class="
          tabSelected === 'myDeals'
            ? 'border-x border-t border-b-2 border-b-white font-semibold'
            : 'border bg-slate-100'
        "
        @click="setTabSelected('myDeals')">
        Mis negocios
      </button>
    </div>
  </div>
</template>

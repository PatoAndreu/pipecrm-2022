<template>
  <div class="flex min-h-screen flex-col">
    <header class="bg-teal-500 p-4 text-center font-bold text-white">Header</header>
    <main class="flex h-64 flex-grow items-center justify-center bg-teal-600 text-white">Main</main>
    <footer class="bg-teal-500 p-4 text-center font-bold text-white">Footer</footer>
  </div>

  <!-- Stage Name -->
  <header
    class="flex h-10 w-72 items-center justify-between border p-6 text-sm"
    style="background-color: rgb(245, 248, 250)">
    <div>{{ stage.name }}</div>
    <div>({{ stage.deals.length }})</div>
  </header>
  <!-- Deals -->
  <div class="flex-grow">
    <div v-for="deal in stage.deals" :key="deal.id" class="px-2 py-1">
      <div class="h-24 space-y-1 border bg-white p-2 text-sm shadow-sm" style="color: #33475b">
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
  </div>
  <footer class="flex h-16 w-full items-center justify-center border bg-white">
    <div>
      <span>Total:</span>
      <span>$ {{ formatter.format(getStageTotal(stage)) }}</span>
    </div>
  </footer>
</template>

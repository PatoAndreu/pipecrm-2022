<script setup lang="ts">
  import { ViewGridIcon, ViewListIcon } from '@heroicons/vue/solid'
  const { getPipelineByUser, pipeline } = useDeals()

  await getPipelineByUser(1, 1)

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'CLP'
  })

  const getStageTotal = (stage) => {
    return stage.deals.reduce((sum, current) => sum + current.amount, 0)
  }
</script>
<template>
  <div class="bg-white">
    <!-- Header -->
    <div class="flex h-20 w-full items-center justify-between border-b-2 p-10">
      <div class="flex items-center space-x-2">
        <h1 class="mr-4">Negocios</h1>

        <div class="flex">
          <button class="bt-list flex h-8 w-8 items-center justify-center p-[6px]">
            <ViewGridIcon class="text-[#506e91]" />
          </button>
          <div class="btn-board flex h-8 w-8 items-center justify-center p-[6px]">
            <ViewListIcon class="text-[#506e91]" />
          </div>
        </div>

        <div>
          <select name="" id="">
            <option value="">Pipeline de ventas</option>
          </select>
        </div>
        <div>
          <select name="" id="">
            <option value="">Todos los negocios</option>
          </select>
        </div>
      </div>

      <div class="flex space-x-2">
        <button class="btn-default">Acciones</button>
        <button class="btn-default">Importar</button>
        <button class="btn-active">Crear negocio</button>
      </div>
    </div>
    <div class="mt-2 px-10">
      <!-- Board Header -->
      <div class="flex" style="background-color: rgb(245, 248, 250)">
        <div class="w-72 border" v-for="stage in pipeline.pipelineStages" :key="stage.id">
          <div class="relative flex flex-col" style="height: 100%">
            <header class="bg-teal-500 p-4 text-center font-bold text-white">Header</header>
            <main
              class="flex flex-grow items-center justify-center bg-teal-600 text-white"
              style="min-height: 100%">
              Main
            </main>
            <footer class="bottom-0 bg-teal-500 p-4 text-center font-bold text-white">
              Footer
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    -webkit-text-size-adjust: 100%;
    text-transform: none;
    cursor: pointer;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    color: #0091ae;
    user-select: inherit;
    font-size: inherit;
    line-height: inherit;
    hyphens: none;
    text-align: left;
    white-space: normal;
    box-sizing: border-box;
  }
  .btn-default {
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    font: inherit;
    margin: 0;
    text-transform: none;
    cursor: pointer;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    -webkit-font-smoothing: auto;
    font-weight: 400;
    text-align: center;
    user-select: none;
    transition: all 0.15s ease-out;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 16px;
    background-color: #fff;
    border-color: #ff7a59;
    color: #ff7a53;
  }
  .btn-default:hover {
    background-color: #fff8f6;
    color: #ff7a53;
  }
  .btn-active {
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    font: inherit;
    margin: 0;
    text-transform: none;
    cursor: pointer;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    -webkit-font-smoothing: auto;
    font-weight: 400;
    text-align: center;
    user-select: none;
    transition: all 0.15s ease-out;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 16px;
    background-color: #ff7a59;
    border-color: #ff7a59;
    color: #fff;
  }
  .btn-active:hover {
    background-color: #ff8f73;
    border-color: #ff8f73;
    color: #fff;
  }

  .bt-list {
    background-color: #cbd6e2;
    border-color: #7c98b6;
    border-radius: 3px 0px 0px 3px;
    border-style: solid;
    border-width: 1px;
    z-index: 1;
  }
  .btn-board {
    background-color: #eaf0f6;
    border-color: #7c98b6;
    margin-left: -1px;
    border-style: solid;
    border-width: 1px;
    border-radius: 0px 3px 3px 0px;
  }
  select {
    -webkit-text-size-adjust: 100%;
    text-transform: none;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    -webkit-font-smoothing: auto;
    font-weight: 400;
    text-align: center;
    user-select: none;
    transition: all 0.15s ease-out;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 16px;
    background-color: #eaf0f6;
    border-color: #cbd6e2;
    color: #506e91;
    width: 100% !important;
    padding-left: 8px !important;
  }
</style>

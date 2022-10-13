<script setup lang="ts">
  import { ViewGridIcon, ViewListIcon } from '@heroicons/vue/solid'
  import Deal from '@/components/Deals/BoardDeal.vue'
  import Draggable from 'vuedraggable'
  const { getPipelineByUser, pipeline, updateDeal } = useDeals()

  await getPipelineByUser(1, 1)

  const getStageTotal = (stage) => {
    return stage.deals.reduce((sum: number, current) => sum + current.amount, 0)
  }

  const sortDeals = async (e, stage) => {
    const item = e.added || e.moved
    const index = item?.newIndex

    const prevCard = stage.deals[index - 1]
    const nextCard = stage.deals[index + 1]
    const deal = stage.deals[index]

    if (deal) {
      let order = deal?.order

      if (prevCard && nextCard) {
        order = (prevCard.order + nextCard.order) / 2
      } else if (prevCard) {
        order = prevCard.order + prevCard.order / 2
      } else if (nextCard) {
        order = nextCard.order / 2
      }

      await updateDeal({
        ...deal,
        pipeline: { id: pipeline.value.id },
        pipelineStage: stage,
        order: order
      })
      await getPipelineByUser(1, 1)
    }
  }

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'CLP'
  })
</script>

<template>
  <div class="bg-white">
    <!-- Header -->
    <div
      class="sticky top-12 flex h-20 w-full items-center justify-between border-b-2 bg-white p-10">
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
    <!-- Board  -->
    <div class="ml-10 mr-10 mt-2 overflow-auto">
      <main class="z-0 flex">
        <div class="border" v-for="stage in pipeline.pipelineStages" :key="stage.id">
          <div
            class="flex w-72 flex-col justify-between"
            style="height: calc(100vh - 145px); color: #33475b">
            <header class="flex h-10 w-72 items-center justify-between border-y p-6 text-sm">
              <div>{{ stage.name }}</div>
              <div>({{ stage.deals.length }})</div>
            </header>
            <main class="flex-grow overflow-y-scroll bg-slate-100 py-2 text-white">
              <Draggable
                group="deals"
                v-model="stage.deals"
                item-key="id"
                class="px-2 py-1"
                drag-class="drag"
                ghost-class="ghost"
                @change="sortDeals($event, stage)">
                <template #item="{ element }">
                  <Deal :deal="element" />
                </template>
              </Draggable>
            </main>
            <footer class="border-t bg-white p-4 text-center font-bold" style="color: #33475b">
              <span>Total: </span>
              <span>$ {{ formatter.format(getStageTotal(stage)) }}</span>
            </footer>
          </div>
        </div>
      </main>
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

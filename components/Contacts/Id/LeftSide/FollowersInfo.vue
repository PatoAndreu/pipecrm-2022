<script lang="ts" setup>
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/vue/outline"
import { ref } from "#imports"

const showFollowersInfo = ref(false)
</script>

<template>
  <div v-auto-animate class="h-auto rounded border bg-white px-3 py-2">
    <!--    Header    -->
    <button
      class="flex items-center py-2 text-cyan-700 hover:text-cyan-500"
      @click="showFollowersInfo = !showFollowersInfo">
      <ChevronRightIcon v-if="!showFollowersInfo" class="mr-1 h-5" />
      <ChevronDownIcon v-else class="mr-1 h-5" />
      <div class="text-xs font-semibold">SEGUIDORES</div>
    </button>

    <div v-if="showFollowersInfo" v-auto-animate>
      <hr />
      <div class="mt-3">
        <p class="text-sm text-slate-500">No hay seguidores vinculados a este contacto.</p>
        <button class="my-4 text-left text-sm font-bold text-cyan-600 hover:text-cyan-500">
          + Vincular un seguidor
        </button>
      </div>
    </div>
  </div>
</template>

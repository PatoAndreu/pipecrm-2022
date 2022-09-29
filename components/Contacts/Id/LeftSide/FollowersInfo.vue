<script lang="ts" setup>
import { ChevronDownIcon, ChevronRightIcon, PlusCircleIcon } from "@heroicons/vue/outline";
import { ref } from "#imports";

const showFollowersInfo = ref(false);
</script>

<template>
  <div v-auto-animate class="border rounded h-auto px-3 py-2 bg-white">

    <!--    Header    -->
    <button class="flex items-center text-cyan-700 hover:text-cyan-500 py-2" @click="showFollowersInfo = !showFollowersInfo">
      <ChevronRightIcon v-if="!showFollowersInfo" class="h-5 mr-1" />
      <ChevronDownIcon v-else class="h-5 mr-1" />
      <div class="text-xs font-semibold">SEGUIDORES</div>
    </button>

    <div v-if="showFollowersInfo " v-auto-animate>

      <hr>
      <div class="mt-3">
        <p class="text-sm text-slate-500">No hay seguidores vinculados a este contacto.</p>
        <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500">+ Vincular un seguidor
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/outline";
</script>

<template>
  <div class="border rounded h-auto px-3 py-2 bg-white">
    <div class="flex justify-between items-center py-2">
      <div class="text-xs font-medium text-cyan-700">SEGUIDORES</div>
      <PlusCircleIcon class="h-5 text-cyan-600 cursor-pointer hover:text-cyan-500" @click="isEditing = true" />
    </div>
    <hr>
    <div class="mt-3">
      <p class="text-sm text-slate-500">No hay seguidores vinculados a este contacto.</p>
      <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500">+ Vincular un seguidor</button>
    </div>
  </div>
</template>


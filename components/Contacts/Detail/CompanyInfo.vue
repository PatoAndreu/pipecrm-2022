<script setup lang="ts">
import { PencilAltIcon } from "@heroicons/vue/outline";
</script>

<template>
  <div class="border rounded h-full px-3 py-2">
    <div class="flex justify-between items-center py-2">
      <div class="text-xs font-medium text-cyan-700">EMPRESA</div>
      <PencilAltIcon class="h-5 text-cyan-600 cursor-pointer" @click="isEditing = true" />
    </div>
    <hr>
    <div class="mt-2">
      <p class="text-sm text-slate-500">No hay organizaciones vinculadas a esta persona.</p>
      <button class="text-sm text-left my-4 text-cyan-600 font-bold hover:text-cyan-500">+ Vincular una empresa</button>
    </div>
  </div>
</template>


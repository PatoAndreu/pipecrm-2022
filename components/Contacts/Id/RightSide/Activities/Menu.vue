<script setup lang="ts">

import useActivities from "@/composables/useActivities";

const { activeTab } = useActivities();

</script>

<template>
  <ul class="flex space-x-10 p-4 text-slate-500">
    <li :class="activeTab === 'activities' ? 'active':''">
      <button @click="activeTab = 'activities'">Actividad</button>
      <div></div>
    </li>
    <li :class="activeTab === 'notes' ? 'active':''">
      <button @click="activeTab = 'notes'">Notas</button>
      <div></div>
    </li>
    <li :class="activeTab === 'tasks' ? 'active':''">
      <button @click="activeTab = 'tasks'">Tareas</button>
      <div></div>
    </li>
    <li :class="activeTab === 'meetings' ? 'active':''">
      <button @click="activeTab = 'meetings'">Reuniones</button>
      <div class=""></div>
    </li>
    <li :class="activeTab === 'calls' ? 'active':''">
      <button @click="activeTab = 'calls'">Llamadas</button>
      <div></div>
    </li>
    <li :class="activeTab === 'emails' ? 'active':''">
      <button @click="activeTab = 'emails'">Correos electrónicos</button>
      <div></div>
    </li>
  </ul>
  <hr>
</template>

<style scoped>
.active {
  @apply text-cyan-700 font-bold
}

.active div {
  display: block;
}

ul > li > div {
  @apply hidden h-1 w-full bg-cyan-700 rounded mt-2
}

li:not(.active) button:hover {
  @apply text-slate-400
}
</style>

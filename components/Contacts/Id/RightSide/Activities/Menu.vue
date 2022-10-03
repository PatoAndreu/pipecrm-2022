<script setup lang="ts">
import useActivity from "@/composables/useActivity"

const { activeTab } = useActivity()
</script>

<template>
  <div>
    <ul class="flex space-x-10 p-4 text-slate-500">
      <li :class="activeTab === 'activity' ? 'active' : ''">
        <button @click="activeTab = 'activity'">Actividad</button>
        <div></div>
      </li>
      <li :class="activeTab === 'notes' ? 'active' : ''">
        <button @click="activeTab = 'notes'">Notas</button>
        <div></div>
      </li>
      <li :class="activeTab === 'tasks' ? 'active' : ''">
        <button @click="activeTab = 'tasks'">Tareas</button>
        <div></div>
      </li>
      <li :class="activeTab === 'meetings' ? 'active' : ''">
        <button @click="activeTab = 'meetings'">Reuniones</button>
        <div class=""></div>
      </li>
      <li :class="activeTab === 'calls' ? 'active' : ''">
        <button @click="activeTab = 'calls'">Llamadas</button>
        <div></div>
      </li>
      <li :class="activeTab === 'emails' ? 'active' : ''">
        <button @click="activeTab = 'emails'">Correos electrónicos</button>
        <div></div>
      </li>
    </ul>
    <hr />
  </div>
</template>

<style scoped>
.active {
  @apply font-bold text-cyan-700;
}

.active div {
  display: block;
}

ul > li > div {
  @apply mt-2 hidden h-1 w-full rounded bg-cyan-700;
}

li:not(.active) button:hover {
  @apply text-slate-400;
}
</style>

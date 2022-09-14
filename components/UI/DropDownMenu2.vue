<template>
    <button
      class="px-4 py-2 relative flex justify-center items-center bg-white border focus:outline-none shadow text-gray-600 rounded group">
      <p>Dropdown</p>
      <ChevronDownIcon class="h-4 ml-1 cursor-pointer hover:text-cyan-500" />
      <div class="z-10 left-auto right-0 absolute hidden group-focus:block top-full min-w-full w-max bg-white shadow mt-1 rounded">
        <ul class="text-left border rounded">
        <slot/>
        </ul>
      </div>
    </button>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/outline";</script>

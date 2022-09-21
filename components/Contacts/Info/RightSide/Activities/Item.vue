<script setup lang="ts">
import {
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DotsHorizontalIcon,
  OfficeBuildingIcon,
  PaperClipIcon,
  UserIcon
} from "@heroicons/vue/outline";

interface Props {
  activity: object;
  pinned: boolean;
  note: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  activity: null,
  pinned: false,
  note: false
});
</script>

<template>
  <div class="bg-white w-full h-auto text-slate-600 shadow rounded my-4 p-2 relative">
    <!--  Header    -->

    <div class="w-10 h-10 rounded-full bg-orange-600 absolute flex items-center justify-center -right-5 -top-5 shadow-2xl opacity-90" v-if="pinned">
      <PaperClipIcon class="h-6 text-white" />
    </div>

    <div class="w-full flex items-center py-2">

      <CheckCircleIcon class="h-8 w-8 text-slate-400 cursor-pointer hover:text-green-600 " v-if="!note" />

      <button class="flex text-sm w-full justify-between px-2 hover:text-cyan-600">
        <div>
          <span class="font-bold">{{ !note ? "Tarea" : "Nota" }}</span>
          {{ !note ? "asignada a" : "por" }} Patricio Andreu
        </div>
      </button>

      <button class="relative h-6 w-6 border rounded border-slate-300 text-slate-400 text-sm hover:bg-slate-100 group mr-2">
        <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
        <div class="dropdown-container absolute bg-white w-52 h-auto py-4 border rounded shadow-lg mt-6 -right-2.5 hidden group-focus:block text-left">
          <ul class="flex-row space-y-1 text-slate-700">
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2">
              Editar
            </li>
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2" v-if="!note">
              Marcar como completada
            </li>
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2">Eliminar</li>
          </ul>
        </div>
      </button>

    </div>

    <hr>
    <!--  Body    -->
    <div class="p-4 text-slate-600">
      <p>{{ activity?.text }}</p>
    </div>
    <!--  Footer    -->
    <div class="flex px-4 text-xs space-x-4 items-center h-10" v-if="!note">

      <div class="flex">
        <CalendarIcon class="h-4 w-4" />
        <p class="ml-1">23 de sep. de 2022 a la(s) 1:40 PM</p>
      </div>

      <button class="flex relative justify-center group hover:text-indigo-600">
        <div class="bottom-6 w-max h-auto p-2 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner">
          <p>Propietario: Patricio Andreu</p>
        </div>
        <div class="flex items-center">
          <UserIcon class="h-4 w-4" />
          <p class="ml-1">Patricio Andreu</p>
        </div>
      </button>

      <button class="flex relative justify-center group hover:text-indigo-600">
        <div class="bottom-6 w-max h-auto p-2 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
          <p>Negocio(s):</p>
          <p>Negocio Fernanda Pellin</p>
          <p>Negocio Fernanda Pellin</p>
        </div>
        <div class="flex items-center">
          <CurrencyDollarIcon class="h-4 w-4" />
          <p class="ml-1">Negocio Fernanda Pellin</p>
        </div>
      </button>

      <button class="flex relative justify-center items-center group hover:text-indigo-600">
        <div class="bottom-6 w-max h-auto p-2 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
          <p>Empresa: Fullmedia</p>
        </div>
        <div class="flex items-center">
          <OfficeBuildingIcon class="h-4 w-4" />
          <p class="ml-1">Fullmedia</p>
        </div>
      </button>


      <!--        <CheckCircleIconOK class="h-6 w-6 text-green-600" />-->
    </div>
  </div>
</template>



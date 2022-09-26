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

import { CheckCircleIcon as CheckCircleIconOk } from "@heroicons/vue/solid";

import { IActivity } from "@/interfaces/IActivities";
import dayjs from "dayjs";
import useActivities from "@/composables/useActivities";

interface Props {
  activity: IActivity;
}

const props = withDefaults(defineProps<Props>(), {
  activity: null,
});

const { editActivity, changeStatus, deleteActivity } = useActivities();

// onMounted(() => {
//   if (!props.activity.delayed && !props.activity.completed){
//     const hoy: string = dayjs().format("YYYY-MM-DD hh:mm:ss");
//     const dateTime    = new Date(props.activity.date + " " + props.activity.time);
//     if (dayjs(dateTime).format("YYYY-MM-DD hh:mm:ss") <= hoy) {
//       props.activity.delayed = true;
//     }
//   }
// });

</script>

<template>


  <div class="w-full h-auto text-slate-600 shadow rounded my-4 p-2 relative" :class="activity.delayed ? 'bg-red-50':'bg-white'">
    <!--  Header    -->

    <div class="w-10 h-10 rounded-full bg-orange-600 absolute flex items-center justify-center -right-5 -top-5 shadow-2xl opacity-90 cursor-pointer hover:opacity-90 shadow-2xl"
         v-if="activity.pinned">

      <PaperClipIcon
        class="h-6 text-white"
        @click="changeStatus(activity, {pinned: false})"
      />
    </div>

    <div class="w-full flex items-center py-2">

      <div>
        <CheckCircleIcon class="h-8 w-8 text-slate-400 cursor-pointer hover:text-green-600" @click="changeStatus(activity, {completed: true})" v-if="!activity.completed" />
        <CheckCircleIconOk class="h-8 w-8 text-green-400 cursor-pointer hover:text-green-600" @click="changeStatus(activity, {completed: false})" v-else />
      </div>

      <button class="flex text-sm w-full justify-between px-2 hover:text-cyan-600" @click="editActivity(activity)">
        <div>
          <span class="font-bold">Tarea </span>
          <span>
             {{ activity.type}}
          </span>
        </div>
      </button>

      <!--Menú-->
      <button class=" relative h-6 w-6 border rounded border-slate-300 text-slate-400 text-sm hover:bg-slate-100 group mr-2">
        <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
        <div class="z-50 dropdown-container absolute bg-white w-52 h-auto py-4 border rounded shadow-lg mt-6 -right-2.5 hidden group-focus:block text-left">
          <ul class="flex-row space-y-1 text-slate-700">
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="editActivity(activity)">
              Editar
            </li>
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2" @click="changeStatus(activity, {pinned: true})">
              Anclar
            </li>

            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2">
              Marcar como completada
            </li>
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @CLICK="deleteActivity(activity)">Eliminar</li>
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
    <div class="flex px-4 text-xs space-x-4 items-center h-10">

      <div class="flex" :class="activity.delayed ? 'text-red-500':''">
        <CalendarIcon class="h-4 w-4" />
        <p class="ml-1">
          {{ $dayjs(activity.date).format("ddd DD MMM YYYY") }}
          a las {{ $dayjs("1/1/1 " + activity.time).format("h:mm A") }}
        </p>
      </div>

      <button class="flex relative justify-center group hover:text-indigo-600" v-if="activity.owner">
        <div class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner">
          <p>{{ activity.type === "note" ? "Creada por" : "Asignada a" }}</p>
        </div>
        <div class="flex items-center">
          <UserIcon class="h-4 w-4" />
          <p class="ml-1">{{ activity.owner.firstName }} {{ activity.owner.lastName }}</p>
        </div>
      </button>

      <button class="flex relative justify-center group hover:text-indigo-600" v-if="activity.deal">
        <div class="bottom-6 w-max h-auto p-2 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
          <p>Negocio</p>
        </div>
        <div class="flex items-center">
          <CurrencyDollarIcon class="h-4 w-4" />
          <p class="ml-1">{{ activity.deal.name }}</p>
        </div>
      </button>

      <button class="flex relative justify-center items-center group hover:text-indigo-600" v-if="activity.company">
        <div class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
          <p>Empresa</p>
        </div>
        <div class="flex items-center">
          <OfficeBuildingIcon class="h-4 w-4" />
          <p class="ml-1">{{ activity.company.name }}</p>
        </div>
      </button>

    </div>
  </div>
</template>



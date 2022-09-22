<script setup lang="ts">
import {
  CalendarIcon,
  DotsHorizontalIcon,
  PaperClipIcon,
  UserIcon,
  AnnotationIcon
} from "@heroicons/vue/outline";

interface Props {
  activity: object;
  pinned: boolean;
  note: boolean;
}

withDefaults(defineProps<Props>(), {
  activity: null,
  pinned: false,
  note: false
});

const { editActivity, changeStatus, deleteActivity } = useActivities();

</script>

<template>
  <div class="bg-white w-full h-auto text-slate-600 shadow rounded  p-2 relative" :class="activity.pinned ? 'my-7': 'my-4'">
    <!--  Header    -->

    <div class="w-10 h-10 rounded-full bg-orange-600 absolute flex items-center justify-center -right-5 -top-5 shadow-2xl opacity-90 cursor-pointer hover:opacity-90 shadow-2xl"
         v-if="activity.pinned">

      <PaperClipIcon
        class="h-6 text-white"
        @click="changeStatus(activity, {pinned: false})"
      />
    </div>

    <div class="w-10 h-10 rounded-full bg-orange-600 absolute flex items-center justify-center -right-5 -top-5 shadow-2xl opacity-90 cursor-pointer hover:opacity-90 shadow-2xl"
         v-if="activity.pinned">

      <PaperClipIcon
        class="h-6 text-white"
        @click="changeStatus(activity, {pinned: false})"
      />
    </div>

    <div class="w-full flex items-center py-2">

      <button class="flex text-sm w-full justify-between px-2 hover:text-cyan-600" @click="editActivity(activity)">
        <div class="flex items-center">
          <AnnotationIcon class="h-5"/>
          <span class="ml-2 font-bold">Nota</span>
        </div>
      </button>

      <!--Menú-->
      <button class="relative h-6 w-6 border rounded border-slate-300 text-slate-400 text-sm hover:bg-slate-100 group mr-2">
        <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
        <div class="z-50 dropdown-container absolute bg-white w-52 h-auto pt-4 pb-2 border rounded shadow-lg mt-6 -right-2.5 hidden group-focus:block text-left">
          <ul class="flex-row space-y-1 text-slate-700">
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="editActivity(activity)">
              Editar
            </li>
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2" @click="changeStatus(activity, {pinned: true})" v-if="!activity.pinned">
              Anclar
            </li>
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2" @click="changeStatus(activity, {pinned: false})" v-else>
              Desanclar
            </li>
            <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="deleteActivity(activity)">Eliminar</li>
          </ul>
        </div>
      </button>

    </div>

    <hr>
    <!--  Body    -->
    <div class="p-4 text-slate-600 text-sm">
      <p>{{ activity?.text }}</p>
    </div>
    <!--  Footer    -->
    <div class="flex px-4 text-xs text-slate-500 space-x-4 items-center h-10">

      <div class="flex relative justify-center items-center group hover:text-indigo-600">
        <div class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
          <p>Fecha creación</p>
        </div>
        <CalendarIcon class="h-4 w-4" />
        <p class="ml-1">{{ $dayjs(activity.createdAt).format("DD MMMM YYYY h:mm A")}}</p>
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



    </div>
  </div>
</template>



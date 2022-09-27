<script setup lang="ts">
import { IActivity } from "@/interfaces/IActivities";
import {
  AnnotationIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DotsHorizontalIcon,
  PaperClipIcon,
  UserIcon
} from "@heroicons/vue/outline";

import useActivities from "@/composables/useActivities";

interface Props {
  note: IActivity;
}

withDefaults(defineProps<Props>(), {
  note: null
});

const { editTask, changeTaskStatus, deleteTask } = useActivities();

</script>

<template>
  <div class="activity-container flex h-auto">

    <div class="activity-icon w-16 flex relative">
      <div class="w-10 h-10 rounded-full border bg-white flex items-center justify-center absolute top-7">
        <AnnotationIcon class="h-5 text-slate-400" />
      </div>
      <div class="mt-7 h-auto line w-0.5 bg-slate-200 text-center ml-5"></div>
    </div>

    <div class="activity-item w-full text-slate-600 shadow rounded my-4 p-2 relative bg-amber-50"
         :class="note.pinned ? 'my-7': 'my-4'">

      <!--  Header    -->

      <div class="w-10 h-10 rounded-full bg-orange-600 absolute flex items-center justify-center -right-5 -top-5 shadow-2xl opacity-90 cursor-pointer hover:opacity-90 shadow-2xl"
           v-if="note.pinned">

        <PaperClipIcon
          class="h-6 text-white"
          @click="changeTaskStatus(note, {pinned: false})"
        />
      </div>

      <div class="w-full flex items-center py-2">

        <button class="flex text-sm w-full justify-between px-2 hover:text-cyan-600" @click="editTask(note)">
          <div class="flex items-center">
            <span class="ml-2 font-bold">
            Nota
            <span class="font-normal"> creada por </span>
            {{ note.owner.firstName }} {{ note.owner.lastName }}
          </span>
          </div>
        </button>

        <!--Menú-->
        <button
          class="relative h-6 w-6 border rounded border-slate-300 text-slate-400 text-sm hover:bg-slate-100 group mr-2">
          <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
          <div
            class="z-50 dropdown-container absolute bg-white w-52 h-auto pt-4 pb-2 border rounded shadow-lg mt-6 -right-2.5 hidden group-focus:block text-left">
            <ul class="flex-row space-y-1 text-slate-700">
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="editTask(note)">
                Editar
              </li>
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2"
                  @click="changeTaskStatus(note, {pinned: true})" v-if="!note.pinned">
                Anclar
              </li>
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2"
                  @click="changeTaskStatus(note, {pinned: false})" v-else>
                Desanclar
              </li>
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="deleteTask(note)">
                Eliminar
              </li>
            </ul>
          </div>
        </button>

      </div>

      <hr>
      <!--  Body    -->
      <div class="p-4 text-slate-600 text-sm">
        <p>{{ note?.text }}</p>
      </div>

      <!--  Footer    -->
      <div class="flex px-4 text-xs text-slate-500 space-x-4 items-center h-10">

        <button class="flex relative justify-center items-center group hover:text-indigo-600 cursor-help">
          <div
            class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
            <p>Fecha de creación</p>
          </div>
          <CalendarIcon class="h-4 w-4" />
          <p class="ml-1">{{ $dayjs(note.createdAt).format("DD MMMM YYYY h:mm A") }}</p>
        </button>

        <button class="flex relative justify-center group hover:text-indigo-600" v-if="note.owner">
          <div
            class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner">
            <p>Asociada al Contacto </p>
          </div>
          <div class="flex items-center">
            <UserIcon class="h-4 w-4" />
            <p class="ml-1">{{ note.contact.firstName }} {{ note.contact.lastName }}</p>
          </div>
        </button>

        <button class="flex relative justify-center group hover:text-indigo-600" v-if="note.deal">
          <div class="bottom-6 w-max h-auto p-2 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
            <p>Asociada al Negocio</p>
          </div>
          <div class="flex items-center">
            <CurrencyDollarIcon class="h-4 w-4" />
            <p class="ml-1">{{ note.deal.name }}</p>
          </div>
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-item:after {
  content: "";
  position: absolute;
  left: -9px;
  top: 25px;
  width: 15px;
  height: 15px;
  background-color: #FFFBEB;
  border-left: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  transform: rotate(45deg);
}
</style>



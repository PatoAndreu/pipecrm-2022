<script setup lang="ts">
import {
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DotsHorizontalIcon,
  MailIcon,
  OfficeBuildingIcon,
  PaperClipIcon,
  PhoneOutgoingIcon,
  UserIcon,
  UserGroupIcon
} from "@heroicons/vue/outline";

import { CheckCircleIcon as CheckCircleIconOk } from "@heroicons/vue/solid";

import { IActivity } from "@/interfaces/IActivities";
import useActivities from "@/composables/useActivities";
import { computed } from "@vue/reactivity";

interface Props {
  task: IActivity;
}

const props = withDefaults(defineProps<Props>(), {
  task: null
});

const { editTask, changeTaskStatus, deleteTask } = useActivities();

const arrowColor = computed(() => {
  return props.task?.delayed ? '#FEF2F2' : '#FFFFFF'
})

// onMounted(() => {
//   if (!props.task.delayed && !props.task.completed){
//     const hoy: string = dayjs().format("YYYY-MM-DD hh:mm:ss");
//     const dateTime    = new Date(props.task.date + " " + props.task.time);
//     if (dayjs(dateTime).format("YYYY-MM-DD hh:mm:ss") <= hoy) {
//       props.task.delayed = true;
//     }
//   }
// });

</script>

<template>
  <div class="activity-container flex h-auto">

    <div class="activity-icon w-16 flex relative">
      <div class="w-10 h-10 rounded-full border bg-white flex items-center justify-center absolute top-7">
        <PhoneOutgoingIcon class="h-5 text-slate-400" v-if="task.type === 'call'" />
        <MailIcon class="h-5 text-slate-400" v-if="task.type === 'email'" />
        <UserGroupIcon class="h-5 text-slate-400" v-if="task.type === 'meeting'" />
      </div>
      <div class="mt-7 h-auto line w-0.5 bg-slate-200 text-center ml-5"></div>
    </div>

    <div class="activity-item w-full text-slate-600 shadow rounded my-4 p-2 relative" :class="task.delayed ? 'bg-red-50':'bg-white'">
      <!--  Header    -->

      <div class="w-10 h-10 rounded-full bg-orange-600 absolute flex items-center justify-center -right-5 -top-5 shadow-2xl opacity-90 cursor-pointer hover:opacity-90 shadow-2xl"
           v-if="task.pinned">

        <PaperClipIcon
          class="h-6 text-white"
          @click="changeTaskStatus(task, {pinned: false})"
        />
      </div>

      <div class="w-full flex items-center py-2">

        <div class="mr-2">
          <CheckCircleIcon class="h-8 w-8 text-slate-400 cursor-pointer hover:text-green-600" @click="changeTaskStatus(task, {completed: true})" v-if="!task.completed" />
          <CheckCircleIconOk class="h-8 w-8 text-green-400 cursor-pointer hover:text-green-600" @click="changeTaskStatus(task, {completed: false})" v-else />
        </div>

        <button class="flex text-sm w-full justify-between px-2 hover:text-cyan-600" @click="editTask(task)">
          <div>
            <span class="font-bold">Tarea </span> asignada a
            <span class="font-bold"> {{ task.owner.firstName }}  {{ task.owner.lastName }} </span>
          </div>
        </button>

        <!--Menú-->
        <button class=" relative h-6 w-6 border rounded border-slate-300 text-slate-400 text-sm hover:bg-slate-100 group mr-2">
          <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
          <div class="z-50 dropdown-container absolute bg-white w-52 h-auto py-4 border rounded shadow-lg mt-6 -right-2.5 hidden group-focus:block text-left">
            <ul class="flex-row space-y-1 text-slate-700">
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="editTask(task)">
                Editar
              </li>
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2"
                  @click="changeTaskStatus(task, {pinned: true})" v-if="!task.pinned">
                Anclar
              </li>
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2"
                  @click="changeTaskStatus(task, {pinned: false})" v-else>
                Desanclar
              </li>

              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 mt-4 pl-2" @click="changeTaskStatus(task, {completed: true})">
                Marcar como completada
              </li>
              <li class="w-full hover:bg-cyan-500 hover:text-white py-1 pl-2" @click="deleteTask(task)">Eliminar</li>
            </ul>
          </div>
        </button>

      </div>

      <hr>
      <!--  Body    -->
      <div class="p-4 text-slate-600">
        <p>{{ task?.text }}</p>
      </div>
      <div class="p-4 bg-amber-50 italic text-sm" v-if="task.note">
        {{ task.note }}
      </div>
      <!--  Footer    -->
      <div class="flex px-4 text-xs space-x-4 items-center h-10">

        <div class="flex relative justify-center group hover:text-indigo-600" :class="task.delayed ? 'text-red-500':''">
          <div
            class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
            <p>Fecha de vencimiento</p>
          </div>
          <button class="flex items-center cursor-help">
            <CalendarIcon class="h-4 w-4" />
            <p class="ml-1">
              {{ $dayjs(task.date).format("ddd DD MMM YYYY") }}
              a las {{ $dayjs("1/1/1 " + task.time).format("h:mm A") }}
            </p>
          </button>
        </div>



        <button class="flex relative justify-center group hover:text-indigo-600" v-if="task.owner">
          <div class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner">
            <p>Asignada al Usuario</p>
          </div>
          <div class="flex items-center">
            <UserIcon class="h-4 w-4" />
            <p class="ml-1">{{ task.owner.firstName }} {{ task.owner.lastName }}</p>
          </div>
        </button>

        <button class="flex relative justify-center group hover:text-indigo-600" v-if="task.deal">
          <div class="bottom-6 w-max h-auto p-2 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
            <p>Asociada al Negocio</p>
          </div>
          <div class="flex items-center">
            <CurrencyDollarIcon class="h-4 w-4" />
            <p class="ml-1">{{ task.deal.name }}</p>
          </div>
        </button>

        <button class="flex relative justify-center items-center group hover:text-indigo-600" v-if="task.company">
          <div class="bottom-6 w-max h-auto px-2 py-1 rounded bg-indigo-600 text-white absolute z-50 shadow group-hover:block hidden inner text-left space-y-2">
            <p>Asociada a la Empresa</p>
          </div>
          <div class="flex items-center">
            <OfficeBuildingIcon class="h-4 w-4" />
            <p class="ml-1">{{ task.company.name }}</p>
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
  background-color: v-bind(arrowColor);
  border-left: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  transform: rotate(45deg);
}
</style>





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
  UserIcon
} from "@heroicons/vue/outline"

import { CheckCircleIcon as CheckCircleIconOk } from "@heroicons/vue/solid"

import useTasks from "@/composables/useTasks"
import { computed } from "@vue/reactivity"
import { ITask } from "@/interfaces/ITasks"

interface Props {
  task: ITask
}

const props = withDefaults(defineProps<Props>(), {
  task: null
})

const { editTask, changeTaskStatus, deleteTask } = useTasks()

const arrowColor = computed(() => {
  return props.task?.delayed ? "#FEF2F2" : "#FFFFFF"
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
    <div class="activity-icon relative flex w-16">
      <div class="absolute top-7 flex h-10 w-10 items-center justify-center rounded-full border bg-white">
        <PhoneOutgoingIcon class="h-5 text-slate-400" v-if="task.type === 'call'" />
        <MailIcon class="h-5 text-slate-400" v-if="task.type === 'email'" />
        <PaperClipIcon class="h-5 text-slate-400" v-if="task.type === 'other'" />
      </div>
      <div class="line mt-7 ml-5 h-auto w-0.5 bg-slate-200 text-center"></div>
    </div>

    <div
      class="activity-item relative my-4 w-full rounded p-2 text-slate-600 shadow"
      :class="task.delayed ? 'bg-red-50' : 'bg-white'">
      <!--  Header    -->

      <div
        class="absolute -right-5 -top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-600 opacity-90 shadow-2xl shadow-2xl hover:opacity-90"
        v-if="task.pinned">
        <PaperClipIcon class="h-6 text-white" @click="changeTaskStatus(task, { pinned: false })" />
      </div>

      <div class="flex w-full items-center py-2">
        <div class="mr-2">
          <CheckCircleIcon
            class="h-8 w-8 cursor-pointer text-slate-400 hover:text-green-600"
            @click="changeTaskStatus(task, { completed: true })"
            v-if="!task.completed" />
          <CheckCircleIconOk
            class="h-8 w-8 cursor-pointer text-green-400 hover:text-green-600"
            @click="changeTaskStatus(task, { completed: false })"
            v-else />
        </div>

        <button class="flex w-full justify-between px-2 text-sm hover:text-cyan-600" @click="editTask(task)">
          <div>
            <span class="font-bold">Tarea </span> asignada a
            <span class="font-bold"> {{ task.owner.firstName }} {{ task.owner.lastName }} </span>
          </div>
        </button>

        <!--Menú-->
        <button
          class="group relative mr-2 h-6 w-6 rounded border border-slate-300 text-sm text-slate-400 hover:bg-slate-100">
          <DotsHorizontalIcon class="mx-auto h-4 w-4" />
          <div
            class="dropdown-container absolute -right-2.5 z-50 mt-6 hidden h-auto w-52 rounded border bg-white py-4 text-left shadow-lg group-focus:block">
            <ul class="flex-row space-y-1 text-slate-700">
              <li class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white" @click="editTask(task)">Editar</li>
              <li
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="changeTaskStatus(task, { pinned: true })"
                v-if="!task.pinned">
                Anclar
              </li>
              <li
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="changeTaskStatus(task, { pinned: false })"
                v-else>
                Desanclar
              </li>

              <li
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="changeTaskStatus(task, { completed: true })">
                Marcar como completada
              </li>
              <li class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white" @click="deleteTask(task)">Eliminar</li>
            </ul>
          </div>
        </button>
      </div>

      <hr />
      <!--  Body    -->
      <div class="p-4 text-slate-600">
        <p>{{ task?.text }}</p>
      </div>
      <div class="bg-amber-50 p-4 text-sm italic" v-if="task.note">
        {{ task.note }}
      </div>
      <!--  Footer    -->
      <div class="flex h-10 items-center space-x-4 px-4 text-xs">
        <div
          class="group relative flex justify-center hover:text-indigo-600"
          :class="task.delayed ? 'text-red-500' : ''">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 px-2 py-1 text-left text-white shadow group-hover:block">
            <p>Fecha de vencimiento</p>
          </div>
          <button class="flex cursor-help items-center">
            <CalendarIcon class="h-4 w-4" />
            <p class="ml-1">
              {{ $dayjs(task.date).format("ddd DD MMM YYYY") }}
              a las {{ $dayjs("1/1/1 " + task.time).format("h:mm A") }}
            </p>
          </button>
        </div>

        <button class="group relative flex justify-center hover:text-indigo-600" v-if="task.contact">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max rounded bg-indigo-600 px-2 py-1 text-white shadow group-hover:block">
            <p>Asignada al Contacto</p>
          </div>
          <div class="flex items-center">
            <UserIcon class="h-4 w-4" />
            <p class="ml-1">{{ task.contact.firstName }} {{ task.contact.lastName }}</p>
          </div>
        </button>

        <button class="group relative flex justify-center hover:text-indigo-600" v-if="task.deal">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 p-2 text-left text-white shadow group-hover:block">
            <p>Asociada al Negocio</p>
          </div>
          <div class="flex items-center">
            <CurrencyDollarIcon class="h-4 w-4" />
            <p class="ml-1">{{ task.deal.name }}</p>
          </div>
        </button>

        <button class="group relative flex items-center justify-center hover:text-indigo-600" v-if="task.company">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 px-2 py-1 text-left text-white shadow group-hover:block">
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

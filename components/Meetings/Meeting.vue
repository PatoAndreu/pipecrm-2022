<script setup lang="ts">
  import {
    CalendarIcon,
    CurrencyDollarIcon,
    DotsHorizontalIcon,
    OfficeBuildingIcon,
    PaperClipIcon,
    UserIcon
  } from '@heroicons/vue/outline'

  import useMeetings from '@/composables/useMeetings'
  import { IMeeting } from '@/interfaces/IMeetings'

  interface Props {
    meeting: IMeeting
  }

  withDefaults(defineProps<Props>(), {
    meeting: null
  })

  const { editMeeting, changeMeetingStatus, openMeetingDeleteModal } = useMeetings()
</script>

<template>
  <div class="activity-container flex h-auto">
    <div class="activity-icon relative flex w-16">
      <div
        class="absolute top-7 flex h-10 w-10 items-center justify-center rounded-full border bg-white">
        <CalendarIcon class="h-5 text-slate-400" />
      </div>
      <div class="line mt-7 ml-5 h-auto w-0.5 bg-slate-200 text-center"></div>
    </div>

    <div class="activity-item relative my-4 w-full rounded bg-white p-2 text-slate-600 shadow">
      <!--  Header    -->

      <div
        class="absolute -right-5 -top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-600 opacity-90 shadow-2xl hover:opacity-90"
        v-if="meeting.pinned">
        <PaperClipIcon
          class="h-6 text-white"
          @click="changeMeetingStatus(meeting, { pinned: false })" />
      </div>

      <div class="flex w-full items-center py-2">
        <button
          class="flex w-full justify-between px-2 text-sm hover:text-cyan-600"
          @click="editMeeting(meeting)">
          <div>
            <span class="font-bold" v-if="meeting.type === 'program'"
              >Reunión programada - {{ meeting.title }}</span
            >
            <span class="font-bold" v-else>Reunión registrada - </span>
            <span class="text-slate-400">
              por {{ meeting.owner.firstName }} {{ meeting.owner.lastName }}
            </span>
          </div>
        </button>

        <!--Menú-->
        <button
          class="group relative mr-2 h-6 w-6 rounded border border-slate-300 text-sm text-slate-400 hover:bg-slate-100">
          <DotsHorizontalIcon class="mx-auto h-4 w-4" />
          <div
            class="dropdown-container absolute -right-2.5 z-50 mt-6 hidden h-auto w-52 rounded border bg-white py-4 text-left shadow-lg group-focus:block">
            <ul class="flex-row space-y-1 text-slate-700">
              <li
                class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="editMeeting(meeting)">
                Editar
              </li>
              <li
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="changeMeetingStatus(meeting, { pinned: true })"
                v-if="!meeting.pinned">
                Anclar
              </li>
              <li
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="changeMeetingStatus(meeting, { pinned: false })"
                v-else>
                Desanclar
              </li>

              <li
                class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="openMeetingDeleteModal(meeting)">
                Eliminar
              </li>
            </ul>
          </div>
        </button>
      </div>

      <hr />
      <!--  Body    -->

      <div class="px-4 py-6 text-sm italic" v-if="meeting.description">
        {{ meeting.description }}
      </div>
      <div v-if="meeting.type === 'register'">
        <hr />
        <div class="my-2 flex space-x-2">
          <div class="inline-block space-y-1 py-2 px-4 text-xs">
            <div class="text-slate-400">Asistentes</div>
            <button
              class="group relative flex justify-center hover:text-indigo-600"
              v-if="meeting.deal">
              <div
                class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 p-2 text-left text-white shadow group-hover:block">
                <div class="flex items-center space-x-1">
                  <UserIcon class="w-3" />
                  <div>Patricio Andreu</div>
                </div>
                <div class="flex items-center space-x-1">
                  <UserIcon class="w-3" />
                  <div>Fernada Pellin</div>
                </div>
              </div>
              <div class="flex items-center font-medium capitalize text-cyan-600">
                <p>2 asistentes</p>
              </div>
            </button>
          </div>

          <div class="inline-block space-y-1 py-2 px-4 text-xs">
            <div class="text-slate-400">Resultado</div>
            <div class="font-medium capitalize text-cyan-600">{{ meeting.result }}</div>
          </div>

          <div class="inline-block space-y-1 py-2 px-4 text-xs">
            <div class="text-slate-400">Fecha</div>
            <div class="font-medium capitalize text-cyan-600">
              {{ meeting.date }} - {{ meeting.time }}
            </div>
          </div>

          <div class="inline-block space-y-1 py-2 px-4 text-xs">
            <div class="text-slate-400">Duración</div>
            <div class="font-medium capitalize text-cyan-600">{{ meeting.duration }}</div>
          </div>
        </div>
        <hr />
      </div>
      <!--  Footer    -->
      <div class="flex h-10 items-center space-x-4 px-4 text-xs">
        <div class="group relative flex justify-center hover:text-indigo-600">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 px-2 py-1 text-left text-white shadow group-hover:block">
            <p>Fecha de creación</p>
          </div>
          <button class="flex cursor-help items-center">
            <CalendarIcon class="h-4 w-4" />
            <p class="ml-1">{{ $dayjs(meeting.createdAt).format('ddd DD MMMM YYYY H:mm') }}</p>
          </button>
        </div>

        <button
          class="group relative flex justify-center hover:text-indigo-600"
          v-if="meeting.contact">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max rounded bg-indigo-600 px-2 py-1 text-white shadow group-hover:block">
            <p>Asignada al Contacto</p>
          </div>
          <div class="flex items-center">
            <UserIcon class="h-4 w-4" />
            <p class="ml-1">{{ meeting.contact.firstName }} {{ meeting.contact.lastName }}</p>
          </div>
        </button>

        <button
          class="group relative flex justify-center hover:text-indigo-600"
          v-if="meeting.deal">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 p-2 text-left text-white shadow group-hover:block">
            <p>Asociada al Negocio</p>
          </div>
          <div class="flex items-center">
            <CurrencyDollarIcon class="h-4 w-4" />
            <p class="ml-1">{{ meeting.deal.name }}</p>
          </div>
        </button>

        <button
          class="group relative flex items-center justify-center hover:text-indigo-600"
          v-if="meeting.company">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 px-2 py-1 text-left text-white shadow group-hover:block">
            <p>Asociada a la Empresa</p>
          </div>
          <div class="flex items-center">
            <OfficeBuildingIcon class="h-4 w-4" />
            <p class="ml-1">{{ meeting.company.name }}</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .activity-item:after {
    content: '';
    position: absolute;
    left: -9px;
    top: 25px;
    width: 15px;
    height: 15px;
    background-color: '#FFFFFF';
    border-left: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    transform: rotate(45deg);
  }
</style>

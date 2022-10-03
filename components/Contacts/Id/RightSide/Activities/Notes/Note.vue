<script lang="ts" setup>
  import { INote } from '@/interfaces/INotes'
  import {
    AnnotationIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    DotsHorizontalIcon,
    PaperClipIcon,
    UserIcon
  } from '@heroicons/vue/outline'

  import useNotes from '@/composables/useNotes'

  interface Props {
    note: INote
  }

  withDefaults(defineProps<Props>(), {
    note: null
  })

  const { deleteModalOpen, deleteMessage, confirmDelete } = useUi()

  const { pinOrUnpinNote, editNote, deleteNote } = useNotes()

  const deleteModal = async (noteLocal: INote) => {
    const { note } = useNotes()
    note.value = { ...noteLocal }
    deleteMessage.value = '¿Está seguro de que desea eliminar esta actividad?'
    deleteModalOpen.value = true
    confirmDelete.value = false
  }

  watch(confirmDelete, async (newValue, oldValue) => {
    if (newValue) {
      const { note } = useNotes()
      await deleteNote(note.value)
    }
  })
</script>

<template>
  <div class="activity-container flex h-auto" v-auto-animate>
    <div class="activity-icon relative flex w-16">
      <div
        class="absolute top-7 flex h-10 w-10 items-center justify-center rounded-full border bg-white">
        <AnnotationIcon class="h-5 text-slate-400" />
      </div>
      <div class="line mt-7 ml-5 h-auto w-0.5 bg-slate-200 text-center"></div>
    </div>

    <div
      :class="note.pinned ? 'my-7' : 'my-4'"
      class="activity-item relative my-4 w-full rounded bg-amber-50 p-2 text-slate-600 shadow">
      <!--  Header    -->
      <div
        v-if="note.pinned"
        class="absolute -right-5 -top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-600 opacity-90 shadow-2xl hover:opacity-90">
        <PaperClipIcon class="h-6 text-white" @click="pinOrUnpinNote(note, false)" />
      </div>

      <div class="flex w-full items-center py-2">
        <button
          class="flex w-full justify-between px-2 text-sm hover:text-cyan-600"
          @click="editNote(note)">
          <div class="flex items-center">
            <span class="ml-2 font-bold">
              Nota
              <span class="font-normal"> creada por </span>
              {{ note.owner?.firstName }} {{ note.owner?.lastName }}
            </span>
          </div>
        </button>

        <!--Menú-->
        <button
          class="group relative mr-2 h-6 w-6 rounded border border-slate-300 text-sm text-slate-400 hover:bg-slate-100">
          <DotsHorizontalIcon class="mx-auto h-4 w-4" />
          <div
            class="dropdown-container absolute -right-2.5 z-50 mt-6 hidden h-auto w-52 rounded border bg-white pt-4 pb-2 text-left shadow-lg group-focus:block">
            <ul class="flex-row space-y-1 text-slate-700">
              <li
                class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="editNote(note)">
                Editar
              </li>
              <li
                v-if="!note.pinned"
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="pinOrUnpinNote(note, true)">
                Anclar
              </li>
              <li
                v-else
                class="mt-4 w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="pinOrUnpinNote(note, false)">
                Desanclar
              </li>
              <li
                class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="deleteModal(note)">
                Eliminar
              </li>
              <!-- <li class="w-full py-1 pl-2 hover:bg-cyan-500 hover:text-white" @click="deleteNote(note)">Eliminar</li> -->
            </ul>
          </div>
        </button>
      </div>

      <hr />
      <!--  Body    -->
      <div class="p-4 text-sm text-slate-600">
        <p>{{ note?.text }}</p>
      </div>

      <!--  Footer    -->
      <div class="flex h-10 items-center space-x-4 px-4 text-xs text-slate-500" v-auto-animate>
        <button
          class="group relative flex cursor-help items-center justify-center hover:text-indigo-600">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 px-2 py-1 text-left text-white shadow group-hover:block">
            <p>Fecha de creación</p>
          </div>
          <CalendarIcon class="h-4 w-4" />
          <p class="ml-1">{{ $dayjs(note.createdAt).format('ddd DD MMMM YYYY H:mm') }}</p>
        </button>

        <button v-if="note.owner" class="group relative flex justify-center hover:text-indigo-600">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max rounded bg-indigo-600 px-2 py-1 text-white shadow group-hover:block">
            <p>Asociada al Contacto</p>
          </div>
          <div class="flex items-center">
            <UserIcon class="h-4 w-4" />
            <p class="ml-1">{{ note.contact.firstName }} {{ note.contact.lastName }}</p>
          </div>
        </button>

        <button v-if="note.deal" class="group relative flex justify-center hover:text-indigo-600">
          <div
            class="inner absolute bottom-6 z-50 hidden h-auto w-max space-y-2 rounded bg-indigo-600 p-2 text-left text-white shadow group-hover:block">
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
    content: '';
    position: absolute;
    left: -9px;
    top: 25px;
    width: 15px;
    height: 15px;
    background-color: #fffbeb;
    border-left: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    transform: rotate(45deg);
  }
</style>

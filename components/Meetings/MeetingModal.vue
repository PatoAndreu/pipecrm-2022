<script lang="ts" setup>
  import { computed, onMounted } from '#imports'
  import { ChevronDownIcon, ChevronRightIcon, XIcon } from '@heroicons/vue/outline'
  import useTasks from '@/composables/useTasks'
  import useContacts from '@/composables/useContacts'
  import useDeals from '@/composables/useDeals'
  import useUsers from '@/composables/useUsers'

  const {
    meeting,
    showMeetingModal,
    isEditing,
    minimize,
    showAssociations,
    saveMeeting,
    closeMeetingModal
  } = useMeetings()

  const textInput = ref(null)
  const duration = ref([
    '15 minutos',
    '30 minutos',
    '45 minutos',
    '1 hora',
    '1 hora 15 minutos',
    '1 hora 30 minutos',
    '1 hora 45 minutos',
    '2 horas',
    '2 hora 15 minutos',
    '2 hora 30 minutos',
    '2 hora 45 minutos',
    '3 horas',
    '3 hora 15 minutos',
    '3 hora 30 minutos',
    '3 hora 45 minutos',
    '4 horas',
    '4 hora 15 minutos',
    '4 hora 30 minutos',
    '4 hora 45 minutos'
  ])

  const meetingResult = ref(['programada', 'completada', 'reprogramada', 'no asistió', 'cancelada'])
  const { contacts, getContacts } = useContacts()
  const { getDeals, deals } = useDeals()
  const { getUsers } = useUsers()

  onMounted(async () => {
    textInput?.value?.focus()
    await getContacts()
    await getDeals()
    await getUsers()
  })

  const disabledTaskForm = computed(() => {
    return (
      (meeting.value.type === 'program' && meeting.value.title?.length < 1) ||
      !meeting.value.date ||
      !meeting.value.time ||
      !meeting.value.owner.id
    )
  })

  contacts.value = contacts.value.sort(function (a, b) {
    if (a.firstName < b.firstName) {
      return -1
    }
    if (a.firstName > b.firstName) {
      return 1
    }
    return 0
  })
</script>

<template>
  <div>
    <form
      v-if="showMeetingModal"
      class="fixed bottom-[20px] right-[20px] h-auto w-[650px] bg-white shadow-2xl"
      @submit.prevent="saveMeeting"
      @keydown.enter="saveMeeting">
      <!--  Header  -->
      <div class="flex min-w-fit items-center justify-between bg-indigo-800 py-2 px-4 text-white">
        <div class="flex items-center justify-center">
          <button
            v-if="!minimize"
            class="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-50"
            type="button"
            @click="minimize = true">
            <ChevronDownIcon class="w-6" />
          </button>
          <button
            v-else
            class="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-50"
            type="button"
            @click="minimize = false">
            <ChevronRightIcon class="w-6" />
          </button>
          <p class="font-semibold tracking-wider" v-if="meeting.type === 'program'">
            Programar reunión
          </p>
          <p class="font-semibold tracking-wider" v-else>Registrar reunión</p>
        </div>
        <button type="button" @click.prevent="closeMeetingModal">
          <XIcon class="h-6" />
        </button>
      </div>

      <!--  Content  -->
      <div v-show="!minimize">
        <input
          v-model="meeting.title"
          class="w-full p-4 outline-none"
          placeholder="Título de la reunión"
          type="text"
          ref="textInput"
          v-if="meeting.type === 'program'" />
        <div v-else class="flex w-full space-x-4 p-4">
          <div class="w-full">
            <div class="text-xs text-slate-600">Asistentes</div>
            <UISelectBox
              v-model:modelValue="meeting.duration"
              :options="duration"
              class="mt-2 w-full"
              type="array" />
          </div>
          <div class="w-full">
            <div class="text-xs text-slate-600">Resultado de la reunión</div>
            <UISelectBox
              v-model:modelValue="meeting.result"
              :options="meetingResult"
              class="mt-2 w-full"
              type="array" />
          </div>
        </div>
        <div class="flex items-start space-x-10 p-4">
          <div class="w-40">
            <div class="text-xs text-slate-600">Fecha</div>
            <input v-model="meeting.date" class="w-full py-2 text-cyan-600" type="date" />
          </div>
          <div class="w-max">
            <div class="text-xs text-slate-600">Hora</div>
            <input v-model="meeting.time" class="w-full py-2 text-cyan-600" type="time" />
          </div>
          <div class="w-full">
            <div class="text-xs text-slate-600">Duración</div>
            <UISelectBox
              v-model:modelValue="meeting.duration"
              :options="duration"
              class="mt-2 w-full"
              type="array" />
          </div>
        </div>

        <hr class="mx-4" />

        <textarea
          v-model="meeting.description"
          class="w-full p-4 focus:outline-none"
          :placeholder="
            meeting.type === 'program'
              ? 'Envíales una descripción a los asistentes'
              : 'Describe la reunión'
          "
          rows="3" />

        <!-- showAssociations -->
        <div
          v-if="showAssociations"
          class="absolute bottom-20 z-50 flex h-auto w-full space-x-4 bg-white p-4">
          <div class="w-full">
            <div class="text-xs text-cyan-700">Contacto</div>
            <UISelectBox
              v-model:modelValue="meeting.contact"
              :options="contacts"
              class="mt-2"
              type="user" />
          </div>
          <div class="w-full">
            <div class="text-xs text-cyan-700">Negocio</div>
            <UISelectBox v-model:modelValue="meeting.deal" :options="deals" class="mt-2" />
          </div>
        </div>
        <!--  Footer  -->
        <hr />
        <div class="flex justify-between p-4">
          <UIButton :active="!disabledTaskForm" :disabled="disabledTaskForm" type="submit">
            {{ !isEditing ? 'Guardar Tarea' : 'Actualizar Tarea' }}
          </UIButton>

          <button
            :class="
              disabledTaskForm
                ? 'cursor-not-allowed opacity-50'
                : 'border-orange-500 bg-white text-orange-500'
            "
            :disabled="disabledTaskForm"
            class="w-h-auto h-10 rounded border py-2 px-6 text-sm"
            type="button"
            @click="showAssociations = !showAssociations">
            Asociaciones
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

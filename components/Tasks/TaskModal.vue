<script lang="ts" setup>
  import { computed, onMounted } from '#imports'
  import { ChevronDownIcon, ChevronRightIcon, XIcon } from '@heroicons/vue/outline'
  import useTasks from '@/composables/useTasks'
  import useContacts from '@/composables/useContacts'
  import useDeals from '@/composables/useDeals'
  import useUsers from '@/composables/useUsers'

  const { task, showTaskModal, isEditing, minimize, showAssociations, saveTask, closeTaskModal } =
    useTasks()

  const textInput = ref(null)

  onMounted(() => {
    textInput?.value?.focus()
  })

  let { contacts, getContacts } = useContacts()

  const { getDeals, deals } = useDeals()
  const { getUsers, users } = useUsers()

  onMounted(async () => {
    await getContacts()
    await getDeals()
    await getUsers()
  })

  const disabledTaskForm = computed(() => {
    return (
      task.value.text.length < 1 || !task.value.date || !task.value.time || !task.value.owner.id
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
      v-if="showTaskModal && task.type !== 'note'"
      class="fixed bottom-[20px] right-[20px] h-auto w-[650px] bg-white shadow-2xl"
      @submit.prevent="saveTask"
      @keydown.enter="saveTask">
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
          <p class="font-semibold tracking-wider">Tarea</p>
        </div>
        <button type="button" @click.prevent="closeTaskModal">
          <XIcon class="h-6" />
        </button>
      </div>

      <!--  Content  -->
      <div v-show="!minimize">
        <input
          v-model="task.text"
          class="w-full p-4 outline-none"
          placeholder="Ingresa tu tarea"
          type="text"
          ref="textInput" />
        <div class="flex items-start space-x-10 p-4">
          <div class="w-40">
            <div class="text-xs text-slate-600">Fecha de vencimiento</div>
            <input v-model="task.date" class="w-full py-2 text-cyan-600" type="date" />
          </div>
          <div class="w-max">
            <div class="text-xs text-slate-600">Hora</div>
            <input v-model="task.time" class="w-full py-2 text-cyan-600" type="time" />
          </div>
        </div>

        <hr class="mx-4" />

        <div class="flex items-center space-x-8 p-4">
          <div class="w-32">
            <div class="text-xs text-slate-600">Tipo</div>
            <select v-model="task.type" class="min-w-fit py-2 text-cyan-600">
              <option value="call">Llamada</option>
              <option value="email">Correo</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div class="w-32">
            <div class="text-xs text-slate-600">Prioridad</div>
            <select v-model="task.priority" class="min-w-fit py-2 text-cyan-600">
              <option value="null">Ninguno</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div class="w-60">
            <div class="text-xs text-slate-600">Asignado a</div>
            <UISelectBox
              v-model:modelValue="task.owner"
              :options="users"
              class="mt-2 w-full"
              type="user" />
          </div>
        </div>

        <hr class="mx-4" />

        <textarea
          v-model="task.note"
          class="w-full p-4 focus:outline-none"
          placeholder="Empieza a escribir una nota...."
          rows="3" />

        <!-- showAssociations -->
        <div
          v-if="showAssociations"
          class="absolute bottom-20 z-50 flex h-auto w-full space-x-4 bg-white p-4">
          <div class="w-full">
            <div class="text-xs text-cyan-700">Contacto</div>
            <UISelectBox
              v-model:modelValue="task.contact"
              :options="contacts"
              class="mt-2"
              type="user" />
          </div>
          <div class="w-full">
            <div class="text-xs text-cyan-700">Negocio</div>
            <UISelectBox v-model:modelValue="task.deal" :options="deals" class="mt-2" />
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

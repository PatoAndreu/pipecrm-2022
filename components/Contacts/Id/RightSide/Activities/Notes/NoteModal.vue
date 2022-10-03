<script lang="ts" setup>
import { ChevronDownIcon, ChevronRightIcon, XIcon } from "@heroicons/vue/outline"
import useContacts from "@/composables/useContacts"
import useDeals from "@/composables/useDeals"
import { onMounted, watch } from "#imports"

const {
  note,
  showNoteModal,
  isEditing,
  disabledNoteForm,
  showAssociations,
  minimize,
  saveNote,
  closeNoteModal,
} = useNotes()

let { contacts, getContacts } = useContacts()

const { getDeals, deals } = useDeals()

await getDeals()
await getContacts()

contacts.value = contacts.value.sort(function (a, b) {
  if (a.firstName < b.firstName) {
    return -1
  }
  if (a.firstName > b.firstName) {
    return 1
  }
  return 0
})

watch(
  () => [disabledNoteForm.value],
  () => {
    if (disabledNoteForm.value) {
      showAssociations.value = !disabledNoteForm.value
    }
  }
)
</script>

<template>
  <div>
    <form
      v-if="showNoteModal"
      class="fixed bottom-2 left-1/2 mr-10 h-auto w-[650px] bg-white shadow-2xl"
      @submit.prevent="saveNote">
      <!--  Header  -->
      <div class="flex w-full items-center justify-between bg-indigo-800 py-2 px-4 text-white">
        <div class="flex items-center justify-center">
          <button
            v-if="!minimize"
            class="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-50"
            @click="minimize = true">
            <ChevronDownIcon class="w-6" />
          </button>
          <button
            v-else
            class="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-50"
            @click="minimize = false">
            <ChevronRightIcon class="w-6" />
          </button>
          <p class="font-semibold tracking-wider">Nota</p>
        </div>
        <button @click.prevent="closeNoteModal">
          <XIcon class="h-6" />
        </button>
      </div>
      <!--  Content  -->
      <div v-if="!minimize">
        <textarea
          v-model="note.text"
          class="w-full p-4 focus:outline-none"
          placeholder="Empieza a escribir una nota...."
          rows="6" />
        <!-- showAssociations -->
        <div
          v-if="showAssociations"
          class="absolute bottom-20 z-50 flex h-auto w-full space-x-4 bg-white p-4">
          <div class="w-full">
            <div class="text-xs text-cyan-700">Contacto</div>
            <UISelectBox
              v-model:modelValue="note.contact"
              :options="contacts"
              class="mt-2"
              type="user" />
          </div>
          <div class="w-full">
            <div class="text-xs text-cyan-700">Negocio</div>
            <UISelectBox v-model:modelValue="note.deal" :options="deals" class="mt-2" />
          </div>
        </div>
        <!--  Footer  -->
        <hr />
        <div class="flex justify-between p-4">
          <UIButton :active="!disabledNoteForm" :disabled="disabledNoteForm" type="submit">
            {{ !isEditing ? "Guardar Nota" : "Actualizar Nota" }}
          </UIButton>

          <button
            :class="
              disabledNoteForm
                ? 'cursor-not-allowed opacity-50'
                : 'border-orange-500 bg-white text-orange-500'
            "
            :disabled="disabledNoteForm"
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

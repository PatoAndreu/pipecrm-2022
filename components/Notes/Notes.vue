<script lang="ts" setup>
  import useContacts from '@/composables/useContacts'
  import Note from '@/components/Notes/Note.vue'

  const { pinnedNotes, unpinnedNotes, addNote, getNotesByContact } = useNotes()

  const { contact } = useContacts()

  await getNotesByContact(contact.value.id)
</script>

<template>
  <div class="p-2 text-slate-500">
    <div class="flex justify-center py-4">
      <UIButton :active="true" type="submit" @click="addNote(contact)"> Crear Nota </UIButton>
    </div>
    <div v-auto-animate>
      <div v-if="pinnedNotes?.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal text-slate-500">Ancladas</p>
        <hr />
        <Note v-for="note in pinnedNotes" :key="note.id" :note="note" />
      </div>

      <div v-if="unpinnedNotes?.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal text-slate-500">Pasadas</p>
        <hr />
        <Note v-for="note in unpinnedNotes" :key="note.id" :note="note" />
      </div>
    </div>
  </div>
</template>

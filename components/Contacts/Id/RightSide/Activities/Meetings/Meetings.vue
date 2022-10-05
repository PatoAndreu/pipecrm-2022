<script setup lang="ts">
  import useContacts from '@/composables/useContacts'
  import useMeetings, { useMeetingsComponents } from '@/composables/useMeetings'

  const { getMeetingsByContact, pinnedMeetings, unpinnedMeetings, addMeeting } = useMeetings()
  const { contact } = useContacts()
  const { Meeting } = useMeetingsComponents()

  await getMeetingsByContact(contact.value.id)
</script>

<template>
  <div class="p-2 text-slate-500">
    <div class="flex justify-center space-x-4 py-4">
      <UIButton :active="true" type="submit" @click="addMeeting('register', contact)">
        Registrar Reunión
      </UIButton>
      <UIButton :active="true" type="submit" @click="addMeeting('program', contact)">
        Crear Reunión
      </UIButton>
    </div>

    <div v-auto-animate>
      <div v-if="pinnedMeetings.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal text-slate-500">Ancladas</p>
        <hr />
        <Meeting v-for="meeting in pinnedMeetings" :key="meeting.id" :meeting="meeting" />
      </div>

      <div v-if="unpinnedMeetings.length > 0" class="activities" v-auto-animate>
        <p class="py-4 font-normal text-slate-500">Pasadas</p>
        <hr />
        <Meeting v-for="meeting in unpinnedMeetings" :key="meeting.id" :meeting="meeting" />
      </div>
    </div>
  </div>
</template>

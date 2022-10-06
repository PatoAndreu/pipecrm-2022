<script setup lang="ts">
  import useContacts from '@/composables/useContacts'
  import useMeetings from '@/composables/useMeetings'
  import Meeting from '@/components/Meetings/Meeting.vue'
  const { getMeetingsByContact, pinnedMeetings, unpinnedMeetings, addMeeting } = useMeetings()
  const { contact } = useContacts()

  await getMeetingsByContact(contact.value.id)
</script>

<template>
  <div class="p-2 text-slate-500">
    <div class="flex justify-center space-x-4 py-4">
      <UIButton @click="addMeeting('register', contact)"> Registrar Reunión </UIButton>
      <UIButton :active="true" @click="addMeeting('program', contact)">
        Programar Reunión
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

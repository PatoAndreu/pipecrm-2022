<script setup lang="ts">
const { activityModalOpen, filteredNotes, setActivity } = useActivities();

</script>

<template>
  <div class="flex justify-center py-4">
    <UIButton type="submit" :active="true" @click="activityModalOpen = true">
      Crear Nota
    </UIButton>
  </div>

  <p class="font-normal py-4">Septiembre 2022</p>
  <ContactsInfoRightSideActivitiesItem
    v-for="activity in filteredNotes"
    :key="activity.id"
    :note="true"
    :activity="activity"
    @click="setActivity(activity)"
  />

</template>
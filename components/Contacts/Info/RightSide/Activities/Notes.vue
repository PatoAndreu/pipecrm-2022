<script setup lang="ts">
const { noteModalOpen } = useActivities();
</script>

<template>
  <div class="flex justify-center py-4">
    <UIButton type="submit" :active="true" @click="noteModalOpen = true">
      Crear Nota
    </UIButton>
  </div>

  <p class="font-normal py-4">Septiembre 2022</p>
  <ContactsInfoRightSideActivitiesItem :note="true" />

</template>
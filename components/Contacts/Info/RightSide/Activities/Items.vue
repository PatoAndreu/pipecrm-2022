<script setup lang="ts">
const { filterActivities } = useActivities();
console.log(filterActivities);
</script>

<template>
  <div class="p-2 text-slate-500">
    <p class="font-normal py-4">Anclados</p>
    <ContactsInfoRightSideActivitiesItem  v-for="activity in filterActivities"
                                          :key="activity.id"
                                          :activity="activity" />
    <p class="font-normal py-4">Próximos</p>
    <ContactsInfoRightSideActivitiesItem />
    <p class="font-normal py-4">Pasados</p>
    <ContactsInfoRightSideActivitiesItem />
  </div>
</template>
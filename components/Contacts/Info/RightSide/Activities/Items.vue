<script setup lang="ts">

</script>

<template>
  <div class="p-2 text-slate-500">
    <p class="font-normal py-4">Anclados</p>
    <ContactsInfoRightSideActivitiesItem :pinned="true"/>
    <p class="font-normal py-4">Próximos</p>
    <ContactsInfoRightSideActivitiesItem />
    <p class="font-normal py-4">Pasados</p>
    <ContactsInfoRightSideActivitiesItem />

  </div>
</template>
<script lang="ts" setup>

const { loadContact, contact, activeTab } = useContacts();

const route = useRoute();

onBeforeMount(async () => {
  await loadContact(Number(route.params.id));
});

onUpdated(() => {
  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
  });
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-10" v-if="contact.firstName">
    <!--  Header  -->
    <ContactsInfoRightSideHeader />

    <!--  Contenido central  -->
    <div class="flex mt-6 pb-10">

      <!--  Panel izquierdo  -->
      <div class="w-[400px] h-full space-y-2">
        <ContactsInfoLeftSideContactInfo />
        <ContactsInfoLeftSideCompanyInfo />
        <ContactsInfoLeftSideDealsInfo />
        <ContactsInfoLeftSideFollowersInfo />
      </div>

      <!--  Panel derecho  -->
      <div class="w-full h-full ml-4">
        <ContactsInfoRightSideActivitiesMenu />
        <ContactsInfoRightSideActivitiesItems v-if="activeTab === 'activity'"/>
        <ContactsInfoRightSideActivitiesNotes v-if="activeTab === 'notes'"/>
        <ContactsInfoRightSideActivitiesTasks v-if="activeTab === 'tasks'"/>
      </div>
    </div>
    <ContactsInfoRightSideActivitiesNoteModal />
  </div>
</template>


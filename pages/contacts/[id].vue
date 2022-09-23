<script lang="ts" setup>

const { loadContact, contact } = useContacts();

const { activeTab, activities } = useActivities();

const route = useRoute();

await loadContact(Number(route.params.id));

onUpdated(() => {
  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
  });
});

onUnmounted(() => {
  activeTab.value = "activities";
});

</script>

<template>
  <div class="max-w-7xl mx-auto px-10">

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

        <Suspense>
          <ContactsInfoRightSideActivitiesAll v-if="activeTab === 'activities'" />
          <template #fallback>
            Loading...
          </template>
        </Suspense>

        <Suspense>
          <ContactsInfoRightSideActivitiesNotes v-if="activeTab === 'notes'" />
          <template #fallback>
            Loading...
          </template>
        </Suspense>
        <ContactsInfoRightSideActivitiesTasks v-if="activeTab === 'tasks'" />
      </div>

    </div>
    <Teleport to="#teleport">
      <ContactsInfoRightSideActivitiesNotesNoteModal />
    </Teleport>
  </div>
</template>


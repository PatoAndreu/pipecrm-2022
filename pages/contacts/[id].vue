<script lang="ts" setup>
import { onUnmounted, onUpdated, useActivitiesComponents, useHead, useRoute } from "#imports";
import useContacts, { useContactsComponents } from "@/composables/useContacts";
import useActivities from "@/composables/useActivities";

const { loadContact, loadContacts, contact } = useContacts();

const { Header, ContactInfo, CompanyInfo, DealsInfo, FollowersInfo } = useContactsComponents();

const { getActivityByContact, activeTab, activities } = useActivities();

const { All, ActivityMenu, Tasks, TaskModal, Notes, NoteModal } = useActivitiesComponents();

const route = useRoute();

await loadContact(Number(route.params.id));
await loadContacts();

onUpdated(() => {
  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
  });
});

onUnmounted(async () => {
  activeTab.value = "activities";
  await getActivityByContact(contact);

});
// const { pending, data } = useLazyAsyncData('contacts', () => $fetch('http://pipecrm-api.test/api/contacts'))
//
// console.log(pending.value);

</script>

<template>
  <div class="max-w-7xl mx-auto px-10">

    <!--  Header  -->
    <Header />

    <!--  Contenido central  -->
    <div class="flex mt-6 pb-10">

      <!--  Panel izquierdo  -->
      <div class="w-[400px] h-full space-y-2">
        <ContactInfo />
        <CompanyInfo />
        <DealsInfo />
        <FollowersInfo />
      </div>

      <!--  Panel derecho  -->
      <div class="w-full h-full ml-4">
        <ActivityMenu />

        <Suspense>
          <All v-if="activeTab === 'activities'" />
          <template #fallback>
            Loading...
          </template>
        </Suspense>

        <Suspense>
          <Notes v-if="activeTab === 'notes'" />
          <template #fallback>
            Loading...
          </template>
        </Suspense>
        <Tasks v-if="activeTab === 'tasks'" />
      </div>

    </div>
    <Teleport to="#NoteModal">
      <NoteModal />
    </Teleport>

    <Teleport to="#TaskModal">
      <TaskModal />
    </Teleport>
  </div>
</template>


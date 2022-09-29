<script lang="ts" setup>
import { onUnmounted, onUpdated, useActivitiesComponents, useHead, useRoute } from "#imports";
import useContacts, { useContactsComponents } from "@/composables/useContacts";
import useActivities from "@/composables/useActivities";

const { getContact, contact } = useContacts();

const { Header, ContactInfo, CompanyInfo, DealsInfo, FollowersInfo } = useContactsComponents();

const { getActivityByContact, activeTab, activities } = useActivities();

const { All, ActivityMenu, Tasks, Notes } = useActivitiesComponents();

const route = useRoute();

await getContact(Number(route.params.id));

await getActivityByContact(contact.value.id);

onUpdated(() => {
  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
  });
});

onUnmounted(async () => {
  activeTab.value = "activities";
});

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
        <All v-if="activeTab === 'activities'" />
        <div v-auto-animate>
          <Notes v-if="activeTab === 'notes'" />
          <Tasks v-if="activeTab === 'tasks'" />
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.activities > .activity-container .activity-icon .line {
  height: 100%;
}

.activities > .activity-container:last-child > .activity-icon .line {
  height: 0;
}
</style>

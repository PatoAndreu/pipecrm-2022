<script lang="ts" setup>
import { onUnmounted, onUpdated, useHead, useRoute } from "#imports";
import useContacts, { useContactsComponents } from "@/composables/useContacts";
import useTasks, { useActivitiesComponents, useTasksComponents } from "@/composables/useTasks";

const { getContact, contact } = useContacts();

const { Header, ContactInfo, CompanyInfo, DealsInfo, FollowersInfo } = useContactsComponents();

const { getTasksByContact, activeTab, tasks } = useTasks();

const { Tasks, Notes } = useTasksComponents();

const { All, ActivityMenu } = useActivitiesComponents();

const route = useRoute();

await getContact(Number(route.params.id));

await getTasksByContact(contact.value.id);

onUpdated(() => {
  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
  });
});

onUnmounted(async () => {
  activeTab.value = "tasks";
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
        <All v-if="activeTab === 'activity'" />
        <div v-auto-animate>
<!--          <Notes v-if="activeTab === 'notes'" />-->
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

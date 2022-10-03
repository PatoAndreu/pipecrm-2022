<script lang="ts" setup>
import { onUnmounted, onUpdated, useHead, useRoute } from "#imports"
import useContacts, { useContactsComponents } from "@/composables/useContacts"
import { useTasksComponents } from "@/composables/useTasks"

const { getContact, contact } = useContacts()

const { activeTab, getActivityByContact } = useActivity()

const { Header, ContactInfo, CompanyInfo, DealsInfo, FollowersInfo } =
  useContactsComponents()

const { All, ActivityMenu } = useActivitiesComponents()

const { Tasks } = useTasksComponents()
const { Notes } = useNotesComponents()

const route = useRoute()

await getContact(Number(route.params.id))

onUpdated(() => {
  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
  })
})

onUnmounted(async () => {
  activeTab.value = "activity"
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-10">
    <!--  Header  -->
    <Header />

    <!--  Contenido central  -->
    <div class="mt-6 flex pb-10">
      <!--  Panel izquierdo  -->
      <div class="h-full w-[400px] space-y-2">
        <Suspense timeout="0">
          <ContactInfo />
          <template #fallback> <UILoading /> </template>
        </Suspense>

        <Suspense timeout="0">
          <CompanyInfo />
          <template #fallback> <UILoading /> </template>
        </Suspense>

        <DealsInfo />
        <FollowersInfo />
      </div>

      <!--  Panel derecho  -->
      <div class="ml-4 h-full w-full">
        <ActivityMenu />
        <div>
          <Suspense timeout="0">
            <All v-if="activeTab === 'activity'" />
            <template #fallback> <UILoading /> </template>
          </Suspense>

          <Suspense timeout="0">
            <Notes v-if="activeTab === 'notes'" />
            <template #fallback> <UILoading /> </template>
          </Suspense>

          <Suspense timeout="0">
            <Tasks v-if="activeTab === 'tasks'" />
            <template #fallback> <UILoading /> </template>
          </Suspense>
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

<script lang="ts" setup>
  import { onUnmounted, onUpdated, useHead, useRoute } from '#imports'
  import useContacts from '@/composables/useContacts'

  import Header from '@/components/Contacts/Id/Header.vue'
  import Notes from '@/components/Notes/Notes.vue'
  import Tasks from '@/components/Tasks/Tasks.vue'
  import Meetings from '@/components/Meetings/Meetings.vue'
  import ContactInfo from '@/components/Contacts/Id/ContactInfo.vue'
  import CompanyInfo from '@/components/Contacts/Id/CompanyInfo.vue'
  import DealsInfo from '@/components/Contacts/Id/DealsInfo.vue'
  import FollowersInfo from '@/components/Contacts/Id/FollowersInfo.vue'
  import Activity from '@/components/Contacts/Id/Activity.vue'
  import ActivityMenu from '@/components/Contacts/Id/Menu.vue'

  const { getContact, contact } = useContacts()

  const { activeTab } = useActivity()

  const route = useRoute()

  await getContact(Number(route.params.id))

  onUpdated(() => {
    useHead({
      title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
    })
  })

  onUnmounted(async () => {
    activeTab.value = 'activity'
  })
</script>

<template>
  <div class="mx-auto md:px-10 lg:container">
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

        <Suspense timeout="0">
          <DealsInfo />
          <template #fallback> <UILoading /> </template>
        </Suspense>

        <FollowersInfo />
      </div>

      <!--  Panel derecho  -->
      <div class="ml-4 h-full w-full">
        <ActivityMenu />
        <div>
          <Suspense timeout="0">
            <Activity v-if="activeTab === 'activity'" />
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

          <Suspense timeout="0">
            <Meetings v-if="activeTab === 'meetings'" />
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

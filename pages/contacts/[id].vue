<template>
  <div class="max-w-7xl mx-auto px-10" v-if="!pending && contact.firstName">
    <!--  Header  -->
    <ContactsDetailHeader />

    <!--  Contenido central  -->
    <div class="flex mt-6">

      <!--  Panel izquierdo  -->
      <div class="w-[400px] h-full">
        <ContactsDetailInfo />
      </div>

      <!--  Panel derecho  -->
      <div class="w-full border h-full ml-4">
        <UIDropDownMenu2>
          <li class="px-6 py-2 hover:bg-gray-100 border-b">menu list 1</li>
          <li class="px-6 py-2 hover:bg-gray-100 border-b">menu list 1 dfdfdf</li>
        </UIDropDownMenu2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useContacts } from "@/composables/useContacts";

const { loadContact, contact, pending } = useContacts();

const route = useRoute();

onMounted(async () => {

  await loadContact(Number(route.params.id));

  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName}`
  });

});
</script>
<style scoped>
.sd{
  margin: auto;
}
</style>

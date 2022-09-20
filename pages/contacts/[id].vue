<script lang="ts" setup>

const { loadContact, contact } = useContacts();

const route = useRoute();

onBeforeMount(async () => {
  await loadContact(Number(route.params.id));
});

onUpdated(() => {
  useHead({
    title: `${contact.value.firstName} ${contact.value.lastName} | Información del contacto`
  });
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-10" v-if="contact.firstName">
    <!--  Header  -->
    <ContactsDetailHeader />

    <!--  Contenido central  -->
    <div class="flex mt-6">

      <!--  Panel izquierdo  -->
      <div class="w-[400px] h-full space-y-2">
        <ContactsDetailContactInfo />
        <ContactsDetailCompanyInfo />
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

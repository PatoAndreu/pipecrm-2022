<script setup lang="ts">
  import { XIcon } from '@heroicons/vue/outline'
  import { useContactsStore } from '@/stores/contactsStore'
  import useContacts from '@/composables/useContacts'
  import useUsers from '@/composables/useUsers'
  import { ref } from '@vue/reactivity'

  const contactStore = useContactsStore()

  const {
    showDrawer,
    isEditing,
    contact,
    contactStatus,
    contactLifeCycleStage,
    disabledFormContact,
    saveContact,
    updateContact,
    getContacts,
    resetContact
  } = useContacts()

  const { users, getUsers } = useUsers()

  let errorsMessages = ref<string[]>([])

  await getUsers()

  contactStore.$subscribe(
    (mutation, state) => {
      if (state.showDrawer) errorsMessages.value = []
    },
    { detached: true }
  )

  const saveOrUpdateContact = async () => {
    if (!isEditing.value) afterPost(await saveContact())
    else afterPost(await updateContact(contact.value))
  }

  const afterPost = (res) => {
    const {
      data: { errors },
      response: { status }
    }: any = res

    if (status === 200) {
      isEditing.value = false
      showDrawer.value = false
      getContacts()
      resetContact()
    } else {
      errorsMessages.value = errors
    }
  }
</script>
<template>
  <Transition :duration="550" name="drawer" appear>
    <div
      v-if="showDrawer"
      class="inner fixed right-0 top-12 z-10 h-auto min-h-screen w-[500px] bg-white shadow-xl">
      <!-- Header -->
      <div class="flex h-16 items-center justify-between bg-cyan-500">
        <div class="pl-4 text-lg font-semibold text-white">
          {{ !isEditing ? 'Agregar' : 'Actualizar' }}
          contacto
        </div>
        <XIcon
          class="mr-4 h-6 cursor-pointer text-white transition-all hover:text-slate-300"
          @click="showDrawer = false" />
      </div>

      <!-- Formulario -->
      <div
        v-for="(error, key) in errorsMessages"
        :key="key"
        class="mx-auto my-4 w-[90%] rounded bg-red-400 p-4 text-white">
        <div v-for="(e, k) in error" :key="k" class="my-2">
          <p>- {{ e }}</p>
        </div>
      </div>
      <form @submit.prevent="saveOrUpdateContact">
        <div class="h-screen overflow-scroll p-10 text-[14px] text-slate-600">
          <div class="mb-6">
            <label class="mb-2 block">Correo</label>
            <input
              type="email"
              class="h-10 w-full rounded-sm border border-slate-200 bg-slate-100 p-2"
              v-model="contact.email" />
          </div>

          <div class="mb-6">
            <label class="mb-2 block">Nombre</label>
            <input
              type="text"
              class="h-10 w-full rounded-sm border border-slate-200 bg-slate-100 p-2"
              v-model="contact.firstName" />
          </div>

          <div class="mb-6">
            <label class="mb-2 block">Apellido</label>
            <input
              type="text"
              class="h-10 w-full rounded-sm border border-slate-200 bg-slate-100 p-2"
              v-model="contact.lastName" />
          </div>

          <div class="mb-6">
            <label class="mb-2 block">Número de teléfono (opcional)</label>
            <input
              type="text"
              class="h-10 w-full rounded-sm border border-slate-200 bg-slate-100 p-2"
              v-model="contact.mobilePhoneNumber" />
          </div>

          <div class="mb-6">
            <UISelectBox
              :options="users"
              field="firstName"
              type="user"
              v-model:modelValue="contact.owner"
              :disabled="disabledFormContact">
              <template #label>
                <label class="mb-2 block">Propietario del contacto (opcional)</label>
              </template>
            </UISelectBox>
          </div>

          <div class="mb-6">
            <UISelectBox
              :options="contactLifeCycleStage"
              v-model:modelValue="contact.contactLifeCycleStage"
              :disabled="disabledFormContact">
              <template #label>
                <label class="mb-2 block">Etapa del ciclo de vida (opcional)</label>
              </template>
            </UISelectBox>
          </div>

          <div class="mb-6">
            <UISelectBox
              :options="contactStatus"
              v-model:modelValue="contact.contactStatus"
              :disabled="disabledFormContact">
              <template #label>
                <label class="mb-2 block">Estado del lead (opcional)</label>
              </template>
            </UISelectBox>
          </div>

          <div class="h-32"></div>
        </div>

        <!-- Footer -->
        <div
          class="fixed bottom-0 flex w-[500px] space-x-5 bg-slate-100 p-4 text-sm"
          :class="!isEditing ? ' justify-center' : 'justify-between'">
          <UIButton type="button" @click="showDrawer = false"> Cancelar </UIButton>

          <UIButton
            type="button"
            @click="showDrawer = false"
            :disabled="disabledFormContact"
            v-if="!isEditing">
            Crear y agregar otro
          </UIButton>

          <UIButton type="submit" :active="!disabledFormContact" :disabled="disabledFormContact">
            {{ !isEditing ? 'Crear' : 'Actualizar' }}
          </UIButton>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { ChevronDownIcon, DotsHorizontalIcon, UserIcon } from '@heroicons/vue/outline'

  const { contact, updateContact, getContact, deleteContact } = useContacts()

  const { users, getUsers, resetUser } = useUsers()

  const router = useRouter()

  const show = ref(false)

  onBeforeMount(async () => {
    await getUsers()
  })

  const owner = ref({ ...contact.value.owner })

  const cancel = () => {
    show.value = false
    resetUser()
  }

  const transferOwnership = async () => {
    contact.value.owner = { ...owner.value }
    await updateContact(contact.value)
    await getContact(contact.value.id)
    show.value = false
  }

  const deleteContactLocal = async () => {
    if (
      confirm(
        `¿Esta seguro que desea eliminar a ${contact.value.firstName} ${contact.value.lastName} ?`
      ) == true
    ) {
      const res = await deleteContact()
      const {
        response: { status }
      }: any = res
      if (status === 200) {
        router.push({ path: '/contacts' })
      }
    }
  }
</script>

<template>
  <div class="mt-2 flex h-20 items-center justify-between rounded border border-slate-200 bg-white">
    <div>
      <div class="ml-4 flex items-center text-xl font-semibold text-cyan-600">
        <div>{{ contact.firstName }} {{ contact.lastName }}</div>
        <div
          class="ml-4 h-6 rounded-sm bg-green-500 px-2 text-[10px] uppercase leading-6 text-white"
          v-if="contact.contactLifeCycleStage?.name">
          {{ contact.contactLifeCycleStage.name }}
        </div>
      </div>
      <div class="pl-4 pt-1 text-sm text-cyan-600">{{ contact.email }}</div>
    </div>

    <div class="mr-4">
      <div class="flex">
        <div class="flex h-9 w-9 items-center justify-center rounded-full border bg-slate-100">
          <UserIcon class="h-5 text-cyan-600" />
        </div>
        <div class="ml-2">
          <div class="text-sm font-semibold text-cyan-600">
            <div v-if="contact.owner?.firstName">
              {{ contact.owner.firstName }}
              {{ contact.owner.lastName }}
            </div>
            <div v-else>Sin propietario</div>
          </div>
          <div class="text-xs text-slate-400">Propietario</div>
        </div>

        <button class="relative">
          <ChevronDownIcon
            class="ml-1 h-4 cursor-pointer text-cyan-600 hover:text-cyan-500"
            @click="show = true" />

          <div
            class="dropdown-container absolute top-full -right-4 mt-4 h-auto w-64 border bg-white py-2 px-3 shadow"
            v-if="show">
            <UISelectBox
              class="z-50 text-left text-sm group-focus:block"
              :options="users"
              v-model:modelValue="owner"
              type="user"
              :top="false">
              <template #label>
                <label class="block py-2">Transferir propiedad</label>
              </template>
            </UISelectBox>

            <div class="relative z-10 mt-6 flex h-auto w-auto justify-end px-4">
              <button
                class="mr-2 cursor-pointer rounded border bg-slate-100 py-2 px-3 text-sm hover:bg-slate-200"
                @click="cancel">
                Cancelar
              </button>
              <button
                class="cursor-pointer rounded border bg-green-600 py-2 px-3 text-sm text-white hover:bg-green-500"
                @click="transferOwnership">
                Guardar
              </button>
            </div>
          </div>
        </button>
        <button
          class="group relative ml-2 h-6 w-6 rounded border border-slate-300 text-slate-400 hover:bg-slate-100">
          <DotsHorizontalIcon class="mx-auto h-4 w-4" />
          <div
            class="dropdown-container absolute -right-4 mt-6 hidden h-40 w-72 rounded border bg-white text-left shadow-lg group-focus:block">
            <ul class="flex-row space-y-1 text-slate-700">
              <li
                class="mt-4 w-full py-2 pl-2 hover:bg-cyan-500 hover:text-white"
                @click="deleteContactLocal">
                Eliminar
              </li>
              <li class="w-full py-2 pl-2 hover:bg-cyan-500 hover:text-white">Fusionar</li>
            </ul>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  .dropdown-container:after {
    position: absolute;
    width: 20px;
    height: 20px;
    border-top: 1px solid #dedede;
    border-right: 0 solid red;
    border-bottom: 0 solid red;
    border-left: 1px solid #dedede;
    top: 14px;
    right: 5%;
    content: '';
    transform: rotate(45deg);
    margin-top: -25px;
    background: white;
  }

  .triangle {
    border-color: transparent transparent red transparent;
    border-style: solid;
    border-width: 0px 10px 10px 10px;
    height: 0px;
    width: 0px;
  }
</style>

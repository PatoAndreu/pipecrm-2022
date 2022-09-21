<script setup lang="ts">

import { ChevronDownIcon, DotsHorizontalIcon, UserIcon } from "@heroicons/vue/outline";

const { contact, updateContact, pending, deleteContact } = useContacts();

const { users, loadUsers, resetUser } = useUsers();

const router = useRouter();

const show = ref(false);

onBeforeMount(async () => {
  await loadUsers();
});

const owner = ref({ ...contact.value.owner });

const cancel = () => {
  show.value = false;
  resetUser();
};

const transferOwnership = async () => {
  contact.value.owner = { ...owner.value };
  await updateContact(contact.value);
  show.value = false;
};

const deleteContactLocal = async () => {

  if (confirm(`¿Esta seguro que desea eliminar a ${contact.value.firstName} ${contact.value.lastName} ?`) == true) {
    const res                           = await deleteContact();
    const { response: { status } }: any = res;
    if (status === 200) {
      router.push({ path: "/contacts" });
    }
  }

};
</script>

<template>
  <div class="mt-2 h-20 border border-slate-200 rounded flex items-center justify-between bg-white">

    <div>
      <div class="ml-4 text-cyan-600 font-semibold flex text-xl items-center">
        <div>{{ contact.firstName }} {{ contact.lastName }}</div>
        <div class="h-6 ml-4 bg-green-500 px-2 leading-6 rounded-sm text-white text-[10px] uppercase" v-if="contact.contactLifeCycleStage?.name">
          {{ contact.contactLifeCycleStage.name }}
        </div>
      </div>
      <div class="pl-4 pt-1 text-sm text-cyan-600">{{ contact.email }}</div>
    </div>

    <div class="mr-4">
      <div class="flex">
        <div class="rounded-full h-9 w-9 bg-slate-100 border flex justify-center items-center">
          <UserIcon class="h-5 text-cyan-600 " />
        </div>
        <div class="ml-2">
          <div class="text-cyan-600 text-sm text-cyan-600 font-semibold">
            <div v-if="contact.owner?.firstName">
              {{ contact.owner.firstName }}
              {{ contact.owner.lastName }}
            </div>
            <div v-else>Sin propietario</div>
          </div>
          <div class="text-xs text-slate-400">Propietario</div>
        </div>

        <button class="relative">
          <ChevronDownIcon class="h-4 ml-1 cursor-pointer hover:text-cyan-500 text-cyan-600 " @click="show = true" />

          <div class="dropdown-container h-auto w-64 border absolute shadow top-full right-0 bg-white mt-4 -right-4 py-2 px-3" v-if="show">

            <UISelectBox class=" text-sm text-left group-focus:block"
                         :options="users"
                         v-model:modelValue="owner"
                         type="user"
                         :top="false">
              <template #label>
                <label class="block py-2">Transferir propiedad</label>
              </template>
            </UISelectBox>

            <div class="w-auto h-auto flex justify-end pt-4 px-4">
              <div class="bg-slate-100 hover:bg-slate-200 py-2 px-3 rounded border text-sm mr-2" @click="cancel">
                Cancelar
              </div>
              <div class="bg-green-600 hover:bg-green-500 text-white py-2 px-3 rounded border text-sm" @click="transferOwnership">
                Guardar
              </div>
            </div>
          </div>
        </button>
        <button class="relative ml-2 h-6 w-6 border rounded border-slate-300 text-slate-400 hover:bg-slate-100 group">
          <DotsHorizontalIcon class="h-4 w-4 mx-auto" />
          <div class="dropdown-container absolute bg-white w-72 h-40 border rounded shadow-lg mt-6 -right-4 hidden group-focus:block text-left">
            <ul class="flex-row space-y-1 text-slate-700">
              <li class="w-full hover:bg-cyan-500 hover:text-white py-2 mt-4 pl-2" @click="deleteContactLocal">
                Eliminar
              </li>
              <li class="w-full hover:bg-cyan-500 hover:text-white py-2 pl-2">Fusionar</li>
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
  top: 15px;
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
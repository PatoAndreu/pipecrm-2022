<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core'

  const modal = ref(null)
  const { deleteModalOpen, deleteMessage, hideDeleteModal, confirmDeleteModal } = useUi()

  onClickOutside(modal, () => (deleteModalOpen.value = false))
</script>

<template>
  <Transition name="modal">
    <div
      class="modal-bg bg-[rgb(93, 106, 120, 0.9)] fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center"
      v-if="deleteModalOpen">
      <div class="-mt-[30%] rounded-md bg-[#f2545b] shadow-sm" ref="modal">
        <div class="flex h-24 items-center justify-center px-10 text-3xl text-white">
          Confirmación
        </div>
        <div class="bg-white px-10 pb-6">
          <div class="py-10 text-[#4F6E91]">{{ deleteMessage }}</div>
          <div class="flex justify-end space-x-4">
            <button
              class="rounded-md bg-[#f2545b] py-2 px-6 text-white hover:bg-[#ff5962]"
              @click="confirmDeleteModal">
              Eliminar
            </button>
            <button
              class="rounded-[3px] border border-[#cbd6e2] bg-[#EAF0F5] py-2 px-4 text-[#506e91] hover:bg-[#f5f8fa]"
              @click="hideDeleteModal">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
  .modal-bg {
    background-color: rgb(93, 106, 120, 0.9);
  }

  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.25s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }
</style>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core'

  const modal = ref(null)
  const {
    deleteModalOpen,
    deleteMessage,
    errorMessage,
    pending,
    cancelDeleteModal,
    confirmDeleteModal
  } = useUi()

  onClickOutside(modal, () => (deleteModalOpen.value = false))
</script>

<template>
  <transition name="modal-animation">
    <div
      class="modal-bg bg-[rgb(93, 106, 120, 0.9)] fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center"
      v-show="deleteModalOpen">
      <transition name="modal-animation-inner">
        <div v-if="deleteModalOpen" class="-mt-[30%] rounded-md bg-[#f2545b] shadow-sm" ref="modal">
          <div class="flex h-24 items-center justify-center px-10 text-3xl text-white">
            Confirmación
          </div>

          <div class="bg-white px-10 pb-6">
            <div class="py-10 text-center text-[#4F6E91]">{{ deleteMessage }}</div>
            <div
              class="mb-10 w-96 bg-[#f2545b] p-4 pb-4 text-center text-white"
              v-if="errorMessage">
              Existió un problema al intentar eliminar el registro, por favor actualice la ventana y
              vuelva a intentarlo.
            </div>
            <div class="mt-4 flex justify-end space-x-4">
              <button
                :class="pending ? 'cursor-not-allowed opacity-70' : ''"
                :disabled="pending"
                class="inline-flex items-center rounded-md bg-[#f2545b] py-2 px-6 text-white hover:bg-[#ff5962]"
                type="button"
                @click="confirmDeleteModal">
                <svg
                  v-show="pending"
                  class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"></path>
                </svg>
                {{ !pending ? 'Eliminar' : 'Eliminando...' }}
              </button>

              <button
                class="rounded-[3px] border border-[#cbd6e2] bg-[#EAF0F5] py-2 px-4 text-[#506e91] hover:bg-[#f5f8fa]"
                @click="cancelDeleteModal">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style>
  .modal-animation-enter-active,
  .modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  .modal-animation-enter-from,
  .modal-animation-leave-to {
    opacity: 0;
  }
  .modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  .modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  .modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  .modal-animation-inner-leave-to {
    transform: scale(0.8);
  }
</style>

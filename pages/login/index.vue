<template>
  <div class="h-screen max-w-md mx-auto p-4">
    <img src="/img/logo.png" class="max-h-12 mx-auto mt-4" alt="PipeCrm" />
    <form action="" class="mt-10">
      <div class="mb-6">
        <label class="block text-sm text-slate-500 mb-2">Dirección de correo</label>
        <input type="text" class="
            w-full
            h-10
            rounded-sm
            bg-slate-100
            border border-slate-200 p-2
          " />
      </div>

      <div class="mb-4">
        <label class="block text-sm text-slate-500 mb-2">Contraseña</label>
        <div v-if="!showPassword" class="text-xs text-cyan-600 font-semibold mb-2 cursor-pointer"
          @click="showPassword = true">
          Mostrar contraseña
        </div>
        <div v-if="showPassword" class="text-xs text-cyan-600 font-semibold mb-2 cursor-pointer"
          @click="showPassword = false">
          Ocultar contraseña
        </div>
        <input :type="!showPassword ? 'password' : 'text'" class="
            w-full
            h-10
            rounded-sm
            bg-slate-100
            border border-slate-200
            p-2
          " />
      </div>

      <div class="text-xs text-cyan-600 font-semibold mt-6">
        <NuxtLink to="/login/forgot"> Olvide mi contraseña </NuxtLink>
      </div>
      <NuxtLink to="/dashboard">
        <div class="
            mt-6
            w-full
            h-10
            bg-orange-500
            text-center
            leading-10
            text-white
            rounded-sm
          ">
          Iniciar sesión
        </div>
      </NuxtLink>
    </form>
    <div class="
        text-center
        font-light
        text-xs
        bottom-6
        absolute
        w-70
        mx-auto
        inset-x-0
        text-slate-500
      ">
      ©2022 PipeCrm, Inc. Todos los derechos reservados.
      <div class="h-2"></div>
      <a href="#" class="text-cyan-600 font-semibold">
        Política de Privacidad
        <ExternalLinkIcon class="h-4 text-cyan-600 inline" style="margin-top: -2px" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ExternalLinkIcon } from "@heroicons/vue/solid";

definePageMeta({
  layout: "guest",
});

useHead({
  title: "Inicio de sesión en PipeCrm",
});

const showPassword = ref(false);

</script>
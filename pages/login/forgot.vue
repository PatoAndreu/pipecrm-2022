<template>
  <div class="h-screen max-w-md mx-auto p-4">
    <img src="/img/logo.png" class="max-h-12 mx-auto mt-4" alt="PipeCrm" />
    <div class="text-center mt-8">
      <h1 class="font-bold text-3xl text-slate-600">
        Restablece tu contraseña
      </h1>
      <p class="text-sm font-light mt-4 text-slate-500">
        Introduce la dirección de correo electrónico en la que deseas recibir la
        información para restablecer la contraseña.
      </p>
    </div>
    <form action="" class="mt-10">
      <div class="mb-6">
        <label class="block text-sm text-slate-500 mb-2"
          >Dirección de correo</label
        >
        <input
          type="text"
          class="
            w-full
            h-10
            rounded-sm
            bg-slate-100
            border border-slate-200
            p-2
          "
        />
      </div>

      <div
        class="
          mt-6
          w-full
          h-10
          bg-orange-500
          text-center
          leading-10
          text-white
          rounded-sm
        "
      >
        Restablece tu contraseña
      </div>
    </form>

    <div class="text-center mt-4 text-sm text-slate-500">
      Volver a
      <nuxt-link to="/login" class="text-cyan-600 font-semibold">
        pipecrm.com/login
      </nuxt-link>
    </div>

    <div
      class="
        text-center
        font-light
        text-xs
        bottom-6
        fixed
        w-70
        mx-auto
        inset-x-0
        text-slate-500
      "
    >
      ©2022 PipeCrm, Inc. Todos los derechos reservados.
      <div class="h-2"></div>
      <a href="" class="text-cyan-600 font-semibold">
        Política de Privacidad
        <ExternalLinkIcon
          class="h-4 text-cyan-600 inline"
          style="margin-top: -2px"
        />
      </a>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Inicio de sesión en PipeCrm",
});

definePageMeta({
  layout: "guest",
});

import { ExternalLinkIcon } from "@heroicons/vue/solid";
</script>
import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'PipeCrm',
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    },
    transpile: ["@heroicons/vue"]
  },
  css: ["@/assets/css/main.css"],
  modules: [
    "@pinia/nuxt",
    '@nuxtjs/tailwindcss'
  ],
  plugins: [
    "@/plugins/dayjs.ts"
  ],
  buildModules: [
    'floating-vue/nuxt',
  ],

});

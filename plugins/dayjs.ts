import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/es.js'
dayjs.locale('es')

import localizedFormat from 'dayjs/plugin/localizedFormat.js'

dayjs.extend(localizedFormat)

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(relativeTime)
  nuxtApp.provide('dayjs', dayjs)
})
declare module '#app' {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date ?: dayjs.ConfigType):dayjs.Dayjs
  }
}
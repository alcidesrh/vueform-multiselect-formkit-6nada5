import VueMultiselect from '@vueform/multiselect'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VueMultiselect", VueMultiselect)
})

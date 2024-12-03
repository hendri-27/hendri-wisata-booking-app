import { type NuxtPage } from '@nuxt/schema'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/',
    head: {
      link: [
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css2?family=Indie+Flower&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
          as: 'style',
          onload: "this.onload=null;this.rel='stylesheet'",
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      restApiBase: process.env.NUXT_PUBLIC_BASE_REST_API,
      restApiLocation: process.env.NUXT_PUBLIC_REST_URL_LOCATION,
      restApiProperty: process.env.NUXT_PUBLIC_REST_URL_PROPERTY,
      restApiStay: process.env.NUXT_PUBLIC_REST_URL_STAY,
    }
  },

  ssr: false,

  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
  ],

  imports: {
    dirs: ['services', 'models']
  },

  pages: true,

  pinia: {
    storesDirs: ['./stores/**']
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  components: [
    '~/components', {
      path: '~/pages',
      pattern: '*/components/**',
      pathPrefix: false
    }
  ],

  hooks: {
    'pages:extend'(pages) {
      const pagesToRemove: NuxtPage[] = []
      pages.forEach((page) => {
        if (page.path.includes('components')) pagesToRemove.push(page)
      })
  
      pagesToRemove.forEach((page: NuxtPage) => {
        pages.splice(pages.indexOf(page), 1)
      })
    }
  },

  css: [
    '@/assets/css/global.css'
  ],

  compatibilityDate: '2024-11-01',
})
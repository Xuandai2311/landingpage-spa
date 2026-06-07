import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/landingpage-spa/' : '/',
  },

  // Register global CSS
  css: ['~/assets/css/main.css'],

  // Bypass Nuxt default PostCSS to prevent parser conflicts with Tailwind v4
  postcss: {
    plugins: {},
  },

  // Configure Tailwind CSS v4 Vite plugin
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'vi', iso: 'vi-VN', file: 'vi.json', name: 'Tiếng Việt' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ko', iso: 'ko-KR', file: 'ko.json', name: '한국어' }
    ],
    defaultLocale: 'vi',
    lazy: true,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'vi'
    }
  }
})

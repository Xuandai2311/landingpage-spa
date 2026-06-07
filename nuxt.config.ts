import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Force server restart to clear cached PostCSS styles
  
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
})

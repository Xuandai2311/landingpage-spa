import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Programmatically copy generated image assets into public directory
try {
  const srcGlow = '/home/xuandai/.gemini/antigravity/brain/2db7d8f2-ea8e-4361-867c-0fcedaed76e6/package_kglow_1780763719384.png'
  const srcLuxury = '/home/xuandai/.gemini/antigravity/brain/2db7d8f2-ea8e-4361-867c-0fcedaed76e6/package_luxury_1780763735208.png'
  const srcDeeptissue = '/home/xuandai/.gemini/antigravity/brain/2db7d8f2-ea8e-4361-867c-0fcedaed76e6/treatment_deeptissue_1780765007026.png'
  const srcFoot = '/home/xuandai/.gemini/antigravity/brain/2db7d8f2-ea8e-4361-867c-0fcedaed76e6/treatment_foot_1780765023654.png'
  
  const destDir = '/home/xuandai/landing-page-spa/public/images'
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  
  if (fs.existsSync(srcGlow)) {
    fs.copyFileSync(srcGlow, path.join(destDir, 'package_kglow.png'))
  }
  if (fs.existsSync(srcLuxury)) {
    fs.copyFileSync(srcLuxury, path.join(destDir, 'package_luxury.png'))
  }
  if (fs.existsSync(srcDeeptissue)) {
    fs.copyFileSync(srcDeeptissue, path.join(destDir, 'treatment_deeptissue.png'))
  }
  if (fs.existsSync(srcFoot)) {
    fs.copyFileSync(srcFoot, path.join(destDir, 'treatment_foot.png'))
  }
} catch (err) {
  console.error('Failed to copy assets:', err)
}

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

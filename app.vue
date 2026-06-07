<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  IconPhone, 
  IconMail, 
  IconMapPin, 
  IconMenu2, 
  IconX, 
  IconSun, 
  IconMoon, 
  IconChevronRight, 
  IconChevronLeft,
  IconCheck,
  IconCalendar,
  IconClock,
  IconUser,
  IconSparkles,
  IconShieldCheck,
  IconHeartHandshake,
  IconAward
} from '@tabler/icons-vue'

const { t, locale, locales, setLocale } = useI18n()

// === SEO & Metadata ===
useHead({
  title: () => t('seo.title'),
  meta: [
    { name: 'description', content: () => t('seo.description') },
    { name: 'keywords', content: () => t('seo.keywords') },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: () => t('seo.title') },
    { property: 'og:image', content: '/images/korean_spa_clinic.png' },
    { property: 'og:url', content: 'https://example.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => t('seo.title') },
    { name: 'twitter:description', content: () => t('seo.ogDescription') },
    { name: 'twitter:image', content: '/images/korean_spa_clinic.png' },
    { property: 'og:description', content: () => t('seo.ogDescription') }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap' }
  ]
})

// === Theme Configuration (Dark / Light) ===
const darkTheme = ref(false)

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value
  localStorage.setItem('theme', darkTheme.value ? 'dark' : 'light')
}

// === Interactive Menu & Selector States ===
const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// === Static Content (Packages & Treatments) ===
const packages = [
  {
    price: '$145',
    title: 'Gói Trị Liệu Thải Độc & Body Scrub',
    duration: 'Tổng cộng 90 phút',
    description: 'Tẩy tế bào chết toàn thân tỉ mỉ kiểu Hàn Quốc loại bỏ da chết sần sùi - Liệu pháp massage tinh dầu Aroma phục hồi cơ thể sâu sắc.',
    image: '/images/package_aroma.png'
  },
  {
    price: '$165',
    title: 'Gói Chăm Sóc Da Mặt K-Glow & Spa',
    duration: 'Tổng cộng 90 phút',
    description: 'Liệu trình làm sạch sâu và cấp ẩm da mặt K-Glow giúp sáng mịn căng bóng - Massage body đá nóng trị liệu xua tan mệt mỏi.',
    image: '/images/package_kglow.png'
  },
  {
    price: '$225',
    image: '/images/package_luxury.png'
  }
]

// Computed translations for packages
const packagesI18n = computed(() => {
  return packages.map((p, i) => ({
    price: p.price,
    title: t(`packages.${i}.title`),
    duration: t(`packages.${i}.duration`),
    description: t(`packages.${i}.description`),
    image: p.image,
  }))
})

const treatments = [
  { id: 'relaxing', image: '/images/package_aroma.png', options: [{ durationKey: '30min', price: '$50' }, { durationKey: '45min', price: '$60' }, { durationKey: '60min', price: '$70' }, { durationKey: '90min', price: '$120' }] },
  { id: 'deep-tissue', image: '/images/treatment_deeptissue.png', options: [{ durationKey: '30min', price: '$55' }, { durationKey: '45min', price: '$75' }, { durationKey: '60min', price: '$85' }, { durationKey: '90min', price: '$135' }] },
  { id: 'hot-stone', image: '/images/treatment_stones.png', options: [{ durationKey: '60min', price: '$105' }, { durationKey: '90min', price: '$155' }] },
  { id: 'facial-care', image: '/images/package_kglow.png', options: [{ durationKey: '45min', price: '$85' }, { durationKey: '60min', price: '$110' }, { durationKey: '90min', price: '$150' }] },
  { id: 'combination', image: '/images/hero_spa.png', options: [{ durationKey: '30min', price: '$55' }, { durationKey: '45min', price: '$75' }, { durationKey: '60min', price: '$85' }, { durationKey: '90min', price: '$135' }] },
  { id: 'foot-scrub', image: '/images/treatment_foot.png', options: [{ durationKey: '30min', price: '$55' }, { durationKey: '45min', price: '$75' }, { durationKey: '60min', price: '$85' }, { durationKey: '90min', price: '$135' }] },
  { id: 'body-scrub', image: '/images/package_scrub.png', options: [{ durationKey: '30min', price: '$69' }, { durationKey: '45min', price: '$89' }, { durationKey: '60min', price: '$99' }, { durationKey: '90min', price: '$159' }] }
]

const treatmentsI18n = computed(() => {
  return treatments.map(tData => ({
    ...tData,
    name: t(`treatments.${tData.id}.name`),
    description: t(`treatments.${tData.id}.description`),
    details: t(`treatments.${tData.id}.details`),
    options: tData.options.map(opt => ({
      ...opt,
      duration: t(`durations.${opt.durationKey}`)
    })),
    benefits: [1, 2, 3, 4].map(i => t(`treatments.${tData.id}.benefit${i}`))
  }))
})

// Active treatment selection state
const selectedTreatmentId = ref('relaxing')
const activeTreatment = computed(() => treatmentsI18n.value.find(t => t.id === selectedTreatmentId.value))

// === Booking Flow Logic ===
const bookingStep = ref(1)
const bookingForm = ref({
  treatment: 'relaxing',
  duration: '60min',
  coconutOil: false,
  name: '',
  phone: '',
  date: '',
  time: '',
  notes: ''
})

const currentSelectedTreatment = computed(() => treatments.find(t => t.id === bookingForm.value.treatment))
const currentDurationOptions = computed(() => currentSelectedTreatment.value ? currentSelectedTreatment.value.options : [])

watch(() => bookingForm.value.treatment, (newT) => {
  const treat = treatments.find(t => t.id === newT)
  if (treat && treat.options.length > 0) {
    bookingForm.value.duration = treat.options[0].durationKey
  }
})

const estimatedPrice = computed(() => {
  if (!currentSelectedTreatment.value) return 0
  const opt = currentDurationOptions.value.find(o => o.durationKey === bookingForm.value.duration)
  let basePrice = opt ? parseInt(opt.price.replace('$', '')) : 0
  if (bookingForm.value.coconutOil) {
    basePrice += 5
  }
  return basePrice
})

const bookingSubmitted = ref(false)
const bookingReference = ref('')

const handleBookingSubmit = () => {
  if (!bookingForm.value.name || !bookingForm.value.phone || !bookingForm.value.date || !bookingForm.value.time) {
    alert(t('booking.required'))
    return
  }
  bookingSubmitted.value = true
  bookingReference.value = 'LKA-' + Math.floor(100000 + Math.random() * 900000)
}

const activeTreatmentName = computed(() => {
  const tr = treatmentsI18n.value.find(t => t.id === bookingForm.value.treatment)
  return tr ? tr.name : ''
})

const resetBooking = () => {
  bookingSubmitted.value = false
  bookingStep.value = 1
  bookingForm.value = {
    treatment: 'relaxing',
    duration: '60min',
    coconutOil: false,
    name: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  }
}

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

// === Hero Slideshow Setup ===
const heroSlides = [
  { image: '/images/hero_spa.png' },
  { image: '/images/package_luxury.png' },
  { image: '/images/package_aroma.png' },
  { image: '/images/treatment_deeptissue.png' },
  { image: '/images/treatment_stones.png' }
]

const heroSlidesI18n = computed(() => {
  return heroSlides.map((s, i) => ({
    image: s.image,
    title: t(`heroSlides.${i}.title`),
    description: t(`heroSlides.${i}.description`)
  }))
})

const currentHeroSlide = ref(0)
let heroInterval = null

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    darkTheme.value = true
  }
  heroInterval = setInterval(() => {
    nextHeroSlide()
  }, 6000)
  const revealElements = document.querySelectorAll('.reveal')
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
  revealElements.forEach(el => revealObserver.observe(el))
  onUnmounted(() => {
    if (heroInterval) clearInterval(heroInterval)
    revealObserver.disconnect()
  })
})

watch(darkTheme, (isDark) => {
  if (import.meta.client) {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }
}, { immediate: true })

const nextHeroSlide = () => { currentHeroSlide.value = (currentHeroSlide.value + 1) % heroSlides.length }
const prevHeroSlide = () => { currentHeroSlide.value = (currentHeroSlide.value - 1 + heroSlides.length) % heroSlides.length }
const selectHeroSlide = (idx) => { currentHeroSlide.value = idx }

const resolveImage = (img) => {
  if (!img) return ''
  if (img.startsWith('/') && !img.startsWith('//')) {
    return `${useRuntimeConfig().app.baseURL}${img.slice(1)}`
  }
  return img
}
</script>

<template>
  <div :class="{'dark': darkTheme}" class="min-h-[100dvh] flex flex-col font-sans antialiased bg-spa-bg-light dark:bg-spa-bg-dark text-spa-text-dark dark:text-spa-text-light transition-colors duration-500 relative selection:bg-spa-primary/20 overflow-x-hidden">
    
    <div class="organic-blur-bg top-[8%] left-[-15%] opacity-70"></div>
    <div class="organic-blur-bg-right top-[35%] right-[-15%] opacity-60"></div>
    <div class="organic-blur-bg top-[70%] left-[-20%] opacity-50"></div>

    <header class="sticky top-0 z-50 w-full border-b border-spa-primary/10 bg-spa-bg-light/85 dark:bg-spa-bg-dark/90 backdrop-blur-md transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        <a href="#" @click.prevent="scrollToSection('hero')" class="flex items-center gap-2 group">
          <span class="font-serif text-2xl font-light tracking-widest text-spa-text-dark dark:text-spa-text-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors duration-300 uppercase">
            Seoul <span class="font-semibold text-spa-primary">K-Aesthetic</span>
          </span>
        </a>

        <nav class="hidden md:flex items-center gap-12">
          <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">{{ $t('nav.home') }}</a>
          <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">{{ $t('nav.packages') }}</a>
          <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">{{ $t('nav.treatment') }}</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">{{ $t('nav.contact') }}</a>
        </nav>

        <div class="hidden md:flex items-center gap-8">
          <!-- Language Selector -->
          <div class="relative group">
            <button class="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors py-2 cursor-pointer">
              <span>{{ locale.toUpperCase() }}</span>
              <svg class="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div class="absolute right-0 top-full w-32 bg-white dark:bg-spa-bg-dark border border-spa-primary/15 rounded-2xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 py-1.5 z-50 before:content-[''] before:absolute before:inset-x-0 before:h-4 before:-top-4 before:bg-transparent">
              <button 
                v-for="loc in locales" 
                :key="loc.code" 
                @click="setLocale(loc.code)"
                :class="[locale === loc.code ? 'text-spa-primary font-semibold' : 'text-spa-text-muted-dark dark:text-spa-text-muted-light']"
                class="w-full text-left px-4 py-2 text-xs hover:bg-spa-primary/5 transition-colors cursor-pointer"
              >
                {{ loc.name }}
              </button>
            </div>
          </div>

          <button @click="toggleTheme" class="p-2.5 rounded-full hover:bg-spa-bg-light-alt dark:hover:bg-spa-bg-dark-alt text-spa-text-dark dark:text-spa-text-light hover:text-spa-primary transition-all duration-300 cursor-pointer" aria-label="Toggle visual theme">
            <IconSun v-if="darkTheme" class="w-4.5 h-4.5" />
            <IconMoon v-else class="w-4.5 h-4.5" />
          </button>
          <button @click="scrollToSection('booking')" class="clay-pill-button px-7 py-3 text-xs tracking-widest cursor-pointer">
            {{ $t('common.book_now') }}
          </button>
        </div>

        <div class="flex items-center gap-4 md:hidden">
          <button @click="toggleTheme" class="p-2 text-spa-text-dark dark:text-spa-text-light" aria-label="Toggle visual theme">
            <IconSun v-if="darkTheme" class="w-5 h-5" />
            <IconMoon v-else class="w-5 h-5" />
          </button>
          <button @click="toggleMobileMenu" class="p-2 text-spa-text-dark dark:text-spa-text-light cursor-pointer" aria-label="Toggle menu">
            <IconMenu2 class="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-[-10px]" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-[-10px]">
      <div v-if="mobileMenuOpen" class="fixed inset-x-0 top-24 z-40 md:hidden bg-spa-bg-light dark:bg-spa-bg-dark border-b border-spa-primary/10 shadow-lg px-8 py-8">
        <nav class="flex flex-col gap-6">
          <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">{{ $t('nav.home') }}</a>
          <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">{{ $t('nav.packages') }}</a>
          <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">{{ $t('nav.treatment') }}</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">{{ $t('nav.contact') }}</a>
          
          <!-- Mobile Language Selector -->
          <div class="flex items-center gap-2 mt-4 pt-4 border-t border-spa-primary/10">
            <span class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase tracking-wider font-semibold">{{ $t('language.select') }}:</span>
            <div class="flex gap-3">
              <button 
                v-for="loc in locales" 
                :key="loc.code" 
                @click="setLocale(loc.code); mobileMenuOpen = false"
                :class="[locale === loc.code ? 'text-spa-primary font-semibold border-spa-primary' : 'text-spa-text-muted-dark dark:text-spa-text-muted-light border-transparent']"
                class="text-xs uppercase px-2.5 py-1 border rounded-md transition-all cursor-pointer"
              >
                {{ loc.code.toUpperCase() }}
              </button>
            </div>
          </div>

          <button @click="scrollToSection('booking')" class="w-full mt-4 py-3 bg-spa-primary text-white text-xs font-semibold uppercase tracking-wider text-center rounded-full">
            {{ $t('common.book_now') }}
          </button>
        </nav>
      </div>
    </Transition>

    <section id="hero" class="relative min-h-[92vh] w-full flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-spa-bg-dark">
      <div class="absolute inset-0 z-0">
        <img :src="resolveImage('/images/korean_spa_clinic.png')" alt="Seoul K-Aesthetic Korean Spa Clinic" class="w-full h-full object-cover object-center filter brightness-[0.65] saturate-[0.9]" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>
      </div>

      <div class="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        <span class="text-[10px] sm:text-xs lg:text-sm font-bold tracking-[0.3em] text-spa-primary-light uppercase mb-6 reveal">
          {{ t('hero.badge') }}
        </span>

        <h1 class="font-serif text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-[0.18em] text-white uppercase flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8 reveal reveal-delay-1">
          <span>Seoul</span>
          <span class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-spa-primary-light shadow-inner animate-pulse-slow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-8 h-8 sm:w-10 sm:h-10">
              <path d="M12 3C12 3 7 8 7 13C7 16.5 9.5 19 12 19C14.5 19 17 16.5 17 13C17 8 12 3 12 3Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="font-serif italic font-light text-spa-primary-light lowercase tracking-normal">k-aesthetic</span>
        </h1>

        <p class="text-xs sm:text-base lg:text-lg text-white/80 max-w-[60ch] leading-relaxed mb-10 reveal reveal-delay-2 font-light">
          {{ t('hero.description') }}
        </p>

        <button @click="scrollToSection('booking')" class="reveal reveal-delay-3 px-10 py-4 bg-black border border-white/20 text-white rounded-full text-xs font-semibold tracking-[0.2em] uppercase hover:bg-spa-primary hover:border-spa-primary transition-all duration-300 shadow-lg cursor-pointer">
          {{ $t('common.book_now') }}
        </button>
      </div>

      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 100" class="relative block w-full h-[60px] md:h-[90px]" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C320,100 480,20 800,70 C1120,120 1280,30 1440,60 L1440,100 L0,100 Z" class="fill-spa-bg-light dark:fill-spa-bg-dark transition-colors duration-500"></path>
        </svg>
      </div>
    </section>

    <section class="py-16 max-w-7xl mx-auto px-6 w-full fine-border-b relative z-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full reveal">
        <div v-for="(h, i) in ['kbeauty', 'hygiene', 'service', 'expert']" :key="i" class="flex flex-col items-center text-center">
          <div class="clay-circle-badge w-16 h-16 mb-3">
            <component :is="[IconSparkles, IconShieldCheck, IconHeartHandshake, IconAward][i]" class="w-6 h-6 text-spa-primary" />
          </div>
          <span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light mb-1.5">{{ t(`highlights.${h}.title`) }}</span>
          <p class="text-[11px] sm:text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light font-light max-w-[18ch] sm:max-w-none">{{ t(`highlights.${h}.desc`) }}</p>
        </div>
      </div>
    </section>

    <div class="w-full bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border-b border-spa-primary/10 py-5 overflow-hidden z-10 relative">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="flex h-1.5 w-1.5 rounded-full bg-spa-primary animate-pulse"></span>
          <span class="font-serif text-lg tracking-wider font-light text-spa-primary dark:text-spa-primary-light">
            {{ t('promo.title') }}
          </span>
        </div>
        <div class="text-center md:text-right">
          <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light mr-4">
            {{ t('promo.label') }}
          </span>
          <span class="text-xs font-semibold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light">
            {{ t('promo.desc') }}
          </span>
        </div>
      </div>
    </div>

    <section id="packages" class="py-28 max-w-7xl mx-auto px-6 w-full fine-border-b z-10 relative">
      <div class="text-center max-w-2xl mx-auto mb-20 reveal">
        <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-6">
          {{ t('packages.section.title') }}
        </h2>
        <div class="w-12 h-[0.5px] bg-spa-primary/30 mx-auto mb-6"></div>
        <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light tracking-wide leading-relaxed">
          {{ t('packages.section.desc') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        <div v-for="(pkg, i) in packagesI18n" :key="i" class="reveal flex flex-col justify-between p-8 bg-white dark:bg-spa-bg-dark-alt rounded-[2.5rem] border border-spa-primary/15 shadow-sm group hover:shadow-md transition-all duration-500">
          <div>
            <div class="w-full aspect-[4/3] rounded-[2rem] overflow-hidden relative mb-6">
              <img :src="resolveImage(pkg.image)" :alt="pkg.title" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" />
              <span class="absolute top-4 right-4 px-4 py-2 font-serif text-xs font-semibold rounded-full text-white bg-spa-primary shadow-md">{{ pkg.price }}</span>
            </div>
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-spa-primary dark:text-spa-primary-light mb-3 block">{{ pkg.duration }}</span>
            <h3 class="font-serif text-xl font-normal text-spa-text-dark dark:text-spa-text-light mb-4 leading-snug">{{ pkg.title }}</h3>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light mb-6">{{ pkg.description }}</p>
          </div>
          <button @click="scrollToSection('booking')" class="clay-pill-button w-full py-3.5 text-[10px] cursor-pointer">{{ $t('common.book_now') }}</button>
        </div>
      </div>
    </section>

    <section id="treatment" class="py-28 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt w-full fine-border-b z-10 relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-20 reveal">
          <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-6">{{ t('treatment.section.title') }}</h2>
          <div class="w-12 h-[0.5px] bg-spa-primary/30 mx-auto mb-6"></div>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light tracking-wide leading-relaxed">{{ t('treatment.section.desc') }}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div class="lg:col-span-5 flex flex-col gap-3 reveal">
            <button v-for="treat in treatmentsI18n" :key="treat.id" @click="selectedTreatmentId = treat.id" :class="[selectedTreatmentId === treat.id ? 'bg-spa-primary text-white shadow-sm font-semibold' : 'bg-white dark:bg-spa-bg-dark hover:bg-spa-primary/10 text-spa-text-muted-dark dark:text-spa-text-muted-light border border-spa-primary/15']" class="w-full text-left px-6 py-4.5 rounded-full transition-all duration-300 flex items-center justify-between group cursor-pointer">
              <span class="text-xs font-semibold tracking-wider uppercase">{{ treat.name }}</span>
              <IconChevronRight class="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" :class="{'translate-x-1': selectedTreatmentId === treat.id}" />
            </button>
          </div>

          <div class="lg:col-span-7 bg-white dark:bg-spa-bg-dark border border-spa-primary/10 rounded-[2.5rem] p-8 lg:p-12 shadow-sm relative min-h-[480px] flex flex-col justify-between reveal reveal-delay-1">
            <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-[-2px]">
              <div :key="selectedTreatmentId" class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full w-full">
                <div class="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <h3 class="font-serif text-2xl font-normal text-spa-text-dark dark:text-spa-text-light mb-4">{{ activeTreatment.name }}</h3>
                    <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light mb-6">{{ activeTreatment.details }}</p>
                    <div class="mb-6">
                      <span class="text-[9px] font-bold tracking-[0.15em] text-spa-primary dark:text-spa-primary-light uppercase block mb-3">{{ t('treatment.benefits.label') }}</span>
                      <ul class="space-y-2">
                        <li v-for="(benefit, bIdx) in activeTreatment.benefits" :key="bIdx" class="flex items-start gap-2 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light font-light">
                          <IconCheck class="w-3.5 h-3.5 text-spa-primary shrink-0 mt-0.5" />
                          <span>{{ benefit }}</span>
                        </li>
                      </ul>
                    </div>

                    <!-- Durations and Prices Grid -->
                    <div class="mb-6">
                      <span class="text-[9px] font-bold tracking-[0.15em] text-spa-primary dark:text-spa-primary-light uppercase block mb-3">
                        {{ t('treatment.pricing.label') }}
                      </span>
                      
                      <div class="grid grid-cols-2 gap-3">
                        <div 
                          v-for="(opt, idx) in activeTreatment.options" 
                          :key="idx"
                          class="flex items-center justify-between p-3 bg-spa-bg-light dark:bg-spa-bg-dark-alt rounded-full border border-spa-primary/5 hover:border-spa-primary/20 transition-all duration-300"
                        >
                          <span class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light pl-2">
                            {{ t(`durations.${opt.durationKey}`) }}
                          </span>
                          <span class="text-xs font-semibold text-spa-primary dark:text-spa-primary-light pr-2">
                            {{ opt.price }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Add-ons callout -->
                    <div class="flex items-start gap-3 p-3.5 bg-spa-primary/5 border border-spa-primary/10 rounded-2xl mb-8">
                      <span class="flex h-1.5 w-1.5 rounded-full bg-spa-primary shrink-0 mt-1.5"></span>
                      <p class="text-[10px] font-light text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed" v-html="$t('treatment.addon.text', {
                        strong1: `<strong class='font-semibold text-spa-primary'>${$t('treatment.addon.oil')}</strong>`,
                        strong2: `<strong class='font-semibold text-spa-primary'>${$t('treatment.addon.price')}</strong>`
                      })">
                      </p>
                    </div>
                  </div>

                  <div class="flex justify-start">
                    <button 
                      @click="bookingForm.treatment = activeTreatment.id; scrollToSection('booking')"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
                    >
                      {{ $t('common.book_now') }}
                    </button>
                  </div>
                </div>

                <!-- Right side: Illustrative Image (Bo góc tròn sâu) -->
                <div class="md:col-span-5 w-full aspect-square md:aspect-auto md:min-h-full rounded-[2rem] overflow-hidden border border-spa-primary/10 relative">
                  <img 
                    :src="resolveImage(activeTreatment.image)" 
                    :alt="activeTreatment.name" 
                    class="w-full h-full object-cover transform hover:scale-103 transition-transform duration-1000 absolute inset-0"
                  />
                </div>
              </div>
            </Transition>

          </div>

        </div>

      </div>
    </section>

    <!-- === Commitment Section (Asymmetric layout with circles) === -->
    <section class="py-28 max-w-7xl mx-auto px-6 w-full fine-border-b z-10 relative">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left side: message & quote card -->
        <div class="lg:col-span-5 space-y-8 reveal">
          <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light leading-[1.1]">
            {{ t('commitment.section.title') }} <br/>{{ t('commitment.section.title2') }}
          </h2>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
            {{ t('commitment.section.desc') }}
          </p>
          
          <!-- Asymmetric Quote Card -->
          <div class="p-8 border-l-2 border-spa-primary bg-white dark:bg-spa-bg-dark rounded-r-[2rem] shadow-sm relative">
            <div class="absolute -top-3 left-4 text-spa-primary text-4xl font-serif leading-none">“</div>
            <p class="font-serif italic text-xs md:text-sm text-spa-primary dark:text-spa-primary-light leading-relaxed">
              {{ t('commitment.quote') }}
            </p>
          </div>
        </div>

        <!-- Right side: stack of core values -->
        <div class="lg:col-span-7 space-y-6 reveal reveal-delay-1">
          
          <!-- Value 1 -->
          <div class="flex flex-col sm:flex-row items-start gap-5 p-6 bg-white dark:bg-spa-bg-dark-alt rounded-[2rem] border border-spa-primary/10 shadow-sm hover:border-spa-primary/30 transition-all duration-300">
            <span class="clay-circle-badge w-12 h-12 shrink-0">
              <IconShieldCheck class="w-5 h-5 text-spa-primary" />
            </span>
            <div>
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h3 class="font-serif text-lg font-medium text-spa-text-dark dark:text-spa-text-light">{{ t('commitment.v1.title') }}</h3>
                <span class="text-[8px] font-bold text-spa-primary bg-spa-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{{ t('commitment.v1.badge') }}</span>
              </div>
              <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
                {{ t('commitment.v1.desc') }}
              </p>
            </div>
          </div>

          <!-- Value 2 -->
          <div class="flex flex-col sm:flex-row items-start gap-5 p-6 bg-white dark:bg-spa-bg-dark-alt rounded-[2rem] border border-spa-primary/10 shadow-sm hover:border-spa-primary/30 transition-all duration-300">
            <span class="clay-circle-badge w-12 h-12 shrink-0">
              <IconHeartHandshake class="w-5 h-5 text-spa-primary" />
            </span>
            <div>
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h3 class="font-serif text-lg font-medium text-spa-text-dark dark:text-spa-text-light">{{ t('commitment.v2.title') }}</h3>
                <span class="text-[8px] font-bold text-spa-primary bg-spa-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{{ t('commitment.v2.badge') }}</span>
              </div>
              <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
                {{ t('commitment.v2.desc') }}
              </p>
            </div>
          </div>

          <!-- Value 3 -->
          <div class="flex flex-col sm:flex-row items-start gap-5 p-6 bg-white dark:bg-spa-bg-dark-alt rounded-[2rem] border border-spa-primary/10 shadow-sm hover:border-spa-primary/30 transition-all duration-300">
            <span class="clay-circle-badge w-12 h-12 shrink-0">
              <IconAward class="w-5 h-5 text-spa-primary" />
            </span>
            <div>
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h3 class="font-serif text-lg font-medium text-spa-text-dark dark:text-spa-text-light">{{ t('commitment.v3.title') }}</h3>
                <span class="text-[8px] font-bold text-spa-primary bg-spa-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{{ t('commitment.v3.badge') }}</span>
              </div>
              <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
                {{ t('commitment.v3.desc') }}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- === Booking Section (Step-by-Step Form) === -->
    <section id="booking" class="py-28 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt w-full fine-border-b z-10 relative">
      <div class="max-w-4xl mx-auto px-6">
        
        <div class="text-center mb-16 reveal">
          <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-6">
            {{ t('booking.section.title') }}
          </h2>
          <div class="w-12 h-[0.5px] bg-spa-primary/30 mx-auto mb-6"></div>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light tracking-wide leading-relaxed font-light">
            {{ t('booking.section.desc') }}
          </p>
        </div>

        <!-- Inner Box with rounded edges -->
        <div class="bg-white dark:bg-spa-bg-dark border border-spa-primary/10 rounded-[2.5rem] p-8 lg:p-14 shadow-sm reveal reveal-delay-1 relative overflow-hidden">
          
          <!-- Booking Success State -->
          <div v-if="bookingSubmitted" class="text-center py-10">
            <div class="clay-circle-badge w-14 h-14 mb-6">
              <IconCheck class="w-6 h-6 text-spa-primary" />
            </div>
            <h3 class="font-serif text-2xl font-light text-spa-text-dark dark:text-spa-text-light mb-4">
              {{ t('booking.success.title') }}
            </h3>
            <p class="text-xs md:text-sm text-spa-text-muted-dark dark:text-spa-text-muted-light max-w-[48ch] mx-auto leading-relaxed mb-8 font-light" v-html="$t('booking.success.desc', {
              name: `<strong>${bookingForm.name}</strong>`,
              treatment: `<strong>${activeTreatmentName}</strong>`,
              date: `<strong>${bookingForm.date}</strong>`,
              time: `<strong>${bookingForm.time}</strong>`
            })"></p>

            <!-- Ticket details -->
            <div class="max-w-md mx-auto p-6 border border-spa-primary/15 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-[1.5rem] text-left mb-8">
              <div class="flex items-center justify-between border-b border-spa-primary/10 pb-4 mb-4">
                <span class="text-[10px] sm:text-xs font-bold tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase">{{ t('booking.success.ref') }}</span>
                <span class="text-sm font-bold font-mono text-spa-primary dark:text-spa-primary-light">{{ bookingReference }}</span>
              </div>
              <div class="space-y-2.5 text-sm font-light">
                <div class="flex justify-between">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('booking.success.treatment') }}</span>
                  <span class="font-medium text-spa-text-dark dark:text-spa-text-light">{{ activeTreatmentName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('booking.success.duration') }}</span>
                  <span class="font-medium text-spa-text-dark dark:text-spa-text-light">{{ t(`durations.${bookingForm.duration}`) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('booking.success.addon') }}</span>
                  <span class="font-medium text-spa-text-dark dark:text-spa-text-light">{{ bookingForm.coconutOil ? t('booking.success.addonYes') : t('booking.success.addonNo') }}</span>
                </div>
                <div class="flex justify-between pt-2.5 border-t border-spa-primary/5">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('booking.success.cost') }}</span>
                  <span class="font-bold text-spa-primary dark:text-spa-primary-light text-base">${{ estimatedPrice }}</span>
                </div>
              </div>
            </div>

            <button 
              @click="resetBooking" 
              class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
            >
              {{ t('booking.success.newBooking') }}
            </button>
          </div>

          <!-- Booking Step Forms -->
          <div v-else>
            
            <!-- Step Indicators -->
            <div class="flex items-center justify-between mb-12 max-w-md mx-auto">
              <div class="flex items-center gap-2.5">
                <span 
                  :class="[bookingStep >= 1 ? 'bg-spa-primary text-white' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                >
                  1
                </span>
                <span class="text-[9px] font-bold tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('booking.step1') }}</span>
              </div>
              <div class="h-[0.5px] flex-grow bg-spa-primary/20 mx-4"></div>
              <div class="flex items-center gap-2.5">
                <span 
                  :class="[bookingStep >= 2 ? 'bg-spa-primary text-white' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                >
                  2
                </span>
                <span class="text-[9px] font-bold tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('booking.step2') }}</span>
              </div>
              <div class="h-[0.5px] flex-grow bg-spa-primary/20 mx-4"></div>
              <div class="flex items-center gap-2.5">
                <span 
                  :class="[bookingStep >= 3 ? 'bg-spa-primary text-white' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                >
                  3
                </span>
                <span class="text-[9px] font-bold tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('booking.step3') }}</span>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleBookingSubmit" class="overflow-hidden">
              <Transition 
                mode="out-in"
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 translate-x-4"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 translate-x-[-4px]"
              >
                <!-- STEP 1: Select Treatment & Details -->
                <div v-if="bookingStep === 1" :key="1" class="space-y-6">
                  
                  <div class="flex flex-col gap-2">
                    <label for="booking-treatment" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      {{ t('booking.label.treatment') }}
                    </label>
                    <select 
                      id="booking-treatment" 
                      v-model="bookingForm.treatment"
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-spa-bg-light/40 dark:bg-transparent text-sm sm:text-base tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                    >
                      <option v-for="t in treatmentsI18n" :key="t.id" :value="t.id" class="dark:bg-spa-bg-dark text-sm">
                        {{ t.name }}
                      </option>
                    </select>
                  </div>

                  <div class="flex flex-col gap-2">
                    <label for="booking-duration" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      {{ t('booking.label.duration') }}
                    </label>
                    <select 
                      id="booking-duration" 
                      v-model="bookingForm.duration"
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-spa-bg-light/40 dark:bg-transparent text-sm sm:text-base tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                    >
                      <option v-for="opt in currentDurationOptions" :key="opt.durationKey" :value="opt.durationKey" class="dark:bg-spa-bg-dark text-sm">
                        {{ t(`durations.${opt.durationKey}`) }} - {{ opt.price }}
                      </option>
                    </select>
                  </div>

                  <!-- Add-ons Option -->
                  <div class="flex items-center justify-between p-5 border border-spa-primary/10 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-[1.5rem]">
                    <div class="flex flex-col gap-1 pr-4">
                      <span class="text-xs font-semibold text-spa-text-dark dark:text-spa-text-light">{{ t('booking.addon.title') }}</span>
                      <span class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light font-light">{{ t('booking.addon.desc') }}</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="bookingForm.coconutOil" class="sr-only peer">
                      <div class="w-10 h-5 bg-spa-primary/25 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-spa-primary"></div>
                    </label>
                  </div>

                  <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                    <div class="text-left">
                      <span class="text-[10px] sm:text-xs font-bold tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase block">{{ t('booking.estimated') }}</span>
                      <span class="text-xl sm:text-2xl font-bold text-spa-primary">${{ estimatedPrice }}</span>
                    </div>
                    <button 
                      type="button" 
                      @click="bookingStep = 2"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
                    >
                      {{ t('booking.next.datetime') }}
                    </button>
                  </div>

                </div>

                <!-- STEP 2: Time & Date Selection -->
                <div v-else-if="bookingStep === 2" :key="2" class="space-y-6">
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div class="flex flex-col gap-2">
                      <label for="booking-date" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                        <IconCalendar class="w-4 h-4 text-spa-primary" /> {{ t('booking.label.date') }}
                      </label>
                      <input 
                        type="date" 
                        id="booking-date" 
                        v-model="bookingForm.date"
                        required
                        class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm sm:text-base tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                      />
                    </div>

                    <div class="flex flex-col gap-2">
                      <label for="booking-time" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                        <IconClock class="w-4 h-4 text-spa-primary" /> {{ t('booking.label.time') }}
                      </label>
                      <input 
                        type="time" 
                        id="booking-time" 
                        v-model="bookingForm.time"
                        required
                        class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm sm:text-base tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                      />
                    </div>

                  </div>

                  <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                    <button 
                      type="button" 
                      @click="bookingStep = 1"
                      class="px-6 py-3 rounded-full border border-spa-primary/20 text-spa-text-dark dark:text-spa-text-light text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {{ t('booking.back') }}
                    </button>
                    <button 
                      type="button" 
                      @click="bookingStep = 3"
                      :disabled="!bookingForm.date || !bookingForm.time"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {{ t('booking.next.info') }}
                    </button>
                  </div>

                </div>

                <!-- STEP 3: Customer Details & Confirm -->
                <div v-else-if="bookingStep === 3" :key="3" class="space-y-6">
                  
                  <div class="flex flex-col gap-2">
                    <label for="booking-name" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                      <IconUser class="w-4 h-4 text-spa-primary" /> {{ t('booking.label.name') }}
                    </label>
                    <input 
                      type="text" 
                      id="booking-name" 
                      v-model="bookingForm.name" 
                      :placeholder="t('booking.placeholder.name')" 
                      required
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm sm:text-base focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <label for="booking-phone" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                      <IconPhone class="w-4 h-4 text-spa-primary" /> {{ t('booking.label.phone') }}
                    </label>
                    <input 
                      type="tel" 
                      id="booking-phone" 
                      v-model="bookingForm.phone" 
                      :placeholder="t('booking.placeholder.phone')" 
                      required
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm sm:text-base focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <label for="booking-notes" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      {{ t('booking.label.notes') }}
                    </label>
                    <textarea 
                      id="booking-notes" 
                      v-model="bookingForm.notes" 
                      :placeholder="t('booking.placeholder.notes')"
                      rows="3"
                      class="w-full px-6 py-4 rounded-[1.5rem] border border-spa-primary/20 bg-transparent text-sm sm:text-base focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light resize-none"
                    ></textarea>
                  </div>

                  <!-- Review Box -->
                  <div class="p-5 border border-spa-primary/10 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-[1.5rem] space-y-2">
                    <span class="text-[10px] sm:text-xs font-bold tracking-widest text-spa-primary uppercase block mb-1">{{ t('booking.confirm.label') }}</span>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm font-light text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      <span>{{ t('booking.confirm.treatment') }}</span>
                      <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ activeTreatmentName }}</span>
                      <span>{{ t('booking.confirm.duration') }}</span>
                      <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ t(`durations.${bookingForm.duration}`) }}</span>
                      <span>{{ t('booking.confirm.datetime') }}</span>
                      <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ t('booking.confirm.datetimeValue', { date: bookingForm.date, time: bookingForm.time }) }}</span>
                      <span>{{ t('booking.confirm.cost') }}</span>
                      <span class="text-right font-bold text-spa-primary text-base">${{ estimatedPrice }}</span>
                    </div>
                  </div>

                  <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                    <button 
                      type="button" 
                      @click="bookingStep = 2"
                      class="px-6 py-3 rounded-full border border-spa-primary/20 text-spa-text-dark dark:text-spa-text-light text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {{ t('booking.back') }}
                    </button>
                    <button 
                      type="submit"
                      :disabled="!bookingForm.name || !bookingForm.phone"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {{ t('booking.submit') }}
                    </button>
                  </div>

                </div>
              </Transition>
            </form>
          </div>

        </div>

      </div>
    </section>

    <!-- === Gift Vouchers Section (Pill Button & Rounded Card) === -->
    <section class="py-20 max-w-7xl mx-auto px-6 w-full fine-border-b z-10 relative">
      <div class="border border-spa-primary/15 rounded-[2.5rem] p-8 md:p-14 text-spa-text-dark dark:text-spa-text-light flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-spa-bg-dark reveal">
        <div class="text-center md:text-left max-w-xl">
          <h3 class="font-serif text-3xl font-light tracking-tight mb-4">
            {{ t('voucher.title') }}
          </h3>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
            {{ t('voucher.desc') }}
          </p>
        </div>
        <div>
          <button 
            @click="scrollToSection('contact')" 
            class="clay-pill-button px-8 py-4 text-xs cursor-pointer"
          >
            {{ t('voucher.cta') }}
          </button>
        </div>
      </div>
    </section>

    <!-- === Contact Section & Form === -->
    <section id="contact" class="py-28 max-w-7xl mx-auto px-6 w-full z-10 relative">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Left: Contact Info -->
        <div class="lg:col-span-5 space-y-10 reveal">
          <div>
            <span class="text-[10px] font-bold tracking-[0.25em] text-spa-primary dark:text-spa-primary-light uppercase block mb-3">{{ t('contact.section.label') }}</span>
            <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-6">
              {{ t('contact.section.title') }}
            </h2>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light max-w-[42ch]">
              {{ t('contact.section.desc') }}
            </p>
          </div>

          <!-- Contact items stack (Bo góc tròn sâu) -->
          <div class="space-y-4">
            <!-- Phone -->
            <a href="tel:+61416145949" class="block p-6 bg-white dark:bg-spa-bg-dark border border-spa-primary/10 hover:border-spa-primary rounded-[2rem] transition-all duration-300 group">
              <div class="flex items-start gap-4">
                <span class="clay-circle-badge w-12 h-12 shrink-0">
                  <IconPhone class="w-5 h-5 text-spa-primary" />
                </span>
                <div>
                  <span class="text-[8px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">{{ t('contact.phone.label') }}</span>
                  <span class="text-xs font-semibold tracking-wider text-spa-text-dark dark:text-spa-text-light group-hover:text-spa-primary transition-colors">+61 416 145 949</span>
                </div>
              </div>
            </a>

            <!-- Address -->
            <a href="https://maps.google.com/?q=2/372+Chapel+Road,+Bankstown+NSW,+Australia" target="_blank" class="block p-6 bg-white dark:bg-spa-bg-dark border border-spa-primary/10 hover:border-spa-primary rounded-[2rem] transition-all duration-300 group">
              <div class="flex items-start gap-4">
                <span class="clay-circle-badge w-12 h-12 shrink-0">
                  <IconMapPin class="w-5 h-5 text-spa-primary" />
                </span>
                <div>
                  <span class="text-[8px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">{{ t('contact.address.label') }}</span>
                  <span class="text-xs font-semibold text-spa-text-dark dark:text-spa-text-light group-hover:text-spa-primary transition-colors leading-relaxed">
                    2/372 Chapel Road, Bankstown NSW, Australia
                  </span>
                </div>
              </div>
            </a>

            <!-- Email -->
            <a href="mailto:contact@seoulkaesthetic.com" class="block p-6 bg-white dark:bg-spa-bg-dark border border-spa-primary/10 hover:border-spa-primary rounded-[2rem] transition-all duration-300 group">
              <div class="flex items-start gap-4">
                <span class="clay-circle-badge w-12 h-12 shrink-0">
                  <IconMail class="w-5 h-5 text-spa-primary" />
                </span>
                <div>
                  <span class="text-[8px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">{{ t('contact.email.label') }}</span>
                  <span class="text-xs font-semibold text-spa-text-dark dark:text-spa-text-light group-hover:text-spa-primary transition-colors truncate block max-w-[240px] sm:max-w-none">
                    contact@seoulkaesthetic.com
                  </span>
                </div>
              </div>
            </a>
          </div>

        </div>

        <!-- Right: Inquiry Form -->
        <div class="lg:col-span-7 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt p-8 lg:p-12 border border-spa-primary/10 rounded-[2.5rem] reveal reveal-delay-1">
          <span class="text-[10px] font-bold tracking-widest text-spa-primary uppercase block mb-6">
            {{ t('contact.form.title') }}
          </span>
          
          <form @submit.prevent class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label for="contact-name" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('contact.form.name') }}</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  required
                  :placeholder="t('contact.form.name.placeholder')"
                  class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-white dark:bg-spa-bg-dark text-sm sm:text-base focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="contact-email" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('contact.form.email') }}</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  required
                  placeholder="example@gmail.com"
                  class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-white dark:bg-spa-bg-dark text-sm sm:text-base focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-message" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">{{ t('contact.form.message') }}</label>
              <textarea 
                id="contact-message" 
                required
                :placeholder="t('contact.form.message.placeholder')"
                rows="4"
                class="w-full px-5 py-4 rounded-[1.5rem] border border-spa-primary/20 bg-white dark:bg-spa-bg-dark text-sm sm:text-base focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light resize-none"
              ></textarea>
            </div>

            <div class="flex justify-end border-t border-spa-primary/10 pt-6">
              <button 
                type="submit" 
                @click.prevent="alert(t('contact.form.success'))"
                class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
              >
                {{ t('contact.form.submit') }}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>

    <!-- === Google Maps Section === -->
    <section class="py-12 max-w-7xl mx-auto px-6 w-full relative z-10 reveal">
      <div class="w-full aspect-[21/9] sm:aspect-[21/7] rounded-[2.5rem] overflow-hidden border border-spa-primary/10 shadow-sm relative group bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.8208753232876!2d151.03058867623547!3d-33.92003882200845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bec4502d99d1%3A0xcb13b1ab943d6c70!2s2%2F372%20Chapel%20Rd%2C%20Bankstown%20NSW%202200%2C%20Australia!5e0!3m2!1sen!2s!4v1717750000000!5m2!1sen!2s" 
          class="w-full h-full border-0 grayscale dark:invert-[0.9] dark:hue-rotate-[180deg] transition-all duration-500 opacity-90 hover:opacity-100" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Seoul K-Aesthetic Location Map"
        ></iframe>
        <!-- Premium Floating Tag -->
        <div class="absolute top-6 left-6 bg-white/95 dark:bg-spa-bg-dark/95 backdrop-blur-md border border-spa-primary/15 px-5 py-3 rounded-2xl shadow-md pointer-events-none transition-transform duration-300 group-hover:translate-y-[-2px]">
          <span class="text-[8px] uppercase font-mono tracking-widest text-spa-primary block mb-1">{{ t('map.label') }}</span>
          <span class="text-xs font-semibold text-spa-text-dark dark:text-spa-text-light">2/372 Chapel Road, Bankstown NSW</span>
        </div>
      </div>
    </section>

    <!-- === Footer Navigation === -->
    <footer class="w-full bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border-t border-spa-primary/10 py-20 mt-auto z-10 relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <!-- Column 1: Brand -->
          <div class="flex flex-col items-start gap-4">
            <span class="font-serif text-2xl font-light tracking-widest text-spa-text-dark dark:text-spa-text-light uppercase">
              Seoul <span class="font-semibold text-spa-primary">K-Aesthetic</span>
            </span>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed max-w-[28ch] font-light">
              {{ t('footer.brand.desc') }}
            </p>
            
            <!-- Socials -->
            <div class="flex items-center gap-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="clay-circle-badge w-9 h-9 text-spa-text-muted-dark hover:text-spa-primary cursor-pointer" aria-label="Facebook">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="clay-circle-badge w-9 h-9 text-spa-text-muted-dark hover:text-spa-primary cursor-pointer" aria-label="Instagram">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="clay-circle-badge w-9 h-9 text-spa-text-muted-dark hover:text-spa-primary cursor-pointer" aria-label="TikTok">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation Links -->
          <div class="flex flex-col gap-5">
            <span class="text-[10px] font-bold tracking-widest uppercase text-spa-text-dark dark:text-spa-text-light">
              {{ t('footer.nav.title') }}
            </span>
            <nav class="flex flex-col gap-3.5">
              <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">{{ t('nav.home') }}</a>
              <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">{{ t('nav.packages') }}</a>
              <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">{{ t('nav.treatment') }}</a>
              <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">{{ t('nav.contact') }}</a>
            </nav>
          </div>

          <!-- Column 3: Contact Info -->
          <div class="flex flex-col gap-5">
            <span class="text-[10px] font-bold tracking-widest uppercase text-spa-text-dark dark:text-spa-text-light">
              {{ t('footer.contact.title') }}
            </span>
            <div class="flex flex-col gap-3.5 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light font-light">
              <a href="tel:+61416145949" class="hover:text-spa-primary transition-colors flex items-center gap-2.5">
                <IconPhone class="w-4 h-4 shrink-0" />
                +61 416 145 949
              </a>
              <a href="mailto:contact@seoulkaesthetic.com" class="hover:text-spa-primary transition-colors flex items-center gap-2.5">
                <IconMail class="w-4 h-4 shrink-0" />
                contact@seoulkaesthetic.com
              </a>
            </div>
          </div>

          <!-- Column 4: Address & Hours -->
          <div class="flex flex-col gap-5">
            <span class="text-[10px] font-bold tracking-widest uppercase text-spa-text-dark dark:text-spa-text-light">
              {{ t('footer.address.title') }}
            </span>
            <div class="flex flex-col gap-3.5 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
              <span class="flex items-start gap-2.5">
                <IconMapPin class="w-4 h-4 shrink-0 mt-0.5" />
                <span>2/372 Chapel Road, Bankstown NSW, Australia</span>
              </span>
              <span class="block pl-6.5">
                {{ t('footer.hours') }}
              </span>
            </div>
          </div>

        </div>

        <!-- Copyright -->
        <div class="border-t border-spa-primary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span class="text-[9px] tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light font-medium">
            {{ t('footer.copyright') }}
          </span>
          <span class="text-[9px] tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light font-medium">
            K-Aesthetic Beauty & Wellness
          </span>
        </div>

      </div>
    </footer>

  </div>
</template>

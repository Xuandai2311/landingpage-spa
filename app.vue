<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
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

// === SEO & Metadata ===
useHead({
  title: 'Seoul K-Aesthetic - Thẩm Mỹ Viện & Spa Làm Đẹp Chuẩn Hàn',
  meta: [
    { name: 'description', content: 'Trải nghiệm các liệu trình chăm sóc da, trị liệu và thẩm mỹ chuẩn y khoa Hàn Quốc tại Seoul K-Aesthetic Sydney. Chăm sóc da mặt chuyên sâu, phục hồi da K-Glow và xông hơi thải độc cao cấp.' },
    { name: 'keywords', content: 'spa han quoc, tham my han quoc, cham soc da seoul, spa sydney, cham soc da mat, yeosim aesthetic, spa tri lieu, lam dep sydney' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Seoul K-Aesthetic - Thẩm Mỹ Viện & Spa Làm Đẹp Chuẩn Hàn' },
    { property: 'og:description', content: 'Khám phá thiên đường làm đẹp và chăm sóc da hoàn hảo. Liệu trình tinh tế chuẩn y khoa Seoul cùng đội ngũ kỹ thuật viên chuyên nghiệp.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap' }
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
    title: 'Gói Thẩm Mỹ Luxury Queen',
    duration: 'Tổng cộng 120 phút',
    description: 'Trải nghiệm xông hơi thảo dược thư thái - Liệu trình nâng cơ trẻ hóa da mặt chuyên sâu - Massage trị liệu mô sâu giải tỏa cơ căng cứng.',
    image: '/images/package_luxury.png'
  }
]

const treatments = [
  {
    id: 'relaxing',
    name: 'Massage Tinh Dầu Thư Giãn',
    description: 'Liệu pháp massage nhẹ nhàng kết hợp tinh dầu thơm cao cấp xua tan mệt mỏi, thúc đẩy tuần hoàn máu và đem lại sự thư thái tuyệt đối cho tâm trí.',
    details: 'Liệu trình sử dụng các đường miết dài kết hợp xoa bóp nhẹ nhàng với lực vừa phải. Tinh dầu cao cấp thẩm thấu qua da kích thích các giác quan, làm dịu hệ thần kinh và giải tỏa mọi áp lực tích tụ từ cuộc sống bận rộn thường nhật.',
    benefits: [
      'Giảm căng thẳng, mệt mỏi tinh thần nhanh chóng',
      'Thúc đẩy tuần hoàn máu và ổn định nhịp tim',
      'Làm mềm cơ, xoa dịu các cơn đau đầu do stress',
      'Sử dụng tinh dầu Lavender & Melaleuca hữu cơ nhập khẩu'
    ],
    image: '/images/package_aroma.png',
    options: [
      { duration: '30 phút', price: '$50' },
      { duration: '45 phút', price: '$60' },
      { duration: '60 phút', price: '$70' },
      { duration: '90 phút', price: '$120' }
    ]
  },
  {
    id: 'deep-tissue',
    name: 'Massage Mô Sâu (Deep Tissue)',
    description: 'Massage trị liệu tác động sâu vào các lớp cơ và mô liên kết. Đặc biệt khuyên dùng để giải tỏa các vùng cơ căng cứng, đau nhức mãn tính.',
    details: 'Liệu pháp hoàn hảo cho những ai bị đau mỏi cơ kinh niên hoặc vận động viên. Kỹ thuật viên sẽ sử dụng lực ngón tay, cùi chỏ và cẳng tay để tác động sâu vào các điểm nút thắt cơ bị co thắt, giúp tái tạo năng lượng cho cơ bắp.',
    benefits: [
      'Giải tỏa các nút cơ bị xơ cứng & đau nhức mãn tính',
      'Tăng cường độ linh hoạt và tầm vận động của các khớp',
      'Hỗ trợ đào thải axit lactic tích tụ sau khi tập luyện',
      'Tác động chính xác vùng thắt lưng và cổ vai gáy'
    ],
    image: '/images/treatment_deeptissue.png',
    options: [
      { duration: '30 phút', price: '$55' },
      { duration: '45 phút', price: '$75' },
      { duration: '60 phút', price: '$85' },
      { duration: '90 phút', price: '$135' }
    ]
  },
  {
    id: 'hot-stone',
    name: 'Massage Đá Nóng',
    description: 'Đá núi lửa basalt ấm áp đặt lên các huyệt đạo năng lượng kết hợp với các động tác massage uyển chuyển giúp làm giãn cơ và xoa dịu thần kinh.',
    details: 'Sự kết hợp hoàn hảo giữa nhiệt liệu pháp từ đá núi lửa tự nhiên và kỹ thuật miết huyệt y học cổ truyền. Hơi nóng thẩm thấu sâu vào tế bào giúp làm tan biến các vùng cơ xơ cứng, đồng thời thải độc và hỗ trợ hệ minh dịch tự nhiên.',
    benefits: [
      'Hơi ấm từ đá tự nhiên giúp thải độc cơ thể hiệu quả',
      'Kích thích thư giãn tối đa, mang lại giấc ngủ sâu ngon',
      'Làm giãn mạch máu, cải thiện tuần hoàn toàn thân',
      'Giảm căng thẳng thần kinh và xoa dịu lo âu'
    ],
    image: '/images/treatment_stones.png',
    options: [
      { duration: '60 phút', price: '$105' },
      { duration: '90 phút', price: '$155' }
    ]
  },
  {
    id: 'facial-care',
    name: 'Chăm Sóc Da Mặt Chuyên Sâu K-Beauty',
    description: 'Liệu trình chăm sóc da mặt chuẩn y khoa Hàn Quốc kết hợp đẩy dưỡng chất collagen, nâng cơ và massage mặt đem lại làn da sáng mịn căng bóng tức thì.',
    details: 'Liệu pháp chăm sóc da chuẩn mực từ các clinic tại Seoul. Quy trình bao gồm làm sạch sâu lỗ chân lông, đẩy dưỡng chất tế bào gốc/collagen bằng máy ion siêu âm, đắp mặt nạ sinh học phục hồi và bấm huyệt nâng cơ chống lão hóa.',
    benefits: [
      'Cấp ẩm sâu mang lại làn da căng bóng ngậm nước chuẩn Hàn',
      'Nâng cơ mặt tự nhiên, tăng độ đàn hồi chống chảy xệ',
      'Làm mờ thâm mụn, giúp làn da sáng mịn và đều màu',
      'Massage bấm huyệt mặt thải độc hệ bạch huyết'
    ],
    image: '/images/package_kglow.png',
    options: [
      { duration: '45 phút', price: '$85' },
      { duration: '60 phút', price: '$110' },
      { duration: '90 phút', price: '$150' }
    ]
  },
  {
    id: 'combination',
    name: 'Massage Kết Hợp Trị Liệu & Tinh Dầu',
    description: 'Sự giao thoa hoàn hảo giữa các động tác trị liệu kéo giãn cơ khớp và sự xoa dịu, làm mềm cơ bằng liệu pháp tinh dầu thảo dược ấm.',
    details: 'Được thiết kế riêng cho nhân viên văn phòng và người gặp các vấn đề về cột sống. Sự pha trộn độc đáo giữa kỹ thuật bẻ giãn cơ kiểu Thái cổ truyền và các bài miết dầu Thụy Điển nhẹ nhàng giúp phục hồi hệ xương khớp linh hoạt.',
    benefits: [
      'Giải phóng hoàn toàn các điểm nghẽn năng lượng cơ thể',
      'Phục hồi sự dẻo dai của cột sống và các khớp xương',
      'Giảm nhức mỏi lưng vai gáy do tư thế ngồi làm việc sai',
      'Liệu pháp tinh dầu thảo dược ấm làm dịu tinh thần'
    ],
    image: '/images/hero_spa.png',
    options: [
      { duration: '30 phút', price: '$55' },
      { duration: '45 phút', price: '$75' },
      { duration: '60 phút', price: '$85' },
      { duration: '90 phút', price: '$135' }
    ]
  },
  {
    id: 'foot-scrub',
    name: 'Tẩy Tế Bào Chết & Massage Chân',
    description: 'Tẩy da chết cho chân bằng muối hạt ấm, sau đó thực hiện massage bấm huyệt giúp thư giãn đôi chân mỏi mệt từ bàn chân đến bắp chân.',
    details: 'Bảo vệ đôi chân - nền móng sức khỏe của bạn. Quy trình kết hợp ngâm chân thảo dược ấm khử mùi, tẩy da chết gót chân bằng muối khoáng thiên nhiên và massage bấm huyệt chuyên sâu kích thích các cơ quan nội tạng hoạt động khỏe mạnh.',
    benefits: [
      'Loại bỏ lớp sừng cằn cỗi, chữa lành gót chân nứt nẻ',
      'Massage bấm huyệt kích hoạt lưu thông khí huyết toàn thân',
      'Giảm sưng phù nề bàn chân và nhức mỏi bắp chân',
      'Giúp ngủ ngon hơn nhờ thư giãn sâu các huyệt đạo ở chân'
    ],
    image: '/images/treatment_foot.png',
    options: [
      { duration: '30 phút', price: '$55' },
      { duration: '45 phút', price: '$75' },
      { duration: '60 phút', price: '$85' },
      { duration: '90 phút', price: '$135' }
    ]
  },
  {
    id: 'body-scrub',
    name: 'Tẩy Tế Bào Chết Toàn Thân (Body Scrub)',
    description: 'Quy trình tẩy tế bào chết tỉ mỉ kiểu Hàn Quốc giúp loại bỏ da chết sần sùi, tăng sinh tế bào mới mang lại làn da trắng mịn, sáng khỏe.',
    details: 'Phương pháp nuôi dưỡng làn da body mịn màng hoàn hảo. Sử dụng hỗn hợp organic làm từ cafe/cám gạo cùng sữa tươi hảo hạng kết hợp kỹ thuật chà xát miết nhẹ giúp loại bỏ lớp sừng già cỗi, thúc đẩy tái tạo tế bào da mới hồng hào.',
    benefits: [
      'Tẩy sạch sâu lớp tế bào chết thô ráp trên toàn bộ cơ thể',
      'Hỗ trợ cải thiện tình trạng mụn lưng và viêm nang lông',
      'Kích thích tăng sinh tế bào da mới trắng sáng mịn màng',
      'Tăng hiệu quả hấp thụ các loại kem dưỡng thể sau trị liệu'
    ],
    image: '/images/package_scrub.png',
    options: [
      { duration: '30 phút', price: '$69' },
      { duration: '45 phút', price: '$89' },
      { duration: '60 phút', price: '$99' },
      { duration: '90 phút', price: '$159' }
    ]
  }
]

// Active treatment selection state
const selectedTreatmentId = ref('relaxing')
const activeTreatment = computed(() => treatments.find(t => t.id === selectedTreatmentId.value))

// === Booking Flow Logic ===
const bookingStep = ref(1)
const bookingForm = ref({
  treatment: 'relaxing',
  duration: '60 phút',
  coconutOil: false,
  name: '',
  phone: '',
  date: '',
  time: '',
  notes: ''
})

const currentSelectedTreatment = computed(() => treatments.find(t => t.id === bookingForm.value.treatment))
const currentDurationOptions = computed(() => currentSelectedTreatment.value ? currentSelectedTreatment.value.options : [])

// Auto-adjust duration when treatment changes in form
watch(() => bookingForm.value.treatment, (newT) => {
  const treat = treatments.find(t => t.id === newT)
  if (treat && treat.options.length > 0) {
    bookingForm.value.duration = treat.options[0].duration
  }
})

const estimatedPrice = computed(() => {
  if (!currentSelectedTreatment.value) return 0
  const opt = currentDurationOptions.value.find(o => o.duration === bookingForm.value.duration)
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
    alert('Vui lòng điền đầy đủ các thông tin bắt buộc.')
    return
  }
  bookingSubmitted.value = true
  bookingReference.value = 'LKA-' + Math.floor(100000 + Math.random() * 900000)
}

const resetBooking = () => {
  bookingSubmitted.value = false
  bookingStep.value = 1
  bookingForm.value = {
    treatment: 'relaxing',
    duration: '60 phút',
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
  {
    image: '/images/hero_spa.png',
    title: 'Không Gian Trị Liệu Sang Trọng',
    description: 'Không gian tĩnh lặng mang âm hưởng thiền định Hàn Quốc với hương thơm thảo mộc tự nhiên.'
  },
  {
    image: '/images/package_luxury.png',
    title: 'Trị Liệu Công Nghệ Cao K-Glow',
    description: 'Quy trình đẩy dưỡng chất, nâng cơ mặt và tái tạo làn da chuẩn y khoa clinic Seoul.'
  },
  {
    image: '/images/package_aroma.png',
    title: 'Liệu Pháp Massage Tinh Dầu',
    description: 'Tinh dầu tự nhiên giúp xoa dịu các bó cơ căng mỏi và làm dịu hệ thần kinh.'
  },
  {
    image: '/images/treatment_deeptissue.png',
    title: 'Kỹ Thuật Massage Trị Liệu Mô Sâu',
    description: 'Tác động sâu vào các cơ bị co thắt mãn tính dưới bàn tay lành nghề của kỹ thuật viên.'
  },
  {
    image: '/images/treatment_stones.png',
    title: 'Massage Trị Liệu Đá Nóng Bazan',
    description: 'Hơi nóng từ đá núi lửa tự nhiên giúp thải độc và cải thiện tuần hoàn máu.'
  }
]

const currentHeroSlide = ref(0)
let heroInterval = null

onMounted(() => {
  // Theme initialization
  const storedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    darkTheme.value = true
  }

  // Hero interval
  heroInterval = setInterval(() => {
    nextHeroSlide()
  }, 6000)

  // Scroll Reveal System
  const revealElements = document.querySelectorAll('.reveal')
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        revealObserver.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  })

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

const nextHeroSlide = () => {
  currentHeroSlide.value = (currentHeroSlide.value + 1) % heroSlides.length
}

const prevHeroSlide = () => {
  currentHeroSlide.value = (currentHeroSlide.value - 1 + heroSlides.length) % heroSlides.length
}

const selectHeroSlide = (idx) => {
  currentHeroSlide.value = idx
}
</script>

<template>
  <div :class="{'dark': darkTheme}" class="min-h-[100dvh] flex flex-col font-sans antialiased bg-spa-bg-light dark:bg-spa-bg-dark text-spa-text-dark dark:text-spa-text-light transition-colors duration-500 relative selection:bg-spa-primary/20 overflow-x-hidden">
    
    <!-- === Organic Decorative Soft Blur Shapes (Backdrop Leaf Depths) === -->
    <div class="organic-blur-bg top-[8%] left-[-15%] opacity-70"></div>
    <div class="organic-blur-bg-right top-[35%] right-[-15%] opacity-60"></div>
    <div class="organic-blur-bg top-[70%] left-[-20%] opacity-50"></div>

    <!-- === Sticky Header Navigation === -->
    <header class="sticky top-0 z-50 w-full border-b border-spa-primary/10 bg-spa-bg-light/85 dark:bg-spa-bg-dark/90 backdrop-blur-md transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        <!-- Logo -->
        <a href="#" @click.prevent="scrollToSection('hero')" class="flex items-center gap-2 group">
          <span class="font-serif text-2xl font-light tracking-widest text-spa-text-dark dark:text-spa-text-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors duration-300 uppercase">
            Seoul <span class="font-semibold text-spa-primary">K-Aesthetic</span>
          </span>
        </a>

        <!-- Desktop Links (Editorial layout) -->
        <nav class="hidden md:flex items-center gap-12">
          <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Trang chủ</a>
          <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Gói trị liệu</a>
          <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Dịch vụ</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-xs font-semibold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Liên hệ</a>
        </nav>

        <!-- Right Utilities -->
        <div class="hidden md:flex items-center gap-8">
          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme" 
            class="p-2.5 rounded-full hover:bg-spa-bg-light-alt dark:hover:bg-spa-bg-dark-alt text-spa-text-dark dark:text-spa-text-light hover:text-spa-primary transition-all duration-300 cursor-pointer"
            aria-label="Toggle visual theme"
          >
            <IconSun v-if="darkTheme" class="w-4.5 h-4.5" />
            <IconMoon v-else class="w-4.5 h-4.5" />
          </button>

          <!-- Unified Primary CTA (Reserve Session) -->
          <button 
            @click="scrollToSection('booking')" 
            class="clay-pill-button px-7 py-3 text-xs tracking-widest cursor-pointer"
          >
            Đặt Lịch Hẹn
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center gap-4 md:hidden">
          <button 
            @click="toggleTheme" 
            class="p-2 text-spa-text-dark dark:text-spa-text-light"
            aria-label="Toggle visual theme"
          >
            <IconSun v-if="darkTheme" class="w-5 h-5" />
            <IconMoon v-else class="w-5 h-5" />
          </button>
          
          <button 
            @click="toggleMobileMenu" 
            class="p-2 text-spa-text-dark dark:text-spa-text-light cursor-pointer"
            aria-label="Toggle menu"
          >
            <IconMenu2 class="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>

    <!-- === Mobile Drawer Menu === -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div v-if="mobileMenuOpen" class="fixed inset-x-0 top-24 z-40 md:hidden bg-spa-bg-light dark:bg-spa-bg-dark border-b border-spa-primary/10 shadow-lg px-8 py-8">
        <nav class="flex flex-col gap-6">
          <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">Trang chủ</a>
          <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">Gói trị liệu</a>
          <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">Menu dịch vụ</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-sm font-semibold tracking-wider uppercase text-spa-text-dark dark:text-spa-text-light">Liên hệ</a>
          <button 
            @click="scrollToSection('booking')" 
            class="w-full mt-4 py-3 bg-spa-primary text-white text-xs font-semibold uppercase tracking-wider text-center rounded-full"
          >
            Đặt Lịch Hẹn
          </button>
        </nav>
      </div>
    </Transition>

    <!-- === Hero Section (Cosmetic Guide Style, Pill Buttons & Highlights) === -->
    <section id="hero" class="relative min-h-[92dvh] flex flex-col justify-center py-16 max-w-7xl mx-auto px-6 w-full fine-border-b">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full mb-12">
        
        <!-- Left Column (Hero Content) -->
        <div class="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          <span class="text-[9px] font-bold tracking-[0.25em] text-spa-primary dark:text-spa-primary-light uppercase mb-6 reveal">
            SEOUL K-AESTHETIC CLINIC & BEAUTY
          </span>

          <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.08] text-spa-text-dark dark:text-spa-text-light mb-6 reveal reveal-delay-1">
            “ĐÁNH THỨC <br/>
            <span class="font-serif italic font-normal text-spa-primary">VẺ ĐẸP TỰ NHIÊN</span>”
          </h1>

          <p class="text-xs md:text-sm text-spa-text-muted-dark dark:text-spa-text-muted-light max-w-[48ch] leading-relaxed mb-8 reveal reveal-delay-2 font-light">
            <span class="font-serif italic block mb-3 text-spa-primary dark:text-spa-primary-light font-normal text-sm md:text-base">Nghi thức khơi dậy vẻ đẹp thanh xuân.</span>
            Chăm sóc da chuẩn clinic Hàn Quốc giúp làn da căng bóng.
          </p>

          <div class="flex flex-wrap items-center gap-5 mb-8 reveal reveal-delay-3">
            <!-- Pill Gradient Button -->
            <button 
              @click="scrollToSection('booking')" 
              class="clay-pill-button px-9 py-4 text-xs tracking-widest cursor-pointer"
            >
              Đặt Lịch Hẹn
            </button>
            <button 
              @click="scrollToSection('treatment')" 
              class="px-9 py-4 rounded-full border border-spa-primary/30 hover:border-spa-primary text-spa-text-dark dark:text-spa-text-light hover:bg-spa-primary/5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer"
            >
              Xem Menu
            </button>
          </div>

        </div>

        <!-- Right Column (Cosmetic visual frame - Curved frame) -->
        <div class="lg:col-span-5 relative flex justify-center w-full reveal reveal-delay-2 z-10">
          <div class="relative w-full aspect-[4/5] max-w-[380px] rounded-[3.5rem] overflow-hidden shadow-xl border border-spa-primary/10 group bg-spa-bg-dark-alt">
            
            <!-- Slides Container -->
            <div class="absolute inset-0 w-full h-full">
              <TransitionGroup 
                enter-active-class="transition-opacity duration-1000 ease-in-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-1000 ease-in-out"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div 
                  v-for="(slide, idx) in heroSlides" 
                  v-show="currentHeroSlide === idx" 
                  :key="idx" 
                  class="absolute inset-0 w-full h-full"
                >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                  
                  <img 
                    :src="slide.image" 
                    :alt="slide.title" 
                    class="w-full h-full object-cover transform scale-103 transition-transform duration-10000 ease-out"
                  />
                  
                  <!-- Info Overlay -->
                  <div class="absolute bottom-0 inset-x-0 p-8 z-20 text-white flex flex-col gap-1.5">
                    <span class="text-[8px] tracking-[0.2em] uppercase font-bold text-spa-primary-light">
                      SEOUL K-AESTHETIC
                    </span>
                    <h3 class="font-serif text-xl font-light text-white/95">
                      {{ slide.title }}
                    </h3>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- Arrow Navigation -->
            <button 
              @click="prevHeroSlide" 
              class="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              aria-label="Slide trước"
            >
              <IconChevronLeft class="w-4 h-4" />
            </button>
            <button 
              @click="nextHeroSlide" 
              class="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              aria-label="Slide tiếp theo"
            >
              <IconChevronRight class="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

      <!-- Circular Feature Badges (Cosmetic Guide Highlights block) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-8 border-t border-spa-primary/10 reveal reveal-delay-3 z-10">
        
        <div class="flex flex-col items-center text-center">
          <div class="clay-circle-badge w-16 h-16 mb-3">
            <IconSparkles class="w-6 h-6 text-spa-primary" />
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light mb-1">Chuẩn K-Beauty</span>
          <p class="text-[9px] text-spa-text-muted-dark dark:text-spa-text-muted-light font-light max-w-[15ch]">Thiết kế liệu trình chuẩn y khoa Seoul</p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="clay-circle-badge w-16 h-16 mb-3">
            <IconShieldCheck class="w-6 h-6 text-spa-primary" />
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light mb-1">Vệ Sinh Tuyệt Đối</span>
          <p class="text-[9px] text-spa-text-muted-dark dark:text-spa-text-muted-light font-light max-w-[15ch]">Khử trùng trang thiết bị chuẩn y tế</p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="clay-circle-badge w-16 h-16 mb-3">
            <IconHeartHandshake class="w-6 h-6 text-spa-primary" />
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light mb-1">Phục Vụ Tận Tâm</span>
          <p class="text-[9px] text-spa-text-muted-dark dark:text-spa-text-muted-light font-light max-w-[15ch]">Tư vấn cá nhân hóa chu đáo</p>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="clay-circle-badge w-16 h-16 mb-3">
            <IconAward class="w-6 h-6 text-spa-primary" />
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light mb-1">KTV Chuyên Nghiệp</span>
          <p class="text-[9px] text-spa-text-muted-dark dark:text-spa-text-muted-light font-light max-w-[15ch]">Đào tạo bài bản, chứng chỉ uy tín</p>
        </div>

      </div>

    </section>

    <!-- === Ticker Promotion Banner === -->
    <div class="w-full bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border-b border-spa-primary/10 py-5 overflow-hidden z-10 relative">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="flex h-1.5 w-1.5 rounded-full bg-spa-primary animate-pulse"></span>
          <span class="font-serif text-lg tracking-wider font-light text-spa-primary dark:text-spa-primary-light">
            MỞ CỬA CHÀO ĐÓN - ƯU ĐÃI KHAI TRƯƠNG
          </span>
        </div>
        <div class="text-center md:text-right">
          <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light mr-4">
            GRAND OPENING SAVINGS
          </span>
          <span class="text-xs font-semibold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light">
            Giảm ngay 20% cho tất cả dịch vụ trong suốt tháng 7 này
          </span>
        </div>
      </div>
    </div>

    <!-- === Packages Section (Cosmetic Style - Highly Rounded Bento Grid) === -->
    <section id="packages" class="py-28 max-w-7xl mx-auto px-6 w-full fine-border-b z-10 relative">
      
      <div class="text-center max-w-2xl mx-auto mb-20 reveal">
        <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-6">
          Nghi Thức Thư Giãn Tinh Tế
        </h2>
        <div class="w-12 h-[0.5px] bg-spa-primary/30 mx-auto mb-6"></div>
        <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light tracking-wide leading-relaxed">
          Gói liệu trình được thiết kế hài hòa giúp tái sinh năng lượng cơ thể và nuôi dưỡng làn da
        </p>
      </div>

      <!-- Bento-style grid with curved offsets -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        
        <!-- Package Card 1 -->
        <div class="reveal flex flex-col justify-between p-8 bg-white dark:bg-spa-bg-dark-alt rounded-[2.5rem] border border-spa-primary/15 shadow-sm group hover:shadow-md transition-all duration-500">
          <div>
            <div class="w-full aspect-[4/3] rounded-[2rem] overflow-hidden relative mb-6">
              <img 
                :src="packages[0].image" 
                :alt="packages[0].title" 
                class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <span class="absolute top-4 right-4 px-4 py-2 font-serif text-xs font-semibold rounded-full text-white bg-spa-primary shadow-md">
                {{ packages[0].price }}
              </span>
            </div>
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-spa-primary dark:text-spa-primary-light mb-3 block">
              {{ packages[0].duration }}
            </span>
            <h3 class="font-serif text-xl font-normal text-spa-text-dark dark:text-spa-text-light mb-4 leading-snug">
              {{ packages[0].title }}
            </h3>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light mb-6">
              {{ packages[0].description }}
            </p>
          </div>
          
          <button 
            @click="bookingForm.treatment = 'body-scrub'; scrollToSection('booking')" 
            class="clay-pill-button w-full py-3.5 text-[10px] cursor-pointer"
          >
            Đặt Lịch Hẹn
          </button>
        </div>

        <!-- Package Card 2 (Recommended - Offset Layout) -->
        <div class="reveal reveal-delay-1 flex flex-col justify-between p-8 bg-white dark:bg-spa-bg-dark-alt border border-spa-primary rounded-[2.5rem] shadow-md scale-102 relative lg:-translate-y-4 group">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 text-[8px] font-bold uppercase tracking-widest text-white bg-spa-primary rounded-full shadow-sm">
            Khuyên dùng
          </span>
          <div>
            <div class="w-full aspect-[4/3] rounded-[2rem] overflow-hidden relative mb-6">
              <img 
                :src="packages[1].image" 
                :alt="packages[1].title" 
                class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <span class="absolute top-4 right-4 px-4 py-2 font-serif text-xs font-semibold rounded-full text-white bg-spa-primary shadow-md">
                {{ packages[1].price }}
              </span>
            </div>
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-spa-primary dark:text-spa-primary-light mb-3 block">
              {{ packages[1].duration }}
            </span>
            <h3 class="font-serif text-xl font-normal text-spa-text-dark dark:text-spa-text-light mb-4 leading-snug">
              {{ packages[1].title }}
            </h3>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light mb-6">
              {{ packages[1].description }}
            </p>
          </div>
          
          <button 
            @click="bookingForm.treatment = 'facial-care'; scrollToSection('booking')" 
            class="clay-pill-button w-full py-4 text-[10px] cursor-pointer"
          >
            Đặt Lịch Hẹn
          </button>
        </div>

        <!-- Package Card 3 -->
        <div class="reveal reveal-delay-2 flex flex-col justify-between p-8 bg-white dark:bg-spa-bg-dark-alt rounded-[2.5rem] border border-spa-primary/15 shadow-sm group hover:shadow-md transition-all duration-500">
          <div>
            <div class="w-full aspect-[4/3] rounded-[2rem] overflow-hidden relative mb-6">
              <img 
                :src="packages[2].image" 
                :alt="packages[2].title" 
                class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <span class="absolute top-4 right-4 px-4 py-2 font-serif text-xs font-semibold rounded-full text-white bg-spa-primary shadow-md">
                {{ packages[2].price }}
              </span>
            </div>
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-spa-primary dark:text-spa-primary-light mb-3 block">
              {{ packages[2].duration }}
            </span>
            <h3 class="font-serif text-xl font-normal text-spa-text-dark dark:text-spa-text-light mb-4 leading-snug">
              {{ packages[2].title }}
            </h3>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light mb-6">
              {{ packages[2].description }}
            </p>
          </div>
          
          <button 
            @click="bookingForm.treatment = 'facial-care'; scrollToSection('booking')" 
            class="clay-pill-button w-full py-3.5 text-[10px] cursor-pointer"
          >
            Đặt Lịch Hẹn
          </button>
        </div>

      </div>
    </section>

    <!-- === Treatment Menu Section === -->
    <section id="treatment" class="py-28 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt w-full fine-border-b z-10 relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <div class="text-center max-w-2xl mx-auto mb-20 reveal">
          <span class="text-[10px] font-bold tracking-[0.25em] text-spa-primary dark:text-spa-primary-light uppercase block mb-3">TREATMENT DOSSIER</span>
          <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-6">
            Bảng Giá & Menu Trị Liệu
          </h2>
          <div class="w-12 h-[0.5px] bg-spa-primary/30 mx-auto mb-6"></div>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light tracking-wide leading-relaxed">
            Các liệu trình tinh túy điều trị da chuyên sâu và xoa dịu cơ thể mệt mỏi
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          <!-- Treatment Left Navigation (Pill button lists) -->
          <div class="lg:col-span-5 flex flex-col gap-3 reveal">
            <button 
              v-for="treat in treatments" 
              :key="treat.id"
              @click="selectedTreatmentId = treat.id"
              :class="[
                selectedTreatmentId === treat.id 
                  ? 'bg-spa-primary text-white shadow-sm font-semibold' 
                  : 'bg-white dark:bg-spa-bg-dark hover:bg-spa-primary/10 text-spa-text-muted-dark dark:text-spa-text-muted-light border border-spa-primary/15'
              ]"
              class="w-full text-left px-6 py-4.5 rounded-full transition-all duration-300 flex items-center justify-between group cursor-pointer"
            >
              <span class="text-xs font-semibold tracking-wider uppercase">{{ treat.name }}</span>
              <IconChevronRight 
                class="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" 
                :class="{'translate-x-1': selectedTreatmentId === treat.id}"
              />
            </button>
          </div>

          <!-- Treatment Details Display (With smooth Vue Transition wrapper) -->
          <div class="lg:col-span-7 bg-white dark:bg-spa-bg-dark border border-spa-primary/10 rounded-[2.5rem] p-8 lg:p-12 shadow-sm relative min-h-[480px] flex flex-col justify-between reveal reveal-delay-1">
            
            <div class="absolute top-6 right-6 z-10 pointer-events-none">
              <span class="text-[8px] uppercase font-mono tracking-widest text-spa-primary/40 dark:text-spa-primary-light/40">
                SEOUL CLINIC
              </span>
            </div>

            <!-- Transition Wrapper -->
            <Transition 
              mode="out-in"
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-[-2px]"
            >
              <div :key="selectedTreatmentId" class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full w-full">
                <!-- Left side: Text Details -->
                <div class="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <h3 class="font-serif text-2xl font-normal text-spa-text-dark dark:text-spa-text-light mb-4">
                      {{ activeTreatment.name }}
                    </h3>
                    
                    <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light mb-6">
                      {{ activeTreatment.details }}
                    </p>

                    <!-- Benefits Checklist -->
                    <div class="mb-6">
                      <span class="text-[9px] font-bold tracking-[0.15em] text-spa-primary dark:text-spa-primary-light uppercase block mb-3">
                        LỢI ÍCH TRỊ LIỆU
                      </span>
                      <ul class="space-y-2">
                        <li 
                          v-for="(benefit, bIdx) in activeTreatment.benefits" 
                          :key="bIdx"
                          class="flex items-start gap-2 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light font-light"
                        >
                          <IconCheck class="w-3.5 h-3.5 text-spa-primary shrink-0 mt-0.5" />
                          <span>{{ benefit }}</span>
                        </li>
                      </ul>
                    </div>

                    <!-- Durations and Prices Grid -->
                    <div class="mb-6">
                      <span class="text-[9px] font-bold tracking-[0.15em] text-spa-primary dark:text-spa-primary-light uppercase block mb-3">
                        THỜI GIAN & ĐƠN GIÁ
                      </span>
                      
                      <div class="grid grid-cols-2 gap-3">
                        <div 
                          v-for="(opt, idx) in activeTreatment.options" 
                          :key="idx"
                          class="flex items-center justify-between p-3 bg-spa-bg-light dark:bg-spa-bg-dark-alt rounded-full border border-spa-primary/5 hover:border-spa-primary/20 transition-all duration-300"
                        >
                          <span class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light pl-2">
                            {{ opt.duration }}
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
                      <p class="text-[10px] font-light text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed">
                        Nâng cấp liệu trình với <strong class="font-semibold text-spa-primary">Tinh Dầu Dừa Cao Cấp</strong> chỉ <strong class="font-semibold text-spa-primary">+$5</strong>. Chọn thêm tại Bước 2 khi đặt hẹn.
                      </p>
                    </div>
                  </div>

                  <div class="flex justify-start">
                    <button 
                      @click="bookingForm.treatment = activeTreatment.id; scrollToSection('booking')"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
                    >
                      Đặt Lịch Hẹn
                    </button>
                  </div>
                </div>

                <!-- Right side: Illustrative Image (Bo góc tròn sâu) -->
                <div class="md:col-span-5 w-full aspect-square md:aspect-auto md:min-h-full rounded-[2rem] overflow-hidden border border-spa-primary/10 relative">
                  <img 
                    :src="activeTreatment.image" 
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
            Cam Kết Về <br/>Chất Lượng Dịch Vụ
          </h2>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
            Seoul K-Aesthetic kiến tạo một không gian trị liệu an toàn, yên tĩnh và y khoa chuẩn Hàn Quốc. Mỗi chi tiết nhỏ trong hành trình của bạn đều được chăm chút tỉ mỉ để đem lại sự phục hồi và thư thái trọn vẹn nhất.
          </p>
          
          <!-- Asymmetric Quote Card -->
          <div class="p-8 border-l-2 border-spa-primary bg-white dark:bg-spa-bg-dark rounded-r-[2rem] shadow-sm relative">
            <div class="absolute -top-3 left-4 text-spa-primary text-4xl font-serif leading-none">“</div>
            <p class="font-serif italic text-xs md:text-sm text-spa-primary dark:text-spa-primary-light leading-relaxed">
              Sự hài lòng và vẻ đẹp tự nhiên của khách hàng chính là kim chỉ nam cho mọi hoạt động phục vụ tại Seoul K-Aesthetic.
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
                <h3 class="font-serif text-lg font-medium text-spa-text-dark dark:text-spa-text-light">Sạch Sẽ Tuyệt Đối</h3>
                <span class="text-[8px] font-bold text-spa-primary bg-spa-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Chuẩn Y Khoa</span>
              </div>
              <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
                Chúng tôi duy trì tiêu chuẩn vệ sinh khắt khe nhất. Toàn bộ drap giường, dụng cụ và phòng trị liệu đều được khử trùng sạch sẽ và thay mới hoàn toàn trước mỗi liệu trình.
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
                <h3 class="font-serif text-lg font-medium text-spa-text-dark dark:text-spa-text-light">Sự Đón Tiếp Tận Tâm</h3>
                <span class="text-[8px] font-bold text-spa-primary bg-spa-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Thấu Hiểu</span>
              </div>
              <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
                Tinh thần dịch vụ tận tụy kiểu Hàn Quốc được đặt lên hàng đầu. Đội ngũ nhân viên luôn lắng nghe, tư vấn cá nhân hóa và chăm sóc chu đáo từng mong muốn nhỏ của bạn.
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
                <h3 class="font-serif text-lg font-medium text-spa-text-dark dark:text-spa-text-light">Kỹ Thuật Viên Lành Nghề</h3>
                <span class="text-[8px] font-bold text-spa-primary bg-spa-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Chuyên Nghiệp</span>
              </div>
              <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
                Đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo bài bản chuẩn y học cổ truyền kết hợp thẩm mỹ hiện đại Hàn Quốc để đem lại hiệu quả trị liệu tối ưu.
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
            Đặt Lịch Hẹn Trị Liệu
          </h2>
          <div class="w-12 h-[0.5px] bg-spa-primary/30 mx-auto mb-6"></div>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light tracking-wide leading-relaxed font-light">
            Đặt chỗ trực tuyến nhanh chóng với 3 bước đơn giản để tận hưởng trải nghiệm thư giãn
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
              Đã Gửi Yêu Cầu Đặt Lịch
            </h3>
            <p class="text-xs md:text-sm text-spa-text-muted-dark dark:text-spa-text-muted-light max-w-[48ch] mx-auto leading-relaxed mb-8 font-light">
              Cảm ơn bạn, <strong>{{ bookingForm.name }}</strong>. Chúng tôi đã nhận được yêu cầu đặt lịch hẹn cho dịch vụ <strong>{{ currentSelectedTreatment ? currentSelectedTreatment.name : '' }}</strong> vào ngày <strong>{{ bookingForm.date }}</strong> lúc <strong>{{ bookingForm.time }}</strong>. Đội ngũ của chúng tôi sẽ liên hệ sớm để xác nhận lịch hẹn của bạn.
            </p>

            <!-- Ticket details -->
            <div class="max-w-md mx-auto p-6 border border-spa-primary/15 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-[1.5rem] text-left mb-8">
              <div class="flex items-center justify-between border-b border-spa-primary/10 pb-4 mb-4">
                <span class="text-[9px] font-bold tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase">Mã Đặt Lịch Hẹn</span>
                <span class="text-xs font-bold font-mono text-spa-primary dark:text-spa-primary-light">{{ bookingReference }}</span>
              </div>
              <div class="space-y-2.5 text-xs font-light">
                <div class="flex justify-between">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">Liệu pháp:</span>
                  <span class="font-medium text-spa-text-dark dark:text-spa-text-light">{{ currentSelectedTreatment ? currentSelectedTreatment.name : '' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">Thời lượng:</span>
                  <span class="font-medium text-spa-text-dark dark:text-spa-text-light">{{ bookingForm.duration }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">Dịch vụ kèm:</span>
                  <span class="font-medium text-spa-text-dark dark:text-spa-text-light">{{ bookingForm.coconutOil ? 'Thêm Tinh Dầu Dừa Cao Cấp (+$5)' : 'Không có' }}</span>
                </div>
                <div class="flex justify-between pt-2.5 border-t border-spa-primary/5">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">Chi phí ước tính:</span>
                  <span class="font-bold text-spa-primary dark:text-spa-primary-light text-sm">${{ estimatedPrice }}</span>
                </div>
              </div>
            </div>

            <button 
              @click="resetBooking" 
              class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
            >
              Đặt Lịch Hẹn Mới
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
                <span class="text-[9px] font-bold tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">Dịch vụ</span>
              </div>
              <div class="h-[0.5px] flex-grow bg-spa-primary/20 mx-4"></div>
              <div class="flex items-center gap-2.5">
                <span 
                  :class="[bookingStep >= 2 ? 'bg-spa-primary text-white' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                >
                  2
                </span>
                <span class="text-[9px] font-bold tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">Thời gian</span>
              </div>
              <div class="h-[0.5px] flex-grow bg-spa-primary/20 mx-4"></div>
              <div class="flex items-center gap-2.5">
                <span 
                  :class="[bookingStep >= 3 ? 'bg-spa-primary text-white' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                >
                  3
                </span>
                <span class="text-[9px] font-bold tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">Xác nhận</span>
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
                    <label for="booking-treatment" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      Lựa Chọn Liệu Pháp
                    </label>
                    <select 
                      id="booking-treatment" 
                      v-model="bookingForm.treatment"
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-spa-bg-light/40 dark:bg-transparent text-xs tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                    >
                      <option v-for="t in treatments" :key="t.id" :value="t.id" class="dark:bg-spa-bg-dark text-xs">
                        {{ t.name }}
                      </option>
                    </select>
                  </div>

                  <div class="flex flex-col gap-2">
                    <label for="booking-duration" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      Lựa Chọn Thời Lượng
                    </label>
                    <select 
                      id="booking-duration" 
                      v-model="bookingForm.duration"
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-spa-bg-light/40 dark:bg-transparent text-xs tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                    >
                      <option v-for="opt in currentDurationOptions" :key="opt.duration" :value="opt.duration" class="dark:bg-spa-bg-dark text-xs">
                        {{ opt.duration }} - {{ opt.price }}
                      </option>
                    </select>
                  </div>

                  <!-- Add-ons Option -->
                  <div class="flex items-center justify-between p-5 border border-spa-primary/10 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-[1.5rem]">
                    <div class="flex flex-col gap-1 pr-4">
                      <span class="text-xs font-semibold text-spa-text-dark dark:text-spa-text-light">Thêm Tinh Dầu Dừa Cao Cấp</span>
                      <span class="text-[10px] text-spa-text-muted-dark dark:text-spa-text-muted-light font-light">Nâng cấp trải nghiệm massage cơ thể (+ $5)</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="bookingForm.coconutOil" class="sr-only peer">
                      <div class="w-10 h-5 bg-spa-primary/25 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-spa-primary"></div>
                    </label>
                  </div>

                  <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                    <div class="text-left">
                      <span class="text-[9px] font-bold tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase block">Tổng phí dự kiến</span>
                      <span class="text-lg font-bold text-spa-primary">${{ estimatedPrice }}</span>
                    </div>
                    <button 
                      type="button" 
                      @click="bookingStep = 2"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
                    >
                      Chọn Ngày & Giờ
                    </button>
                  </div>

                </div>

                <!-- STEP 2: Time & Date Selection -->
                <div v-else-if="bookingStep === 2" :key="2" class="space-y-6">
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div class="flex flex-col gap-2">
                      <label for="booking-date" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                        <IconCalendar class="w-4 h-4 text-spa-primary" /> Chọn Ngày Hẹn
                      </label>
                      <input 
                        type="date" 
                        id="booking-date" 
                        v-model="bookingForm.date"
                        required
                        class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-xs tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                      />
                    </div>

                    <div class="flex flex-col gap-2">
                      <label for="booking-time" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                        <IconClock class="w-4 h-4 text-spa-primary" /> Chọn Giờ Hẹn
                      </label>
                      <input 
                        type="time" 
                        id="booking-time" 
                        v-model="bookingForm.time"
                        required
                        class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-xs tracking-wider focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                      />
                    </div>

                  </div>

                  <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                    <button 
                      type="button" 
                      @click="bookingStep = 1"
                      class="px-6 py-3 rounded-full border border-spa-primary/20 text-spa-text-dark dark:text-spa-text-light text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Quay lại
                    </button>
                    <button 
                      type="button" 
                      @click="bookingStep = 3"
                      :disabled="!bookingForm.date || !bookingForm.time"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Nhập Thông Tin
                    </button>
                  </div>

                </div>

                <!-- STEP 3: Customer Details & Confirm -->
                <div v-else-if="bookingStep === 3" :key="3" class="space-y-6">
                  
                  <div class="flex flex-col gap-2">
                    <label for="booking-name" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                      <IconUser class="w-4 h-4 text-spa-primary" /> Họ và Tên
                    </label>
                    <input 
                      type="text" 
                      id="booking-name" 
                      v-model="bookingForm.name" 
                      placeholder="Nhập họ và tên của bạn" 
                      required
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-xs focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <label for="booking-phone" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                      <IconPhone class="w-4 h-4 text-spa-primary" /> Số Điện Thoại
                    </label>
                    <input 
                      type="tel" 
                      id="booking-phone" 
                      v-model="bookingForm.phone" 
                      placeholder="Nhập số điện thoại liên hệ" 
                      required
                      class="w-full px-6 py-4 rounded-full border border-spa-primary/20 bg-transparent text-xs focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <label for="booking-notes" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      Yêu Cầu Đặc Biệt (Không bắt buộc)
                    </label>
                    <textarea 
                      id="booking-notes" 
                      v-model="bookingForm.notes" 
                      placeholder="Ví dụ: lực massage nhẹ/mạnh, vùng cơ nhức mỏi cần tập trung..."
                      rows="3"
                      class="w-full px-6 py-4 rounded-[1.5rem] border border-spa-primary/20 bg-transparent text-xs focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light resize-none"
                    ></textarea>
                  </div>

                  <!-- Review Box -->
                  <div class="p-5 border border-spa-primary/10 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-[1.5rem] space-y-2">
                    <span class="text-[9px] font-bold tracking-widest text-spa-primary uppercase block mb-1">Xác Nhận Lịch Hẹn</span>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-light text-spa-text-muted-dark dark:text-spa-text-muted-light">
                      <span>Liệu pháp:</span>
                      <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ currentSelectedTreatment ? currentSelectedTreatment.name : '' }}</span>
                      <span>Thời lượng:</span>
                      <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ bookingForm.duration }}</span>
                      <span>Ngày & Giờ:</span>
                      <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ bookingForm.date }} lúc {{ bookingForm.time }}</span>
                      <span>Chi phí:</span>
                      <span class="text-right font-bold text-spa-primary text-sm">${{ estimatedPrice }}</span>
                    </div>
                  </div>

                  <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                    <button 
                      type="button" 
                      @click="bookingStep = 2"
                      class="px-6 py-3 rounded-full border border-spa-primary/20 text-spa-text-dark dark:text-spa-text-light text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Quay lại
                    </button>
                    <button 
                      type="submit"
                      :disabled="!bookingForm.name || !bookingForm.phone"
                      class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Gửi Đăng Ký
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
            Món Quà Sức Khỏe & Thư Thái Dành Cho Người Thân Yêu
          </h3>
          <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
            Các mẫu voucher quà tặng được thiết kế tinh xảo. Hãy gửi tặng một liệu trình trị liệu hoặc gói phục hồi hoàn hảo đến những người bạn trân quý.
          </p>
        </div>
        <div>
          <button 
            @click="scrollToSection('contact')" 
            class="clay-pill-button px-8 py-4 text-xs cursor-pointer"
          >
            Liên Hệ
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
            <span class="text-[10px] font-bold tracking-[0.25em] text-spa-primary dark:text-spa-primary-light uppercase block mb-3">GET IN TOUCH</span>
            <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-6">
              Liên Hệ Với Chúng Tôi
            </h2>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light max-w-[42ch]">
              Ghé thăm không gian yên bình của chúng tôi hoặc liên hệ trực tiếp để được tư vấn các dịch vụ riêng biệt và đặt lịch nhóm.
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
                  <span class="text-[8px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">Gọi Điện Trực Tiếp</span>
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
                  <span class="text-[8px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">Địa Chỉ Spa</span>
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
                  <span class="text-[8px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">Gửi Email Liên Hệ</span>
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
            GỬI TIN NHẮN LIÊN HỆ
          </span>
          
          <form @submit.prevent class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label for="contact-name" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">Họ và Tên</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  required
                  placeholder="Nhập tên của bạn"
                  class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-white dark:bg-spa-bg-dark text-xs focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="contact-email" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">Địa Chỉ Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  required
                  placeholder="example@gmail.com"
                  class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-white dark:bg-spa-bg-dark text-xs focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-message" class="text-[9px] font-bold tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">Nội dung tin nhắn</label>
              <textarea 
                id="contact-message" 
                required
                placeholder="Nội dung bạn cần hỗ trợ..."
                rows="4"
                class="w-full px-5 py-4 rounded-[1.5rem] border border-spa-primary/20 bg-white dark:bg-spa-bg-dark text-xs focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light resize-none"
              ></textarea>
            </div>

            <div class="flex justify-end border-t border-spa-primary/10 pt-6">
              <button 
                type="submit" 
                @click.prevent="alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.')"
                class="clay-pill-button px-8 py-3.5 text-xs cursor-pointer"
              >
                Gửi Tin Nhắn
              </button>
            </div>
          </form>
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
              Đánh thức làn da và vẻ đẹp tự nhiên với liệu trình thẩm mỹ chuyên sâu chuẩn y khoa Hàn Quốc.
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
              ĐIỀU HƯỚNG
            </span>
            <nav class="flex flex-col gap-3.5">
              <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">Trang chủ</a>
              <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">Gói trị liệu</a>
              <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">Menu dịch vụ</a>
              <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary transition-colors">Liên hệ</a>
            </nav>
          </div>

          <!-- Column 3: Contact Info -->
          <div class="flex flex-col gap-5">
            <span class="text-[10px] font-bold tracking-widest uppercase text-spa-text-dark dark:text-spa-text-light">
              LIÊN HỆ
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
              ĐỊA CHỈ & GIỜ MỞ CỬA
            </span>
            <div class="flex flex-col gap-3.5 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed font-light">
              <span class="flex items-start gap-2.5">
                <IconMapPin class="w-4 h-4 shrink-0 mt-0.5" />
                <span>2/372 Chapel Road, Bankstown NSW, Australia</span>
              </span>
              <span class="block pl-6.5">
                Thứ 2 - Chủ Nhật: 9:00 - 20:00
              </span>
            </div>
          </div>

        </div>

        <!-- Copyright -->
        <div class="border-t border-spa-primary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span class="text-[9px] tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light font-medium">
            © 2026 Seoul K-Aesthetic. Bản quyền được bảo lưu.
          </span>
          <span class="text-[9px] tracking-widest uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light font-medium">
            K-Aesthetic Beauty & Wellness
          </span>
        </div>

      </div>
    </footer>

  </div>
</template>

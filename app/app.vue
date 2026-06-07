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
  IconSparkles
} from '@tabler/icons-vue'

// === Design Read (Section 0.B) ===
// Reading this as: luxury Korean spa landing page for beauty & wellness seekers, with a calm, premium-minimalist aesthetic, leaning toward Tailwind v4 utility styles + Cormorant Garamond serif headings + organic Sage green details.

// === Dials (Section 1) ===
// DESIGN_VARIANCE: 7 (Asymmetric grid layouts & offset elements)
// MOTION_INTENSITY: 5 (Fluid entry animations & smooth state changes)
// VISUAL_DENSITY: 3 (Spacious, breathable, art-gallery alignment)

// === SEO & Metadata ===
useHead({
  title: 'Seoul K-Aesthetic — Thẩm Mỹ Viện & Spa Làm Đẹp Chuẩn Hàn',
  meta: [
    { name: 'description', content: 'Trải nghiệm các liệu trình chăm sóc da, trị liệu và thẩm mỹ chuẩn y khoa Hàn Quốc tại Seoul K-Aesthetic Sydney. Chăm sóc da mặt chuyên sâu, phục hồi da K-Glow và xông hơi thải độc cao cấp.' },
    { name: 'keywords', content: 'spa han quoc, tham my han quoc, cham soc da seoul, spa sydney, cham soc da mat, yeosim aesthetic, spa tri lieu, lam dep sydney' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Seoul K-Aesthetic — Thẩm Mỹ Viện & Spa Làm Đẹp Chuẩn Hàn' },
    { property: 'og:description', content: 'Khám phá thiên đường làm đẹp và chăm sóc da hoàn hảo. Liệu trình tinh tế chuẩn y khoa Seoul cùng đội ngũ kỹ thuật viên chuyên nghiệp.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap' }
  ]
})

// === Theme Configuration (Dark / Light) ===
const darkTheme = ref(false)

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value
  localStorage.setItem('theme', darkTheme.value ? 'dark' : 'light')
}

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    darkTheme.value = true
  }
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
    description: 'Tẩy tế bào chết toàn thân tỉ mỉ kiểu Hàn Quốc loại bỏ da chết sần sùi + Liệu pháp massage tinh dầu Aroma phục hồi cơ thể sâu sắc.',
    image: '/images/package_aroma.png'
  },
  {
    price: '$165',
    title: 'Gói Chăm Sóc Da Mặt K-Glow & Spa',
    duration: 'Tổng cộng 90 phút',
    description: 'Liệu trình làm sạch sâu và cấp ẩm da mặt K-Glow giúp sáng mịn căng bóng + Massage body đá nóng trị liệu xua tan mệt mỏi.',
    image: '/images/package_kglow.png'
  },
  {
    price: '$225',
    title: 'Gói Thẩm Mỹ Luxury Queen',
    duration: 'Tổng cộng 120 phút',
    description: 'Trải nghiệm xông hơi thảo dược thư thái + Liệu trình nâng cơ trẻ hóa da mặt chuyên sâu + Massage trị liệu mô sâu giải tỏa cơ căng cứng.',
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
    details: 'Sự kết hợp hoàn hảo giữa nhiệt liệu pháp từ đá núi lửa tự nhiên và kỹ thuật miết huyệt y học cổ truyền. Hơi nóng thẩm thấu sâu vào tế bào giúp làm tan biến các vùng cơ xơ cứng, đồng thời thải độc và hỗ trợ hệ miễn dịch tự nhiên.',
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
  heroInterval = setInterval(() => {
    nextHeroSlide()
  }, 5000)
})

onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval)
})

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
  <div :class="{'dark': darkTheme}" class="min-h-[100dvh] flex flex-col font-sans antialiased bg-spa-bg-light dark:bg-spa-bg-dark text-spa-text-dark dark:text-spa-text-light transition-colors duration-500">
    
    <!-- === Sticky Header Navigation === -->
    <header class="sticky top-0 z-50 w-full transition-all duration-300 border-b border-spa-primary/10 bg-spa-bg-light/85 dark:bg-spa-bg-dark/85 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <!-- Logo -->
        <a href="#" @click.prevent="scrollToSection('hero')" class="flex items-center gap-2 group">
          <span class="font-serif text-2xl font-bold tracking-wide text-spa-primary dark:text-spa-primary-light">
            Seoul K-Aesthetic
          </span>
        </a>

        <!-- Desktop Links (Single line navigation, Section 4.7) -->
        <nav class="hidden md:flex items-center gap-10">
          <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-sm font-medium tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Trang chủ</a>
          <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-sm font-medium tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Gói trị liệu</a>
          <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-sm font-medium tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Menu dịch vụ</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-sm font-medium tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Liên hệ</a>
        </nav>

        <!-- Right Utilities -->
        <div class="hidden md:flex items-center gap-6">
          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-full hover:bg-spa-bg-light-alt dark:hover:bg-spa-bg-dark-alt text-spa-primary dark:text-spa-primary-light transition-all cursor-pointer"
            aria-label="Toggle visual theme"
          >
            <IconSun v-if="darkTheme" class="w-5 h-5" />
            <IconMoon v-else class="w-5 h-5" />
          </button>

          <!-- Unified Primary CTA (Reserve Session) -->
          <button 
            @click="scrollToSection('booking')" 
            class="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary text-spa-bg-light dark:text-spa-bg-dark transition-all duration-300 shadow-sm active:scale-98 cursor-pointer"
          >
            Đặt Lịch Hẹn
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center gap-4 md:hidden">
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-full text-spa-primary dark:text-spa-primary-light"
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
      <div v-if="mobileMenuOpen" class="fixed inset-x-0 top-20 z-40 md:hidden bg-spa-bg-light dark:bg-spa-bg-dark border-b border-spa-primary/10 shadow-lg px-6 py-8">
        <nav class="flex flex-col gap-6">
          <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-lg font-medium text-spa-text-dark dark:text-spa-text-light">Trang chủ</a>
          <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-lg font-medium text-spa-text-dark dark:text-spa-text-light">Gói trị liệu</a>
          <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-lg font-medium text-spa-text-dark dark:text-spa-text-light">Menu dịch vụ</a>
          <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-lg font-medium text-spa-text-dark dark:text-spa-text-light">Liên hệ</a>
          <button 
            @click="scrollToSection('booking')" 
            class="w-full mt-4 py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-spa-primary text-white dark:bg-spa-primary-light dark:text-spa-bg-dark text-center"
          >
            Đặt Lịch Hẹn
          </button>
        </nav>
      </div>
    </Transition>

    <!-- === Hero Section (Asymmetric Split Hero, Section 4.3 & 4.7) === -->
    <section id="hero" class="relative min-h-[90dvh] flex items-center py-12 overflow-hidden max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        
        <!-- Left Column (Hero Content) -->
        <div class="lg:col-span-6 flex flex-col items-start text-left z-10">
          
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-spa-primary dark:text-spa-primary-light bg-spa-primary/10 dark:bg-spa-primary-light/10 mb-6">
            <IconSparkles class="w-3.5 h-3.5" /> Thẩm Mỹ & Spa Làm Đẹp Chuẩn Hàn
          </span>

          <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-spa-text-dark dark:text-spa-text-light mb-6">
            Đánh Thức Làn Da & Vẻ Đẹp Tự Nhiên
          </h1>
          
          <p class="text-base md:text-lg text-spa-text-muted-dark dark:text-spa-text-muted-light max-w-[50ch] leading-relaxed mb-8">
            Trải nghiệm tinh hoa thẩm mỹ hiện đại kết hợp với các liệu pháp chăm sóc da chuyên sâu chuẩn y khoa Seoul. Chúng tôi đem lại vẻ đẹp rạng rỡ tự nhiên và sự thư giãn tuyệt đối cho cơ thể.
          </p>

          <div class="flex flex-wrap gap-4 mb-8">
            <button 
              @click="scrollToSection('booking')" 
              class="px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary dark:text-spa-bg-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
            >
              Đặt Lịch Hẹn
            </button>
            <button 
              @click="scrollToSection('treatment')" 
              class="px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider border border-spa-primary/20 hover:border-spa-primary text-spa-text-dark dark:text-spa-text-light hover:bg-spa-primary/5 dark:hover:bg-spa-primary-light/5 transition-all duration-300 active:scale-98 cursor-pointer"
            >
              Xem Menu Dịch Vụ
            </button>
          </div>

          <!-- Quick Contacts Metadata block -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-spa-primary/10 pt-8 w-full max-w-lg">
            <a href="tel:+61416145949" class="flex items-center gap-3 group">
              <span class="p-2.5 rounded-full bg-spa-primary/5 group-hover:bg-spa-primary/10 text-spa-primary dark:text-spa-primary-light transition-all">
                <IconPhone class="w-4 h-4" />
              </span>
              <span class="text-xs font-semibold tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light group-hover:text-spa-primary transition-colors">
                +61 416 145 949
              </span>
            </a>
            <a href="mailto:contact@seoulkaesthetic.com" class="flex items-center gap-3 group">
              <span class="p-2.5 rounded-full bg-spa-primary/5 group-hover:bg-spa-primary/10 text-spa-primary dark:text-spa-primary-light transition-all">
                <IconMail class="w-4 h-4" />
              </span>
              <span class="text-xs font-semibold tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light group-hover:text-spa-primary transition-colors truncate max-w-[200px]">
                contact@seoulkaesthetic.com
              </span>
            </a>
          </div>

        </div>

        <!-- Right Column (Hero Visual Frame - Dynamic Slit Carousel) -->
        <div class="lg:col-span-6 relative flex justify-center">
          <div class="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-spa-primary/10 group bg-[#110e0c]">
            
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
                  <!-- Overlay gradient for title legibility -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  
                  <img 
                    :src="slide.image" 
                    :alt="slide.title" 
                    class="w-full h-full object-cover transform scale-102 hover:scale-105 transition-transform duration-10000 ease-out"
                  />
                  
                  <!-- Rich Info Overlay -->
                  <div class="absolute bottom-0 inset-x-0 p-8 z-20 text-white flex flex-col gap-2">
                    <span class="text-[9px] tracking-widest uppercase font-semibold text-spa-primary-light">
                      Seoul K-Aesthetic Ambiance
                    </span>
                    <h3 class="font-serif text-2xl font-normal leading-tight text-white/95">
                      {{ slide.title }}
                    </h3>
                    <p class="text-xs text-white/75 max-w-[45ch] leading-relaxed">
                      {{ slide.description }}
                    </p>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- Navigation Arrows -->
            <button 
              @click="prevHeroSlide" 
              class="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/10 hover:border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer active:scale-90"
              aria-label="Slide trước"
            >
              <IconChevronLeft class="w-4 h-4" />
            </button>
            <button 
              @click="nextHeroSlide" 
              class="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/10 hover:border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer active:scale-90"
              aria-label="Slide tiếp theo"
            >
              <IconChevronRight class="w-4 h-4" />
            </button>

            <!-- Slide Indicators (Pagination) -->
            <div class="absolute bottom-8 right-8 z-30 flex gap-2">
              <button 
                v-for="(_, idx) in heroSlides" 
                :key="idx" 
                @click="selectHeroSlide(idx)"
                :class="[
                  currentHeroSlide === idx 
                    ? 'w-6 bg-spa-primary-light' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                ]"
                class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                :aria-label="'Go to slide ' + (idx + 1)"
              ></button>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- === Grand Opening Promotion Banner (Section 4.11 / Banned em-dash checklist) === -->
    <div class="w-full bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border-y border-spa-primary/10 py-6 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="font-serif text-xl md:text-2xl font-semibold tracking-wide text-spa-primary dark:text-spa-primary-light">
            Khuyến Mãi Khai Trương
          </span>
        </div>
        <div class="text-center md:text-right">
          <span class="text-sm font-medium tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light mr-4">
            Ưu Đãi Đặc Biệt
          </span>
          <span class="text-base font-bold text-spa-primary dark:text-spa-primary-light">
            Giảm ngay 20% cho tất cả dịch vụ trong suốt tháng 7 này
          </span>
        </div>
      </div>
    </div>

    <!-- === Packages Section (Section 4.7 / Bento rhythm) === -->
    <section id="packages" class="py-24 max-w-7xl mx-auto px-6">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-4">
          Nghi Thức Thư Giãn Tinh Tế
        </h2>
        <p class="text-sm tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase">
          Sự kết hợp hoàn hảo giữa các liệu pháp cho hành trình đánh thức giác quan
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div 
          v-for="(pkg, idx) in packages" 
          :key="idx"
          class="group flex flex-col bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-3xl overflow-hidden border border-spa-primary/5 shadow-sm hover:shadow-md hover:border-spa-primary/20 transition-all duration-300"
        >
          <!-- Package Image Frame -->
          <div class="w-full aspect-[16/10] overflow-hidden relative border-b border-spa-primary/5">
            <img 
              :src="pkg.image" 
              :alt="pkg.title" 
              class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <span class="absolute top-6 right-6 px-4 py-2 rounded-full font-serif text-lg font-bold text-spa-bg-light dark:text-spa-bg-dark bg-spa-primary dark:bg-spa-primary-light shadow-md">
              {{ pkg.price }}
            </span>
          </div>

          <!-- Package Details -->
          <div class="p-8 flex flex-col flex-grow items-start justify-between">
            <div>
              <span class="text-xs font-semibold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light mb-2 block">
                {{ pkg.duration }}
              </span>
              <h3 class="font-serif text-2xl font-normal text-spa-text-dark dark:text-spa-text-light mb-3">
                {{ pkg.title }}
              </h3>
              <p class="text-sm text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed mb-6">
                {{ pkg.description }}
              </p>
            </div>
            
            <button 
              @click="bookingForm.treatment = idx === 0 ? 'body-scrub' : 'facial-care'; scrollToSection('booking')" 
              class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              Đặt Gói Trị Liệu <IconChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- === Treatment Menu Section (Section 4.7 & 5.D / Interactive Picker) === -->
    <section id="treatment" class="py-24 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border-y border-spa-primary/10">
      <div class="max-w-7xl mx-auto px-6">
        
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-4">
            Bảng Giá & Menu Trị Liệu
          </h2>
          <p class="text-sm tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase">
            Các liệu trình được thiết kế cá nhân hóa giúp phục hồi tối ưu
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Treatment Left Navigation (Interactive Selector List) -->
          <div class="lg:col-span-5 flex flex-col gap-3">
            <button 
              v-for="treat in treatments" 
              :key="treat.id"
              @click="selectedTreatmentId = treat.id"
              :class="[
                selectedTreatmentId === treat.id 
                  ? 'bg-spa-primary text-white dark:bg-spa-primary-light dark:text-spa-bg-dark font-medium shadow-md' 
                  : 'hover:bg-spa-primary/5 dark:hover:bg-spa-primary-light/5 text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-text-dark dark:hover:text-spa-text-light border border-spa-primary/10'
              ]"
              class="w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer"
            >
              <span class="text-sm tracking-wide">{{ treat.name }}</span>
              <IconChevronRight 
                class="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" 
                :class="{'translate-x-1': selectedTreatmentId === treat.id}"
              />
            </button>
          </div>

          <!-- Treatment Details Display (With clean micro-motion) -->
          <div class="lg:col-span-7 bg-spa-bg-light dark:bg-spa-bg-dark border border-spa-primary/10 rounded-3xl p-8 lg:p-10 shadow-sm relative min-h-[420px] flex flex-col justify-between">
            <div class="absolute top-6 right-6 z-10">
              <span class="text-[10px] uppercase font-mono tracking-widest text-spa-primary/45 dark:text-spa-primary-light/45">
                Danh Mục
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch h-full w-full">
              <!-- Left side: Text Details -->
              <div class="md:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <h3 class="font-serif text-3xl font-normal text-spa-text-dark dark:text-spa-text-light mb-4">
                    {{ activeTreatment.name }}
                  </h3>
                  
                  <p class="text-sm text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed mb-6">
                    {{ activeTreatment.details }}
                  </p>

                  <!-- Benefits Checklist -->
                  <div class="mb-6">
                    <span class="text-xs font-semibold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light block mb-3">
                      Lợi Ích Của Liệu Trình
                    </span>
                    <ul class="space-y-2">
                      <li 
                        v-for="(benefit, bIdx) in activeTreatment.benefits" 
                        :key="bIdx"
                        class="flex items-start gap-2.5 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light"
                      >
                        <IconCheck class="w-4 h-4 text-spa-primary dark:text-spa-primary-light shrink-0 mt-0.5" />
                        <span>{{ benefit }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Durations and Prices Grid -->
                  <div class="mb-6">
                    <span class="text-xs font-semibold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light block mb-3">
                      Thời Gian & Bảng Giá Dịch Vụ
                    </span>
                    
                    <div class="grid grid-cols-2 gap-3">
                      <div 
                        v-for="(opt, idx) in activeTreatment.options" 
                        :key="idx"
                        class="flex items-center justify-between p-3.5 rounded-xl bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border border-spa-primary/5 hover:border-spa-primary/20 transition-all"
                      >
                        <span class="text-xs font-medium text-spa-text-muted-dark dark:text-spa-text-muted-light">
                          {{ opt.duration }}
                        </span>
                        <span class="text-sm font-bold text-spa-primary dark:text-spa-primary-light">
                          {{ opt.price }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Add-ons callout -->
                  <div class="flex items-center gap-3 p-3.5 rounded-xl bg-spa-primary/5 border border-spa-primary/10 mb-6">
                    <span class="flex h-2 w-2 rounded-full bg-spa-primary dark:bg-spa-primary-light shrink-0"></span>
                    <p class="text-[11px] font-medium text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed">
                      Tối ưu trải nghiệm massage của bạn với <strong class="text-spa-primary dark:text-spa-primary-light">Tinh Dầu Dừa Cao Cấp</strong> chỉ với <strong class="text-spa-primary dark:text-spa-primary-light">+$5</strong>. Chọn thêm tại Bước 2 đặt lịch.
                    </p>
                  </div>
                </div>

                <div class="flex justify-start">
                  <button 
                    @click="bookingForm.treatment = activeTreatment.id; scrollToSection('booking')"
                    class="px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary dark:text-spa-bg-dark transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    Đặt Lịch Trị Liệu Này
                  </button>
                </div>
              </div>

              <!-- Right side: Illustrative Treatment Image -->
              <div class="md:col-span-5 w-full aspect-square md:aspect-auto md:min-h-full rounded-2xl overflow-hidden border border-spa-primary/10 relative">
                <img 
                  :src="activeTreatment.image" 
                  :alt="activeTreatment.name" 
                  class="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700 absolute inset-0"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- === Commitment / Core Values Section (Section 4.7) === -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-4">
          Cam Kết Về Chất Lượng Dịch Vụ
        </h2>
        <p class="text-sm tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase">
          Kiến tạo không gian thư giãn an toàn, sạch sẽ và chuyên nghiệp
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Clean -->
        <div class="bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-2xl p-8 border border-spa-primary/5 flex flex-col justify-between min-h-[200px]">
          <div>
            <div class="flex items-center gap-1 mb-4 text-amber-500">
              <span class="text-xs font-bold tracking-widest mr-2 uppercase text-spa-primary dark:text-spa-primary-light bg-spa-primary/10 dark:bg-spa-primary-light/10 px-2 py-0.5 rounded">Vệ Sinh</span>
              <span>★★★★★</span>
            </div>
            <h3 class="font-serif text-xl font-normal mb-3 text-spa-text-dark dark:text-spa-text-light">Sạch Sẽ Tuyệt Đối</h3>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed">
              Chúng tôi duy trì tiêu chuẩn vệ sinh khắt khe nhất. Toàn bộ drap giường, dụng cụ và phòng ốc đều được khử trùng sạch sẽ trước mỗi liệu trình.
            </p>
          </div>
        </div>

        <!-- Service Mind -->
        <div class="bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-2xl p-8 border border-spa-primary/5 flex flex-col justify-between min-h-[200px]">
          <div>
            <div class="flex items-center gap-1 mb-4 text-amber-500">
              <span class="text-xs font-bold tracking-widest mr-2 uppercase text-spa-primary dark:text-spa-primary-light bg-spa-primary/10 dark:bg-spa-primary-light/10 px-2 py-0.5 rounded">Tận Tâm</span>
              <span>★★★★★</span>
            </div>
            <h3 class="font-serif text-xl font-normal mb-3 text-spa-text-dark dark:text-spa-text-light">Sự Đón Tiếp Ấm Áp</h3>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed">
              Tinh thần dịch vụ tận tụy được đặt lên hàng đầu. Đội ngũ nhân viên của chúng tôi luôn sẵn sàng lắng nghe và chăm sóc mọi nhu cầu của bạn.
            </p>
          </div>
        </div>

        <!-- Professional -->
        <div class="bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-2xl p-8 border border-spa-primary/5 flex flex-col justify-between min-h-[200px]">
          <div>
            <div class="flex items-center gap-1 mb-4 text-amber-500">
              <span class="text-xs font-bold tracking-widest mr-2 uppercase text-spa-primary dark:text-spa-primary-light bg-spa-primary/10 dark:bg-spa-primary-light/10 px-2 py-0.5 rounded">Trị Liệu</span>
              <span>★★★★★</span>
            </div>
            <h3 class="font-serif text-xl font-normal mb-3 text-spa-text-dark dark:text-spa-text-light">Kỹ Thuật Viên Chuyên Nghiệp</h3>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed">
              Các kỹ thuật viên được đào tạo chuyên sâu và liên tục để nắm vững các phương pháp phục hồi cơ thể tốt nhất.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- === Booking Section (Step-by-Step Interactive Form, Section 4.5) === -->
    <section id="booking" class="py-24 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border-t border-spa-primary/10">
      <div class="max-w-4xl mx-auto px-6">
        
        <div class="text-center mb-12">
          <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-4">
            Đặt Lịch Hẹn Trị Liệu
          </h2>
          <p class="text-sm tracking-wide text-spa-text-muted-dark dark:text-spa-text-muted-light uppercase">
            Đặt chỗ trực tuyến nhanh chóng với 3 bước đơn giản
          </p>
        </div>

        <!-- Inner Box -->
        <div class="bg-spa-bg-light dark:bg-spa-bg-dark border border-spa-primary/10 rounded-3xl p-8 lg:p-12 shadow-sm">
          
          <!-- Booking Success State (Section 4.5 Complete Loop) -->
          <div v-if="bookingSubmitted" class="text-center py-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-spa-primary/10 dark:bg-spa-primary-light/10 text-spa-primary dark:text-spa-primary-light mb-6">
              <IconCheck class="w-8 h-8" />
            </div>
            <h3 class="font-serif text-2xl font-normal text-spa-text-dark dark:text-spa-text-light mb-3">
              Đã Gửi Yêu Cầu Đặt Lịch
            </h3>
            <p class="text-sm text-spa-text-muted-dark dark:text-spa-text-muted-light max-w-[45ch] mx-auto leading-relaxed mb-6">
              Cảm ơn bạn, <strong>{{ bookingForm.name }}</strong>. Chúng tôi đã nhận được yêu cầu đặt lịch hẹn cho dịch vụ <strong>{{ currentSelectedTreatment ? currentSelectedTreatment.name : '' }}</strong> vào ngày <strong>{{ bookingForm.date }}</strong> lúc <strong>{{ bookingForm.time }}</strong>. Đội ngũ của chúng tôi sẽ liên hệ sớm để xác nhận lịch hẹn của bạn.
            </p>

            <!-- Ticket details -->
            <div class="max-w-md mx-auto p-6 rounded-2xl border border-spa-primary/10 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt text-left mb-8">
              <div class="flex items-center justify-between border-b border-spa-primary/15 pb-4 mb-4">
                <span class="text-xs font-semibold tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light">Mã Đặt Lịch Hẹn</span>
                <span class="text-sm font-bold font-mono text-spa-primary dark:text-spa-primary-light">{{ bookingReference }}</span>
              </div>
              <div class="space-y-2 text-xs">
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
                <div class="flex justify-between">
                  <span class="text-spa-text-muted-dark dark:text-spa-text-muted-light">Tổng chi phí dự kiến:</span>
                  <span class="font-bold text-spa-primary dark:text-spa-primary-light text-sm">${{ estimatedPrice }}</span>
                </div>
              </div>
            </div>

            <button 
              @click="resetBooking" 
              class="px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary dark:text-spa-bg-dark transition-all cursor-pointer"
            >
              Đặt Một Lịch Hẹn Mới
            </button>
          </div>

          <!-- Booking Step Forms -->
          <div v-else>
            
            <!-- Step Indicators -->
            <div class="flex items-center justify-between mb-10 max-w-md mx-auto">
              <div class="flex items-center gap-2">
                <span 
                  :class="[bookingStep >= 1 ? 'bg-spa-primary text-white dark:bg-spa-primary-light dark:text-spa-bg-dark' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                >
                  1
                </span>
                <span class="text-xs font-semibold tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light">Chọn dịch vụ</span>
              </div>
              <div class="h-[1px] flex-grow bg-spa-primary/10 mx-4"></div>
              <div class="flex items-center gap-2">
                <span 
                  :class="[bookingStep >= 2 ? 'bg-spa-primary text-white dark:bg-spa-primary-light dark:text-spa-bg-dark' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                >
                  2
                </span>
                <span class="text-xs font-semibold tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light">Thời gian</span>
              </div>
              <div class="h-[1px] flex-grow bg-spa-primary/10 mx-4"></div>
              <div class="flex items-center gap-2">
                <span 
                  :class="[bookingStep >= 3 ? 'bg-spa-primary text-white dark:bg-spa-primary-light dark:text-spa-bg-dark' : 'bg-spa-primary/10 text-spa-text-muted-dark']"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                >
                  3
                </span>
                <span class="text-xs font-semibold tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light">Xác nhận</span>
              </div>
            </div>

            <!-- Form Steps -->
            <form @submit.prevent="handleBookingSubmit" class="space-y-6">
              
              <!-- STEP 1: Select Treatment & Details -->
              <div v-if="bookingStep === 1" class="space-y-6">
                
                <div class="flex flex-col gap-2">
                  <label for="booking-treatment" class="text-xs font-semibold uppercase tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light">
                    Chọn Liệu Pháp Trị Liệu
                  </label>
                  <select 
                    id="booking-treatment" 
                    v-model="bookingForm.treatment"
                    class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm focus:outline-none focus:border-spa-primary focus:ring-1 focus:ring-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                  >
                    <option v-for="t in treatments" :key="t.id" :value="t.id" class="dark:bg-spa-bg-dark">
                      {{ t.name }}
                    </option>
                  </select>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="booking-duration" class="text-xs font-semibold uppercase tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light">
                    Chọn Thời Lượng
                  </label>
                  <select 
                    id="booking-duration" 
                    v-model="bookingForm.duration"
                    class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm focus:outline-none focus:border-spa-primary focus:ring-1 focus:ring-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                  >
                    <option v-for="opt in currentDurationOptions" :key="opt.duration" :value="opt.duration" class="dark:bg-spa-bg-dark">
                      {{ opt.duration }} — {{ opt.price }}
                    </option>
                  </select>
                </div>

                <!-- Add-ons Switch Option -->
                <div class="flex items-center justify-between p-5 rounded-2xl border border-spa-primary/10 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt">
                  <div class="flex flex-col gap-1 pr-4">
                    <span class="text-sm font-semibold text-spa-text-dark dark:text-spa-text-light">Thêm Tinh Dầu Dừa Cao Cấp</span>
                    <span class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light">Nâng cấp trải nghiệm massage của bạn (+ $5)</span>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="bookingForm.coconutOil" class="sr-only peer">
                    <div class="w-11 h-6 bg-spa-primary/25 rounded-full peer peer-focus:ring-2 peer-focus:ring-spa-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-spa-primary dark:peer-checked:bg-spa-primary-light"></div>
                  </label>
                </div>

                <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                  <div class="text-left">
                    <span class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light block">Tổng chi phí dự kiến</span>
                    <span class="text-xl font-bold text-spa-primary dark:text-spa-primary-light">${{ estimatedPrice }}</span>
                  </div>
                  <button 
                    type="button" 
                    @click="bookingStep = 2"
                    class="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary dark:text-spa-bg-dark transition-all cursor-pointer"
                  >
                    Chọn Ngày & Giờ
                  </button>
                </div>

              </div>

              <!-- STEP 2: Time & Date Selection -->
              <div v-if="bookingStep === 2" class="space-y-6">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div class="flex flex-col gap-2">
                    <label for="booking-date" class="text-xs font-semibold uppercase tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                      <IconCalendar class="w-4 h-4 text-spa-primary dark:text-spa-primary-light" /> Chọn Ngày Hẹn
                    </label>
                    <input 
                      type="date" 
                      id="booking-date" 
                      v-model="bookingForm.date"
                      required
                      class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm focus:outline-none focus:border-spa-primary focus:ring-1 focus:ring-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <label for="booking-time" class="text-xs font-semibold uppercase tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                      <IconClock class="w-4 h-4 text-spa-primary dark:text-spa-primary-light" /> Chọn Giờ Hẹn
                    </label>
                    <input 
                      type="time" 
                      id="booking-time" 
                      v-model="bookingForm.time"
                      required
                      class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm focus:outline-none focus:border-spa-primary focus:ring-1 focus:ring-spa-primary transition-all dark:text-spa-text-light cursor-pointer"
                    />
                  </div>

                </div>

                <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                  <button 
                    type="button" 
                    @click="bookingStep = 1"
                    class="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-spa-primary/20 text-spa-text-dark dark:text-spa-text-light transition-all cursor-pointer"
                  >
                    Quay lại
                  </button>
                  <button 
                    type="button" 
                    @click="bookingStep = 3"
                    :disabled="!bookingForm.date || !bookingForm.time"
                    class="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary dark:text-spa-bg-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Nhập Thông Tin Liên Hệ
                  </button>
                </div>

              </div>

              <!-- STEP 3: Customer Details & Confirm -->
              <div v-if="bookingStep === 3" class="space-y-6">
                
                <div class="flex flex-col gap-2">
                  <label for="booking-name" class="text-xs font-semibold uppercase tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                    <IconUser class="w-4 h-4 text-spa-primary dark:text-spa-primary-light" /> Họ và Tên
                  </label>
                  <input 
                    type="text" 
                    id="booking-name" 
                    v-model="bookingForm.name" 
                    placeholder="Nhập họ và tên của bạn" 
                    required
                    class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm focus:outline-none focus:border-spa-primary focus:ring-1 focus:ring-spa-primary transition-all dark:text-spa-text-light"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label for="booking-phone" class="text-xs font-semibold uppercase tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light flex items-center gap-1.5">
                    <IconPhone class="w-4 h-4 text-spa-primary dark:text-spa-primary-light" /> Số Điện Thoại
                  </label>
                  <input 
                    type="tel" 
                    id="booking-phone" 
                    v-model="bookingForm.phone" 
                    placeholder="Nhập số điện thoại liên hệ" 
                    required
                    class="w-full px-5 py-4 rounded-full border border-spa-primary/20 bg-transparent text-sm focus:outline-none focus:border-spa-primary focus:ring-1 focus:ring-spa-primary transition-all dark:text-spa-text-light"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label for="booking-notes" class="text-xs font-semibold uppercase tracking-wider text-spa-text-muted-dark dark:text-spa-text-muted-light">
                    Yêu Cầu Đặc Biệt (Không bắt buộc)
                  </label>
                  <textarea 
                    id="booking-notes" 
                    v-model="bookingForm.notes" 
                    placeholder="Ví dụ: lực massage nhẹ/mạnh, vùng cơ đau nhức cần tập trung..."
                    rows="3"
                    class="w-full px-5 py-4 rounded-3xl border border-spa-primary/20 bg-transparent text-sm focus:outline-none focus:border-spa-primary focus:ring-1 focus:ring-spa-primary transition-all dark:text-spa-text-light resize-none"
                  ></textarea>
                </div>

                <!-- Review and Submit Box -->
                <div class="p-5 rounded-2xl border border-spa-primary/10 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt text-left space-y-2">
                  <span class="text-xs font-semibold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light block mb-2">Thông Tin Lịch Hẹn</span>
                  <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light">
                    <span>Liệu pháp:</span>
                    <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ currentSelectedTreatment ? currentSelectedTreatment.name : '' }}</span>
                    <span>Thời lượng:</span>
                    <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ bookingForm.duration }}</span>
                    <span>Ngày & Giờ:</span>
                    <span class="text-right font-medium text-spa-text-dark dark:text-spa-text-light">{{ bookingForm.date }} lúc {{ bookingForm.time }}</span>
                    <span>Tổng chi phí:</span>
                    <span class="text-right font-bold text-spa-primary dark:text-spa-primary-light text-sm">${{ estimatedPrice }}</span>
                  </div>
                </div>

                <div class="flex justify-between items-center border-t border-spa-primary/10 pt-6">
                  <button 
                    type="button" 
                    @click="bookingStep = 2"
                    class="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-spa-primary/20 text-spa-text-dark dark:text-spa-text-light transition-all cursor-pointer"
                  >
                    Quay lại
                  </button>
                  <button 
                    type="submit"
                    :disabled="!bookingForm.name || !bookingForm.phone"
                    class="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary dark:text-spa-bg-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                  >
                    Gửi Yêu Cầu Đặt Lịch Hẹn
                  </button>
                </div>

              </div>

            </form>
          </div>

        </div>

      </div>
    </section>

    <!-- === Other Offerings: Gift Vouchers Section (Section 4.9 Content Density) === -->
    <section class="py-20 max-w-7xl mx-auto px-6">
      <div class="bg-spa-primary dark:bg-spa-primary-light rounded-3xl p-8 md:p-12 text-spa-bg-light dark:text-spa-bg-dark flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="text-center md:text-left">
          <span class="text-[10px] uppercase font-mono tracking-widest text-spa-bg-light/60 dark:text-spa-bg-dark/60 block mb-2">Voucher Quà Tặng Đang Có Sẵn</span>
          <h3 class="font-serif text-3xl md:text-4xl font-light tracking-tight mb-4">
            Món Quà Sức Khỏe & Thư Thái Dành Cho Người Thân Yêu
          </h3>
          <p class="text-xs md:text-sm text-spa-bg-light/80 dark:text-spa-bg-dark/80 max-w-[45ch] leading-relaxed">
            Các mẫu voucher quà tặng (bản in hoặc điện tử) được thiết kế tinh xảo. Hãy gửi tặng một liệu trình trị liệu hoặc gói phục hồi hoàn hảo đến những người bạn trân quý.
          </p>
        </div>
        <div>
          <button 
            @click="scrollToSection('contact')" 
            class="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-bg-light hover:bg-spa-bg-light/95 text-spa-primary dark:bg-spa-bg-dark dark:hover:bg-spa-bg-dark/95 dark:text-spa-primary-light transition-all duration-300 shadow-lg cursor-pointer"
          >
            Liên Hệ Nhận Voucher
          </button>
        </div>
      </div>
    </section>

    <!-- === Contact Section & Form (Section 4.5 & 4.7) === -->
    <section id="contact" class="py-24 max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Left: Contact Information Cards -->
        <div class="lg:col-span-5 space-y-8">
          <div>
            <h2 class="font-serif text-4xl md:text-5xl font-light tracking-tight text-spa-text-dark dark:text-spa-text-light mb-4">
              Liên Hệ Với Chúng Tôi
            </h2>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light tracking-wider uppercase leading-relaxed max-w-[40ch]">
              Ghé thăm không gian yên bình của chúng tôi hoặc liên hệ để được tư vấn các yêu cầu riêng biệt và đặt lịch nhóm.
            </p>
          </div>

          <!-- Contact items stack -->
          <div class="space-y-4">
            <!-- Phone -->
            <a href="tel:+61416145949" class="block p-6 rounded-2xl border border-spa-primary/5 hover:border-spa-primary/20 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt transition-all group">
              <div class="flex items-start gap-4">
                <span class="p-3 rounded-full bg-spa-primary/10 dark:bg-spa-primary-light/10 text-spa-primary dark:text-spa-primary-light group-hover:scale-110 transition-transform">
                  <IconPhone class="w-5 h-5" />
                </span>
                <div>
                  <span class="text-[10px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">Gọi Điện</span>
                  <span class="text-base font-bold text-spa-text-dark dark:text-spa-text-light group-hover:text-spa-primary transition-colors">+61 416 145 949</span>
                </div>
              </div>
            </a>

            <!-- Address -->
            <a href="https://maps.google.com/?q=2/372+Chapel+Road,+Bankstown+NSW,+Australia" target="_blank" class="block p-6 rounded-2xl border border-spa-primary/5 hover:border-spa-primary/20 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt transition-all group">
              <div class="flex items-start gap-4">
                <span class="p-3 rounded-full bg-spa-primary/10 dark:bg-spa-primary-light/10 text-spa-primary dark:text-spa-primary-light group-hover:scale-110 transition-transform">
                  <IconMapPin class="w-5 h-5" />
                </span>
                <div>
                  <span class="text-[10px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">Địa Chỉ</span>
                  <span class="text-xs font-bold text-spa-text-dark dark:text-spa-text-light group-hover:text-spa-primary transition-colors leading-relaxed">
                    2/372 Chapel Road, Bankstown NSW, Australia
                  </span>
                </div>
              </div>
            </a>

            <!-- Email -->
            <a href="mailto:contact@seoulkaesthetic.com" class="block p-6 rounded-2xl border border-spa-primary/5 hover:border-spa-primary/20 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt transition-all group">
              <div class="flex items-start gap-4">
                <span class="p-3 rounded-full bg-spa-primary/10 dark:bg-spa-primary-light/10 text-spa-primary dark:text-spa-primary-light group-hover:scale-110 transition-transform">
                  <IconMail class="w-5 h-5" />
                </span>
                <div>
                  <span class="text-[10px] uppercase font-mono tracking-widest text-spa-text-muted-dark dark:text-spa-text-muted-light block mb-1">Gửi Email</span>
                  <span class="text-xs font-bold text-spa-text-dark dark:text-spa-text-light group-hover:text-spa-primary transition-colors truncate block max-w-[240px] sm:max-w-none">
                    contact@seoulkaesthetic.com
                  </span>
                </div>
              </div>
            </a>
          </div>

        </div>

        <!-- Right: Inquiry / Contact Form -->
        <div class="lg:col-span-7 bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt rounded-3xl p-8 lg:p-10 border border-spa-primary/5">
          <span class="text-xs font-semibold uppercase tracking-wider text-spa-primary dark:text-spa-primary-light block mb-6">
            Gửi Tin Nhắn Cho Chúng Tôi
          </span>
          
          <form @submit.prevent class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label for="contact-name" class="text-xs font-medium text-spa-text-muted-dark dark:text-spa-text-muted-light">Họ và Tên</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  required
                  placeholder="Nhập tên của bạn"
                  class="w-full px-5 py-3.5 rounded-full border border-spa-primary/20 bg-spa-bg-light dark:bg-spa-bg-dark text-sm focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="contact-email" class="text-xs font-medium text-spa-text-muted-dark dark:text-spa-text-muted-light">Địa Chỉ Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  required
                  placeholder="example@gmail.com"
                  class="w-full px-5 py-3.5 rounded-full border border-spa-primary/20 bg-spa-bg-light dark:bg-spa-bg-dark text-sm focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="contact-message" class="text-xs font-medium text-spa-text-muted-dark dark:text-spa-text-muted-light">Chúng tôi có thể giúp gì cho bạn?</label>
              <textarea 
                id="contact-message" 
                required
                placeholder="Nội dung tin nhắn..."
                rows="4"
                class="w-full px-5 py-4 rounded-2xl border border-spa-primary/20 bg-spa-bg-light dark:bg-spa-bg-dark text-sm focus:outline-none focus:border-spa-primary transition-all dark:text-spa-text-light resize-none"
              ></textarea>
            </div>

            <div class="flex justify-end border-t border-spa-primary/10 pt-6">
              <button 
                type="submit" 
                @click.prevent="alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.')"
                class="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-spa-primary hover:bg-spa-primary-hover text-white dark:bg-spa-primary-light dark:hover:bg-spa-primary dark:text-spa-bg-dark transition-all cursor-pointer"
              >
                Gửi Tin Nhắn
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>

    <!-- === Footer Navigation === -->
    <footer class="w-full bg-spa-bg-light-alt dark:bg-spa-bg-dark-alt border-t border-spa-primary/10 py-16 mt-auto">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <!-- Column 1: Brand & About -->
          <div class="flex flex-col items-start gap-4">
            <span class="font-serif text-2xl font-bold tracking-wide text-spa-primary dark:text-spa-primary-light">
              Seoul K-Aesthetic
            </span>
            <p class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed max-w-[28ch]">
              Đánh thức làn da và vẻ đẹp tự nhiên với liệu trình thẩm mỹ chuyên sâu chuẩn y khoa Hàn Quốc.
            </p>
            
            <!-- Social Media Links -->
            <div class="flex items-center gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-full border border-spa-primary/10 hover:border-spa-primary/30 text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-all cursor-pointer" aria-label="Facebook">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-full border border-spa-primary/10 hover:border-spa-primary/30 text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-all cursor-pointer" aria-label="Instagram">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-full border border-spa-primary/10 hover:border-spa-primary/30 text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-all cursor-pointer" aria-label="TikTok">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation Links -->
          <div class="flex flex-col gap-4">
            <span class="text-xs font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light">
              Điều Hướng
            </span>
            <nav class="flex flex-col gap-3">
              <a href="#hero" @click.prevent="scrollToSection('hero')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Trang chủ</a>
              <a href="#packages" @click.prevent="scrollToSection('packages')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Gói trị liệu</a>
              <a href="#treatment" @click.prevent="scrollToSection('treatment')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Menu dịch vụ</a>
              <a href="#contact" @click.prevent="scrollToSection('contact')" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors">Liên hệ</a>
            </nav>
          </div>

          <!-- Column 3: Contact Info -->
          <div class="flex flex-col gap-4">
            <span class="text-xs font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light">
              Liên Hệ
            </span>
            <div class="flex flex-col gap-3">
              <a href="tel:+61416145949" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors flex items-center gap-2">
                <IconPhone class="w-4 h-4 shrink-0" />
                +61 416 145 949
              </a>
              <a href="mailto:contact@seoulkaesthetic.com" class="text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light hover:text-spa-primary dark:hover:text-spa-primary-light transition-colors flex items-center gap-2">
                <IconMail class="w-4 h-4 shrink-0" />
                contact@seoulkaesthetic.com
              </a>
            </div>
          </div>

          <!-- Column 4: Address & Hours -->
          <div class="flex flex-col gap-4">
            <span class="text-xs font-bold uppercase tracking-wider text-spa-text-dark dark:text-spa-text-light">
              Địa Chỉ & Giờ Mở Cửa
            </span>
            <div class="flex flex-col gap-3 text-xs text-spa-text-muted-dark dark:text-spa-text-muted-light leading-relaxed">
              <span class="flex items-start gap-2">
                <IconMapPin class="w-4 h-4 shrink-0 mt-0.5" />
                <span>2/372 Chapel Road, Bankstown NSW, Australia</span>
              </span>
              <span class="block pl-6">
                Thứ 2 - Chủ Nhật: 9:00 - 20:00
              </span>
            </div>
          </div>

        </div>

        <!-- Divider & Copyright -->
        <div class="border-t border-spa-primary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span class="text-[10px] tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
            © 2026 Seoul K-Aesthetic. Bản quyền được bảo lưu.
          </span>
          <span class="text-[10px] tracking-wider uppercase text-spa-text-muted-dark dark:text-spa-text-muted-light">
            Thiết kế bởi K-Aesthetic Beauty
          </span>
        </div>
      </div>
    </footer>

  </div>
</template>

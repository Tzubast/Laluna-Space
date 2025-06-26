<template>
  <div class="services-page">
    <AppNavbar />

    <!-- Hero Section -->
    <section class="hero" v-scroll-reveal>
      <div class="overlay">
        <div class="hero-content">
          <h1 class="h1-text">Our <em>Facility</em></h1>
          <p class="hero-subtitle">A contemporary living space that combines comfort with sophistication</p>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="main-content" v-scroll-reveal>
      <div class="content-container">
        <!-- Service Toggle Buttons -->
        <div class="service-toggle">
          <button 
            class="toggle-btn" 
            :class="{ active: activeService === 'main' }" 
            @click="switchService('main')"
          >
            MAIN HALL
          </button>
          <button 
            class="toggle-btn" 
            :class="{ active: activeService === 'vip' }" 
            @click="switchService('vip')"
          >
            VIP ROOM
          </button>
        </div>

        <!-- 3D Flip Container -->
        <div class="flip-container">
          <div class="flip-inner" :class="{ flipped: isFlipping }">
            <!-- Front Side (Current Service) -->
            <div class="flip-front">
              <div class="content-layout">
                <!-- Left Side - Signature Menu -->
                <div class="signature-menu">
                  <div class="menu-header">
                    <h2>Signature Menu</h2>
                    <span class="menu-badge">{{ currentServiceData.badge }}</span>
                  </div>
                  
                  <div class="menu-images">
                    <div class="main-image">
                      <img :src="currentServiceData.mainImage" :alt="currentServiceData.title" />
                    </div>
                    <div class="secondary-image">
                      <img :src="currentServiceData.secondaryImage" :alt="currentServiceData.title" />
                      <div class="reality-badge">Reality</div>
                    </div>
                  </div>
                </div>

                <!-- Right Side - Project Overview -->
                <div class="project-overview">
                  <h3>Project Overview</h3>
                  <p class="overview-description">
                    {{ currentServiceData.description }}
                  </p>
                  <p class="overview-details">
                    {{ currentServiceData.details }}
                  </p>

                  <!-- Project Information -->
                  <div class="project-info">
                    <h4>Project Information</h4>
                    <div class="info-grid">
                      <div class="info-item">
                        <span class="info-label">Category</span>
                        <span class="info-value">{{ currentServiceData.category }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Location</span>
                        <span class="info-value">{{ currentServiceData.location }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Area</span>
                        <span class="info-value">{{ currentServiceData.area }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Duration</span>
                        <span class="info-value">{{ currentServiceData.duration }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Complete</span>
                        <span class="info-value">{{ currentServiceData.complete }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Back Side (Hidden, used for flip animation) -->
            <div class="flip-back">
              <div class="content-layout">
                <!-- Same structure but for the other service -->
                <div class="signature-menu">
                  <div class="menu-header">
                    <h2>Signature Menu</h2>
                    <span class="menu-badge">{{ nextServiceData.badge }}</span>
                  </div>
                  
                  <div class="menu-images">
                    <div class="main-image">
                      <img :src="nextServiceData.mainImage" :alt="nextServiceData.title" />
                    </div>
                    <div class="secondary-image">
                      <img :src="nextServiceData.secondaryImage" :alt="nextServiceData.title" />
                      <div class="reality-badge">Reality</div>
                    </div>
                  </div>
                </div>

                <div class="project-overview">
                  <h3>Project Overview</h3>
                  <p class="overview-description">
                    {{ nextServiceData.description }}
                  </p>
                  <p class="overview-details">
                    {{ nextServiceData.details }}
                  </p>

                  <div class="project-info">
                    <h4>Project Information</h4>
                    <div class="info-grid">
                      <div class="info-item">
                        <span class="info-label">Category</span>
                        <span class="info-value">{{ nextServiceData.category }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Location</span>
                        <span class="info-value">{{ nextServiceData.location }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Area</span>
                        <span class="info-value">{{ nextServiceData.area }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Duration</span>
                        <span class="info-value">{{ nextServiceData.duration }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Complete</span>
                        <span class="info-value">{{ nextServiceData.complete }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gallery Section -->
        <div class="gallery-section">
          <h3>Other Menu</h3>
          <div class="other-menu-grid">
            <div class="menu-card" v-for="(item, index) in otherMenuItems" :key="index">
              <div class="menu-card-image">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="menu-card-content">
                <h4>{{ item.title }}</h4>
                <span class="menu-price">{{ item.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'ServicesPage',
  components: {
    AppFooter
  },
  directives: {
    scrollReveal: {
      mounted(el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
              el.style.opacity = 1;
              el.style.transform = 'translateY(0)';
              observer.unobserve(el);
            }
          },
          { threshold: 0.1 }
        );
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        observer.observe(el);
      }
    }
  },
  data() {
    return {
      activeService: 'main',
      isFlipping: false,
      serviceData: {
        main: {
          badge: 'Design',
          title: 'Main Hall',
          category: 'Design Interior',
          location: 'M R Houses',
          area: '450 m²',
          duration: '6 Weeks',
          complete: 'January 2024',
          mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          secondaryImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=300&h=200&fit=crop',
          description: 'Proyek desain ruang tidur modern ini berfokus pada menciptakan pengalaman kenyamanan dan gaya yang tidak terluas. Ruang ini memiliki furnitur yang dirancang khusus, bahan yang dipilih dengan cermat, dan palet warna canggih yang menciptakan suasana yang hangat dan mengundang.',
          details: 'Desainnya menggabungkan bahan-bahan alami, termasuk elemen kayu dan satin tekstur, untuk menambah kedamaian dan minat pada ruang. Pencahayaan ambient ditempatkan secara strategis untuk meningkatkan suasana ruangan dan menyoroti fitur desain utama.'
        },
        vip: {
          badge: 'Luxury',
          title: 'VIP Room',
          category: 'Luxury Suite',
          location: 'Premium Service',
          area: '120 m²',
          duration: '4 Weeks',
          complete: 'March 2024',
          mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
          secondaryImage: 'https://images.unsplash.com/photo-1578774204375-8e2dd12e09a8?w=300&h=200&fit=crop',
          description: 'Ruang VIP eksklusif yang menawarkan kemewahan dan privasi tingkat tinggi. Dirancang dengan material premium dan teknologi terdepan untuk memberikan pengalaman yang tak terlupakan bagi tamu istimewa.',
          details: 'Interior VIP room menghadirkan perpaduan sempurna antara kemewahan klasik dan sentuhan modern. Setiap detail dipilih dengan cermat untuk menciptakan atmosfer yang elegan dan nyaman, dilengkapi dengan layanan personal terbaik.'
        }
      },
      otherMenuItems: [
        {
          title: 'Nasi Goreng',
          price: '25K',
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop'
        },
        {
          title: 'Coffee Creamy Melt',
          price: '25K',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop'
        },
        {
          title: 'Milkosaurus',
          price: '27K',
          image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop'
        }
      ]
    };
  },
  computed: {
    currentServiceData() {
      return this.serviceData[this.activeService];
    },
    nextServiceData() {
      return this.serviceData[this.activeService === 'main' ? 'vip' : 'main'];
    }
  },
  methods: {
    switchService(service) {
      if (service !== this.activeService) {
        this.isFlipping = true;
        
        setTimeout(() => {
          this.activeService = service;
        }, 400);
        
        setTimeout(() => {
          this.isFlipping = false;
        }, 800);
      }
    }
  }
};
</script>

<style scoped>
/* Reset dan Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.services-page {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #000;
  color: white;
  overflow-x: hidden;
}

/* Scroll Reveal Animation */
section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s ease-out, transform 1s ease-out;
}

section[v-scroll-reveal].v-enter-active,
section[v-scroll-reveal].v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 0;
  padding-top: 80px;
  min-height: 100vh;
}

.overlay {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
  z-index: 2;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 300;
  letter-spacing: -2px;
  margin-bottom: 1.5rem;
  color: #ffffff;
  line-height: 1.1;
}

.hero-content h1 em {
  font-style: italic;
  color: #ffffff;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #cccccc;
  font-weight: 300;
  letter-spacing: 1px;
  max-width: 600px;
  margin: 0 auto;
}

/* Main Content */
.main-content {
  background-color: #000;
  padding: 80px 0;
  position: relative;
  z-index: 1;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Service Toggle */
.service-toggle {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 60px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0;
  overflow: hidden;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.toggle-btn {
  background-color: transparent;
  border: none;
  color: #cccccc;
  padding: 15px 30px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  white-space: nowrap;
  min-width: 120px;
}

.toggle-btn.active {
  background-color: rgba(255, 255, 255, 0.08);
  color: white;
}

.toggle-btn:hover:not(.active) {
  color: white;
  background-color: rgba(255, 255, 255, 0.05);
}

/* 3D Flip Container */
.flip-container {
  perspective: 1200px;
  width: 100%;
  margin-bottom: 80px;
  min-height: 600px;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;
}

.flip-inner.flipped {
  transform: rotateY(180deg);
}

.flip-front, 
.flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
}

.flip-front {
  transform: rotateY(0deg);
}

.flip-back {
  transform: rotateY(180deg);
}

/* Content Layout */
.content-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
  min-height: 500px;
}

/* Signature Menu */
.signature-menu {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 30px;
  height: fit-content;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
}

.menu-header h2 {
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  margin: 0;
}

.menu-badge {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 1px;
  white-space: nowrap;
}

.menu-images {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;
  height: 280px;
}

.main-image, 
.secondary-image {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.main-image img, 
.secondary-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-image:hover img, 
.secondary-image:hover img {
  transform: scale(1.05);
}

.reality-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 400;
}

/* Project Overview */
.project-overview {
  padding: 0;
  height: fit-content;
}

.project-overview h3 {
  font-size: 2rem;
  font-weight: 400;
  color: white;
  margin-bottom: 25px;
  letter-spacing: -1px;
}

.overview-description, 
.overview-details {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #cccccc;
  margin-bottom: 20px;
  text-align: justify;
}

.project-info {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 25px;
  margin-top: 30px;
}

.project-info h4 {
  font-size: 1.2rem;
  font-weight: 400;
  color: white;
  margin-bottom: 20px;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: #cccccc;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.info-value {
  color: white;
  font-weight: 400;
  font-size: 0.9rem;
  text-align: right;
}

/* Gallery Section */
.gallery-section {
  margin-top: 60px;
  clear: both;
}

.gallery-section h3 {
  font-size: 2rem;
  font-weight: 400;
  color: white;
  margin-bottom: 40px;
  text-align: center;
}

.other-menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.menu-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(255, 255, 255, 0.08);
}

.menu-card-image {
  height: 200px;
  overflow: hidden;
}

.menu-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.menu-card:hover .menu-card-image img {
  transform: scale(1.08);
}

.menu-card-content {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-card-content h4 {
  color: white;
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
}

.menu-price {
  color: #cccccc;
  font-size: 1rem;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-container {
    padding: 0 30px;
  }
  
  .content-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .flip-container {
    min-height: auto;
  }
  
  .other-menu-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .content-container {
    padding: 0 20px;
  }
  
  .main-content {
    padding: 60px 0;
  }
  
  .service-toggle {
    width: 100%;
    max-width: 400px;
  }
  
  .toggle-btn {
    flex: 1;
    padding: 12px 20px;
    font-size: 0.85rem;
    min-width: auto;
  }
  
  .signature-menu,
  .project-info {
    padding: 20px;
  }
  
  .menu-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .menu-images {
    grid-template-columns: 1fr;
    height: auto;
    gap: 15px;
  }
  
  .main-image,
  .secondary-image {
    height: 180px;
  }
  
  .project-overview h3 {
    font-size: 1.6rem;
  }
  
  .other-menu-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .gallery-section h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-top: 60px;
  }
  
  .hero-content {
    padding: 0 15px;
  }
  
  .main-content {
    padding: 40px 0;
  }
  
  .content-container {
    padding: 0 15px;
  }
  
  .service-toggle {
    margin-bottom: 40px;
  }
  
  .toggle-btn {
    padding: 10px 15px;
    font-size: 0.8rem;
  }
  
  .signature-menu,
  .project-info {
    padding: 15px;
  }
  
  .menu-header h2 {
    font-size: 1.3rem;
  }
  
  .project-overview h3 {
    font-size: 1.4rem;
  }
  
  .gallery-section {
    margin-top: 40px;
  }
  
  .gallery-section h3 {
    font-size: 1.4rem;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .info-value {
    text-align: left;
  }
}

/* Perbaikan untuk overflow dan z-index */
.flip-container {
  overflow: hidden;
}

.content-layout {
  position: relative;
  z-index: 1;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Preload images untuk menghindari flash */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>
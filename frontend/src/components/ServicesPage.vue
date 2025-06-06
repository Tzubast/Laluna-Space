<template>
  <div class="services-page">
    <AppNavbar />

    <!-- Hero Section -->
    <section class="hero" v-scroll-reveal>
      <div class="overlay">
        <div class="hero-content">
          <h1 class="h1-text"><strong>Our</strong> <em>Facility</em></h1>
          <p class="hero-subtitle">A contemporary living space that combines comfort with sophistication</p>
        </div>
      </div>
    </section>

    <!-- Services Selection -->
    <section class="services-selection" v-scroll-reveal>
      <div class="services-container">
        <div class="service-tabs">
          <button 
            class="service-tab" 
            :class="{ active: activeService === 'main' }" 
            @click="setActiveService('main')"
          >
            MAIN HALL
          </button>
          <button 
            class="service-tab" 
            :class="{ active: activeService === 'vip' }" 
            @click="setActiveService('vip')"
          >
            VIP ROOM
          </button>
        </div>

        <!-- 3D Flip Cards -->
        <div class="flip-cards-container">
          <div class="flip-card" v-for="(card, index) in currentServiceCards" :key="index">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img :src="card.image" :alt="card.title" />
                <div class="card-overlay">
                  <h3>{{ card.title }}</h3>
                  <span class="flip-indicator">Click to flip</span>
                </div>
              </div>
              <div class="flip-card-back">
                <div class="back-content">
                  <h3>{{ card.title }}</h3>
                  <ul>
                    <li v-for="feature in card.features" :key="feature">{{ feature }}</li>
                  </ul>
                  <div class="price">{{ card.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Overview -->
        <div class="project-overview">
          <h3>{{ activeService === 'main' ? 'Main Hall Overview' : 'VIP Room Overview' }}</h3>
          <div class="overview-content">
            <div class="overview-text">
              <p>{{ currentServiceDescription }}</p>
            </div>
            <div class="project-info">
              <h4>Project Information</h4>
              <div class="info-item">
                <span>Category</span>
                <span>{{ activeService === 'main' ? 'Event Space' : 'Premium Room' }}</span>
              </div>
              <div class="info-item">
                <span>Location</span>
                <span>La Luna Space</span>
              </div>
              <div class="info-item">
                <span>Area</span>
                <span>{{ activeService === 'main' ? '200 m²' : '50 m²' }}</span>
              </div>
              <div class="info-item">
                <span>Capacity</span>
                <span>{{ activeService === 'main' ? '100 People' : '10 People' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Slider -->
    <section class="gallery-slider" v-scroll-reveal>
      <div class="slider-container">
        <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 320}px)` }">
          <div class="slide-item" v-for="(image, index) in galleryImages" :key="index">
            <img :src="image" :alt="`Gallery ${index + 1}`" />
          </div>
        </div>
        <button class="slider-btn prev" @click="previousSlide">&lt;</button>
        <button class="slider-btn next" @click="nextSlide">&gt;</button>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'ServicesPage',
  components: {
    AppNavbar,
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
      currentSlide: 0,
      mainHallCards: [
        {
          title: 'Event Space',
          image: 'https://www.w3schools.com/howto/img_avatar.png',
          features: ['Professional Sound System', 'LED Lighting', 'Stage Area', 'Air Conditioning'],
          price: 'Rp 2,000,000/day'
        },
        {
          title: 'Catering Service',
          image: 'https://www.w3schools.com/howto/img_avatar2.png',
          features: ['Full Catering Menu', 'Professional Staff', 'Table Setup', 'Cleaning Service'],
          price: 'Rp 150,000/person'
        },
        {
          title: 'Audio Visual',
          image: 'https://www.w3schools.com/howto/img_avatar3.png',
          features: ['Projector & Screen', 'Wireless Microphones', 'Mixer Console', 'Technical Support'],
          price: 'Rp 500,000/day'
        },
        {
          title: 'Decoration',
          image: 'https://www.w3schools.com/howto/img_avatar4.png',
          features: ['Theme Decoration', 'Flower Arrangements', 'Backdrop Setup', 'Lighting Design'],
          price: 'Rp 1,000,000/event'
        }
      ],
      vipRoomCards: [
        {
          title: 'Premium Suite',
          image: 'https://www.w3schools.com/howto/img_avatar5.png',
          features: ['King Size Bed', 'Private Bathroom', 'Mini Bar', 'City View'],
          price: 'Rp 800,000/night'
        },
        {
          title: 'Business Center',
          image: 'https://www.w3schools.com/howto/img_avatar6.png',
          features: ['Meeting Table', 'Projector', 'High Speed WiFi', 'Whiteboard'],
          price: 'Rp 300,000/hour'
        },
        {
          title: 'Spa & Wellness',
          image: 'https://www.w3schools.com/css/img_5terre.jpg',
          features: ['Massage Service', 'Sauna Access', 'Relaxation Area', 'Aromatherapy'],
          price: 'Rp 400,000/session'
        },
        {
          title: 'Private Dining',
          image: 'https://www.w3schools.com/css/img_forest.jpg',
          features: ['Chef Service', 'Premium Menu', 'Wine Selection', 'Butler Service'],
          price: 'Rp 1,200,000/meal'
        }
      ],
      galleryImages: [
        'https://www.w3schools.com/css/img_5terre.jpg',
        'https://www.w3schools.com/css/img_forest.jpg',
        'https://www.w3schools.com/css/img_lights.jpg',
        'https://www.w3schools.com/css/img_mountains.jpg',
        'https://www.w3schools.com/howto/img_avatar.png',
        'https://www.w3schools.com/howto/img_avatar2.png',
        'https://www.w3schools.com/howto/img_avatar3.png'
      ]
    };
  },
  computed: {
    currentServiceCards() {
      return this.activeService === 'main' ? this.mainHallCards : this.vipRoomCards;
    },
    currentServiceDescription() {
      return this.activeService === 'main'
        ? 'Ruang acara utama yang luas dan modern, dilengkapi dengan fasilitas lengkap untuk berbagai jenis acara. Dengan kapasitas hingga 100 orang, ruang ini cocok untuk seminar, workshop, pesta, dan acara korporat.'
        : 'Ruang VIP eksklusif yang menawarkan privasi dan kemewahan. Dilengkapi dengan fasilitas premium dan layanan personal untuk pengalaman yang tak terlupakan.';
    }
  },
  methods: {
    setActiveService(service) {
      this.activeService = service;
    },
    nextSlide() {
      if (this.currentSlide < this.galleryImages.length - 3) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
    },
    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      } else {
        this.currentSlide = this.galleryImages.length - 3;
      }
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.services-page {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: black;
  color: white;
}

section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s ease-out, transform 1s ease-out;
  margin: 0;
}

section[v-scroll-reveal].v-enter-active,
section[v-scroll-reveal].v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Hero Section */
.hero {
  background-image: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  margin-top: -80px;
  padding-top: 80px;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.hero-content {
  text-align: center;
}

.hero-content h1 {
  font-size: 4rem;
  line-height: 1;
  letter-spacing: 0;
  margin-bottom: 1rem;
  color: #ffffff;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 2rem;
}

/* Services Selection */
.services-selection {
  background-color: #000;
  padding: 80px 0;
  min-height: auto;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.service-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
}

.service-tab {
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 15px 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 25px;
}

.service-tab.active,
.service-tab:hover {
  background-color: #4A90E2;
  border-color: #4A90E2;
}

/* 3D Flip Cards */
.flip-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.flip-card {
  background-color: transparent;
  width: 100%;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
}

.flip-card-front {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.flip-card-front img {
  width: 100%;
  height: 70%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.card-overlay h3 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.flip-indicator {
  color: #4A90E2;
  font-size: 0.9rem;
}

.flip-card-back {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-content {
  padding: 30px;
  text-align: left;
}

.back-content h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.back-content ul {
  list-style: none;
  margin-bottom: 20px;
}

.back-content li {
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.back-content li:before {
  content: "✓ ";
  color: #FFD700;
  font-weight: bold;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  color: #FFD700;
}

/* Project Overview */
.project-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.project-overview h3 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 30px;
  font-style: italic;
  grid-column: 1 / -1;
}

.overview-text p {
  font-size: 1rem;
  line-height: 1.6;
  color: #cccccc;
  text-align: justify;
}

.project-info {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
}

.project-info h4 {
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item span:first-child {
  color: #cccccc;
}

.info-item span:last-child {
  color: #ffffff;
  font-weight: 500;
}

/* Gallery Slider */
.gallery-slider {
  background-color: #000;
  padding: 80px 0;
  min-height: auto;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.slider-track {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
}

.slide-item {
  min-width: 300px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
}

.slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.slide-item:hover img {
  transform: scale(1.05);
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(74, 144, 226, 0.8);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.slider-btn:hover {
  background-color: #4A90E2;
}

.slider-btn.prev {
  left: 20px;
}

.slider-btn.next {
  right: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .services-container {
    padding: 0 20px;
  }
  
  .service-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .flip-cards-container {
    grid-template-columns: 1fr;
  }
  
  .project-overview {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .project-overview h3 {
    font-size: 2rem;
  }
  
  .slide-item {
    min-width: 250px;
  }
  
  .slider-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
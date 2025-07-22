<template>
  <div class="error-page">
    <AppNavbar />
    
    <!-- Maintenance Section -->
    <section class="error-hero" v-scroll-reveal>
      <div class="error-overlay">
        <div class="error-content">
          <div class="error-illustration">
            <div class="coffee-cup maintenance">
              <div class="cup-body"></div>
              <div class="cup-handle"></div>
              <div class="maintenance-icon">🔧</div>
            </div>
            <h1 class="error-code maintenance-text">MAINTENANCE</h1>
          </div>
          
          <div class="error-message">
            <h2><strong>Sedang Maintenance!</strong> <em>Upgrade sistem coffee shop</em></h2>
            <p>Kami sedang melakukan upgrade sistem untuk memberikan pengalaman yang lebih baik. 
               Seperti membersihkan mesin espresso, butuh waktu sebentar untuk hasil yang sempurna!</p>
            
            <div class="countdown" v-if="maintenanceEndTime">
              <h3>Estimasi selesai dalam:</h3>
              <div class="countdown-timer">
                <div class="time-unit">
                  <span class="time-value">{{ countdown.hours }}</span>
                  <span class="time-label">Jam</span>
                </div>
                <div class="time-unit">
                  <span class="time-value">{{ countdown.minutes }}</span>
                  <span class="time-label">Menit</span>
                </div>
                <div class="time-unit">
                  <span class="time-value">{{ countdown.seconds }}</span>
                  <span class="time-label">Detik</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="error-actions">
            <button class="btn-primary" @click="refreshPage">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Refresh
            </button>
            
            <button class="btn-secondary" @click="subscribeUpdates">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Notify Me
            </button>
          </div>
          
          <div class="suggestions">
            <h3>Ikuti media sosial kami untuk update:</h3>
            <div class="suggestion-cards">
              <div class="suggestion-card" @click="openSocialMedia('instagram')">
                <div class="suggestion-icon">📷</div>
                <span>Instagram</span>
              </div>
              <div class="suggestion-card" @click="openSocialMedia('whatsapp')">
                <div class="suggestion-icon">💬</div>
                <span>WhatsApp</span>
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
  name: 'MaintenancePage',
  components: {
    AppFooter
  },
  data() {
    return {
      maintenanceEndTime: null, // Set this to a future timestamp
      countdown: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      countdownInterval: null
    }
  },
  created() {
    // Example: maintenance will end in 2 hours
    this.maintenanceEndTime = new Date().getTime() + (2 * 60 * 60 * 1000);
    this.startCountdown();
  },
  beforeUnmount() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = this.maintenanceEndTime - now;
        
        if (distance > 0) {
          this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        } else {
          clearInterval(this.countdownInterval);
          this.countdown = { hours: 0, minutes: 0, seconds: 0 };
        }
      }, 1000);
    },
    refreshPage() {
      window.location.reload();
    },
    subscribeUpdates() {
      // Implement notification subscription
      alert('Anda akan dinotifikasi ketika maintenance selesai!');
    },
    openSocialMedia(platform) {
      const urls = {
        instagram: 'https://instagram.com/yourcoffeeshop',
        whatsapp: 'https://wa.me/yourphonenumber'
      };
      window.open(urls[platform], '_blank');
    }
  },
  directives: {
    scrollReveal: {
      mounted(el) {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.style.opacity = 1;
              el.style.transform = 'translateY(0)';
              observer.unobserve(el);
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      },
    },
  }
};
</script>
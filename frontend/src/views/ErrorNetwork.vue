<template>
  <div class="error-page">
    <AppNavbar />
    
    <!-- Network Error Section -->
    <section class="error-hero" v-scroll-reveal>
      <div class="error-overlay">
        <div class="error-content">
          <div class="error-illustration">
            <div class="coffee-cup offline">
              <div class="cup-body"></div>
              <div class="cup-handle"></div>
              <div class="wifi-icon">📶</div>
              <div class="wifi-slash">/</div>
            </div>
            <h1 class="error-code">OFFLINE</h1>
          </div>
          
          <div class="error-message">
            <h2><strong>Koneksi Terputus!</strong> <em>WiFi kafe sedang bermasalah</em></h2>
            <p>Sepertinya koneksi internet Anda terputus atau WiFi kafe sedang maintenance. 
               Coba periksa koneksi atau hubungkan ke jaringan lain.</p>
          </div>
          
          <div class="error-actions">
            <button class="btn-primary" @click="checkConnection">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              </svg>
              Cek Koneksi
            </button>
            
            <button class="btn-secondary" @click="goOfflineMenu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 14C19.5304 14 20.0391 14.2107 20.4142 14.5858C20.7893 14.9609 21 15.4696 21 16V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V16C3 15.4696 3.21071 14.9609 3.58579 14.5858C3.96086 14.2107 4.46957 14 5 14H19ZM19 14V10C19 7.79086 17.2091 6 15 6H9C6.79086 6 5 7.79086 5 10V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Menu Offline
            </button>
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
  name: 'ErrorNetworkPage',
  components: {
    AppFooter
  },
  methods: {
    checkConnection() {
      if (navigator.onLine) {
        this.$router.go(-1); // Go back to previous page
      } else {
        alert('Masih belum terhubung. Coba lagi dalam beberapa saat.');
      }
    },
    goOfflineMenu() {
      this.$router.push('/offline-menu');
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
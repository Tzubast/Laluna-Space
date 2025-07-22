<template>
  <div class="error-page">
    <AppNavbar />
    
    <!-- 403 Error Section -->
    <section class="error-hero" v-scroll-reveal>
      <div class="error-overlay">
        <div class="error-content">
          <div class="error-illustration">
            <div class="coffee-cup locked">
              <div class="cup-body"></div>
              <div class="cup-handle"></div>
              <div class="lock-icon">🔒</div>
            </div>
            <h1 class="error-code">403</h1>
          </div>
          
          <div class="error-message">
            <h2><strong>Akses Ditolak!</strong> <em>Area khusus barista</em></h2>
            <p>Sepertinya Anda mencoba masuk ke dapur khusus barista kami. 
               Area ini hanya untuk karyawan yang sudah terlatih menggunakan mesin espresso!</p>
          </div>
          
          <div class="error-actions">
            <button class="btn-primary" @click="goHome">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20A1 1 0 0 0 6 21H9M19 10L21 12M19 10V20A1 1 0 0 0 18 21H15M9 21V16A1 1 0 0 1 10 15H14A1 1 0 0 1 15 16V21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Kembali ke Area Umum
            </button>
            
            <button class="btn-secondary" @click="goToLogin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 3H19A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H15M10 17L15 12L10 7M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Login
            </button>
          </div>
          
          <div class="suggestions">
            <h3>Mungkin Anda sedang mencari:</h3>
            <div class="suggestion-cards">
              <div class="suggestion-card" @click="$router.push('/menu')">
                <div class="suggestion-icon">☕</div>
                <span>Menu</span>
              </div>
              <div class="suggestion-card" @click="$router.push('/about')">
                <div class="suggestion-icon">ℹ️</div>
                <span>About Us</span>
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
  name: 'Error403Page',
  components: {
    AppFooter
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goToLogin() {
      this.$router.push('/login');
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
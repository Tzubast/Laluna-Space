<template>
  <div class="error-page">
    <AppNavbar />
    
    <!-- 500 Error Section -->
    <section class="error-hero" v-scroll-reveal>
      <div class="error-overlay">
        <div class="error-content">
          <div class="error-illustration">
            <div class="coffee-cup">
              <div class="cup-body"></div>
              <div class="cup-handle"></div>
              <div class="steam broken-steam"></div>
              <div class="steam broken-steam"></div>
              <div class="steam broken-steam"></div>
            </div>
            <h1 class="error-code">500</h1>
          </div>
          
          <div class="error-message">
            <h2><strong>Aduh!</strong> <em>Server sedang bermasalah</em></h2>
            <p>Mesin espresso kami sedang mogok dan server ikut-ikutan error. 
               Tim teknisi kami sedang bekerja keras memperbaikinya!</p>
          </div>
          
          <div class="error-actions">
            <button class="btn-primary" @click="refreshPage">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 4V10H7M23 20V14H17M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Coba Lagi
            </button>
            
            <button class="btn-secondary" @click="goHome">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20A1 1 0 0 0 6 21H9M19 10L21 12M19 10V20A1 1 0 0 0 18 21H15M9 21V16A1 1 0 0 1 10 15H14A1 1 0 0 1 15 16V21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back to Home
            </button>
          </div>
          
          <div class="suggestions">
            <h3>Sementara menunggu, bagaimana kalau:</h3>
            <div class="suggestion-cards">
              <div class="suggestion-card" @click="$router.push('/menu')">
                <div class="suggestion-icon">☕</div>
                <span>Lihat Menu</span>
              </div>
              <div class="suggestion-card" @click="$router.push('/contact')">
                <div class="suggestion-icon">📞</div>
                <span>Hubungi Kami</span>
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
  name: 'Error500Page',
  components: {
    AppFooter
  },
  methods: {
    refreshPage() {
      window.location.reload();
    },
    goHome() {
      this.$router.push('/');
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
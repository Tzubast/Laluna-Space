<template>
  <div class="error-page">
    <AppNavbar />
    
    <!-- 404 Error Section -->
    <section class="error-hero" v-scroll-reveal>
      <div class="error-overlay">
        <div class="error-content">
          <div class="error-illustration">
            <div class="coffee-cup">
              <div class="cup-body"></div>
              <div class="cup-handle"></div>
              <div class="steam"></div>
              <div class="steam"></div>
              <div class="steam"></div>
            </div>
            <h1 class="error-code">404</h1>
          </div>
          
          <div class="error-message">
            <h2><strong>Oops!</strong> <em>Page not found</em></h2>
            <p>Sepertinya halaman yang Anda cari sedang break seperti mesin kopi kami yang rusak. 
               Tapi tenang, kopi kami tetap enak kok!</p>
          </div>
          
          <div class="error-actions">
            <button class="btn-primary" @click="goHome">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20A1 1 0 0 0 6 21H9M19 10L21 12M19 10V20A1 1 0 0 0 18 21H15M9 21V16A1 1 0 0 1 10 15H14A1 1 0 0 1 15 16V21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back to Home
            </button>
            
            <button class="btn-secondary" @click="goToMenu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              View Menu
            </button>
          </div>
          
          <!-- Suggested Pages -->
          <div class="suggestions">
            <h3>Atau mungkin Anda mencari ini?</h3>
            <div class="suggestion-cards">
              <div class="suggestion-card" @click="$router.push('/menu')">
                <div class="suggestion-icon">☕</div>
                <span>Menu</span>
              </div>
              <div class="suggestion-card" @click="$router.push('/about')">
                <div class="suggestion-icon">ℹ️</div>
                <span>About Us</span>
              </div>
              <div class="suggestion-card" @click="$router.push('/contact')">
                <div class="suggestion-icon">📞</div>
                <span>Contact</span>
              </div>
              <div class="suggestion-card" @click="$router.push('/services')">
                <div class="suggestion-icon">🛎️</div>
                <span>Services</span>
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
  name: 'Error404Page',
  components: {
    AppFooter
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goToMenu() {
      this.$router.push('/menu');
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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.error-page {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  background-color: #000;
  color: white;
  font-family: 'Inter', sans-serif;
}

.error-hero {
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -80px;
  padding-top: 80px;
}

.error-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.error-illustration {
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.coffee-cup {
  position: relative;
  width: 120px;
  height: 100px;
  margin-bottom: 20px;
}

.cup-body {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%);
  border-radius: 0 0 40px 40px;
  position: relative;
  margin: 0 auto;
  box-shadow: 
    inset -10px 0 20px rgba(0,0,0,0.3),
    0 10px 30px rgba(139, 69, 19, 0.3);
}

.cup-body::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 85px;
  height: 15px;
  background: linear-gradient(135deg, #654321 0%, #8B4513 100%);
  border-radius: 50%;
  box-shadow: inset 0 -5px 10px rgba(0,0,0,0.3);
}

.cup-body::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 60px;
  background: linear-gradient(135deg, #3E2723 0%, #5D4037 50%, #8D6E63 100%);
  border-radius: 0 0 35px 35px;
  box-shadow: inset 0 10px 20px rgba(0,0,0,0.5);
}

.cup-handle {
  position: absolute;
  right: -25px;
  top: 20px;
  width: 25px;
  height: 40px;
  border: 8px solid #8B4513;
  border-left: none;
  border-radius: 0 40px 40px 0;
  background: transparent;
}

.steam {
  position: absolute;
  width: 3px;
  height: 40px;
  background: linear-gradient(to top, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
  border-radius: 50%;
  animation: steam 2s ease-in-out infinite;
  opacity: 0.7;
}

.steam:nth-child(3) {
  left: 35px;
  top: -45px;
  animation-delay: 0s;
}

.steam:nth-child(4) {
  left: 45px;
  top: -50px;
  animation-delay: 0.5s;
  height: 35px;
}

.steam:nth-child(5) {
  left: 55px;
  top: -40px;
  animation-delay: 1s;
  height: 30px;
}

@keyframes steam {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
    opacity: 0;
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
    opacity: 0.7;
  }
}

.error-code {
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 900;
  color: #4A90E2;
  text-shadow: 
    0 0 20px rgba(74, 144, 226, 0.5),
    0 0 40px rgba(74, 144, 226, 0.3),
    0 0 80px rgba(74, 144, 226, 0.2);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 
      0 0 20px rgba(74, 144, 226, 0.5),
      0 0 40px rgba(74, 144, 226, 0.3),
      0 0 80px rgba(74, 144, 226, 0.2);
  }
  to {
    text-shadow: 
      0 0 30px rgba(74, 144, 226, 0.8),
      0 0 60px rgba(74, 144, 226, 0.5),
      0 0 100px rgba(74, 144, 226, 0.3);
  }
}

.error-message {
  margin-bottom: 3rem;
}

.error-message h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  color: #ffffff;
}

.error-message h2 strong {
  font-weight: bold;
}

.error-message h2 em {
  font-style: italic;
  color: #4A90E2;
}

.error-message p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #cccccc;
  max-width: 500px;
  margin: 0 auto;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  color: white;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

.suggestions {
  margin-top: 2rem;
}

.suggestions h3 {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-weight: normal;
}

.suggestion-cards {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.suggestion-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 100px;
}

.suggestion-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(74, 144, 226, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(74, 144, 226, 0.2);
}

.suggestion-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.suggestion-card span {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .error-content {
    padding: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .suggestion-cards {
    gap: 0.5rem;
  }
  
  .suggestion-card {
    min-width: 80px;
    padding: 0.75rem;
  }
}
</style>
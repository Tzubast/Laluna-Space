<template>
  <transition name="popup-fade" appear>
    <div v-if="isVisible" class="popup-overlay" @click="closePopup">
      <div class="popup-container" @click.stop>
        <!-- Close Button -->
        <button class="close-btn" @click="closePopup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- Popup Content -->
        <div class="popup-content">
          <div class="popup-image">
            <img :src="popupImage" alt="Popup Image" />
          </div>
          <div class="popup-text">
            <h3>{{ title }}</h3>
            <p>{{ description }}</p>
            <button v-if="buttonText" class="popup-cta-btn" @click="handleButtonClick">
              {{ buttonText }}
            </button>
          </div>
        </div>
        
        <!-- Auto-close timer indicator -->
        <div class="timer-bar">
          <div class="timer-progress" :style="{ width: timerProgress + '%' }"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupWidget',
  props: {
    title: {
      type: String,
      default: 'Welcome to La Luna Space'
    },
    description: {
      type: String,
      default: 'Discover our amazing menu and cozy atmosphere. Perfect place for coffee lovers!'
    },
    buttonText: {
      type: String,
      default: 'Explore Menu'
    },
    popupImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop'
    },
    autoCloseDelay: {
      type: Number,
      default: 5000 // 5 seconds
    },
    showOnMount: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isVisible: false,
      timerProgress: 100,
      autoCloseTimer: null,
      progressTimer: null
    }
  },
  mounted() {
    if (this.showOnMount) {
      // Small delay to ensure smooth entrance animation
      setTimeout(() => {
        this.showPopup();
      }, 500);
    }
  },
  beforeUnmount() {
    this.clearTimers();
  },
  methods: {
    showPopup() {
      this.isVisible = true;
      this.timerProgress = 100;
      this.startAutoCloseTimer();
      this.$emit('popup-opened');
    },
    closePopup() {
      this.isVisible = false;
      this.clearTimers();
      this.$emit('popup-closed');
    },
    startAutoCloseTimer() {
      // Auto-close timer
      this.autoCloseTimer = setTimeout(() => {
        this.closePopup();
      }, this.autoCloseDelay);
      
      // Progress bar animation
      const interval = 50; // Update every 50ms
      const steps = this.autoCloseDelay / interval;
      const decreasePerStep = 100 / steps;
      
      this.progressTimer = setInterval(() => {
        this.timerProgress -= decreasePerStep;
        if (this.timerProgress <= 0) {
          clearInterval(this.progressTimer);
        }
      }, interval);
    },
    clearTimers() {
      if (this.autoCloseTimer) {
        clearTimeout(this.autoCloseTimer);
        this.autoCloseTimer = null;
      }
      if (this.progressTimer) {
        clearInterval(this.progressTimer);
        this.progressTimer = null;
      }
    },
    handleButtonClick() {
      this.$emit('button-clicked');
      this.closePopup();
    },
    // Method to manually show popup (can be called from parent)
    show() {
      this.showPopup();
    },
    // Method to manually hide popup (can be called from parent)
    hide() {
      this.closePopup();
    }
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.popup-container {
  width: 660px;
  height: 360px;
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(40, 40, 40, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.popup-content {
  height: 100%;
  display: flex;
  flex-direction: row;
}

.popup-image {
  width: 55%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.popup-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.popup-image::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 30%;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent);
}

.popup-text {
  width: 45%;
  padding: 32px 28px 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.popup-text h3 {
  font-size: 1.6rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 12px;
  line-height: 1.2;
  font-family: 'Inter', sans-serif;
}

.popup-text h3 em {
  font-style: italic;
  color: #4A90E2;
}

.popup-text p {
  font-size: 0.9rem;
  color: #cccccc;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}

.popup-cta-btn {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: stretch;
  font-family: 'Inter', sans-serif;
}

.popup-cta-btn:hover {
  background: linear-gradient(135deg, #357ABD 0%, #2868A3 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);
}

.timer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
}

.timer-progress {
  height: 100%;
  background: linear-gradient(90deg, #4A90E2 0%, #357ABD 100%);
  transition: width 0.05s linear;
}

/* Animation transitions */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.popup-fade-enter-from .popup-container,
.popup-fade-leave-to .popup-container {
  opacity: 0;
  transform: scale(0.8) translateY(40px);
}

.popup-fade-enter-to .popup-container,
.popup-fade-leave-from .popup-container {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive design */
@media (max-width: 720px) {
  .popup-container {
    width: 90vw;
    max-width: 600px;
    height: 320px;
  }
  
  .popup-text {
    padding: 24px 20px;
  }
  
  .popup-text h3 {
    font-size: 1.4rem;
  }
  
  .popup-text p {
    font-size: 0.85rem;
  }
  
  .popup-cta-btn {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .popup-container {
    width: 95vw;
    height: 280px;
  }
  
  .popup-content {
    flex-direction: column;
  }
  
  .popup-image {
    width: 100%;
    height: 60%;
  }
  
  .popup-image::after {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    width: 100%;
    height: 40%;
    bottom: 0;
    right: auto;
  }
  
  .popup-text {
    width: 100%;
    height: 40%;
    padding: 16px 20px;
  }
  
  .popup-text h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
  
  .popup-text p {
    font-size: 0.8rem;
    margin-bottom: 12px;
  }
  
  .popup-cta-btn {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
}
</style>
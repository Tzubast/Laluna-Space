<template>
  <div class="landing-page">
    <AppNavbar />
    
    <!-- Hero Section -->
    <section class="hero" v-scroll-reveal>
      <div class="overlay">
        <div class="hero-content">
          <h1 class="h1-text"><strong>we're welcoming</strong> <em>you always</em></h1>
          <button class="explore-btn" @click="goToMenu">Explore Menu</button>
        </div>
      </div>
    </section>

<!-- About Us -->
<section class="about" v-scroll-reveal>
  <div class="about-container">
    <div class="about-header">
      <h2>ABOUT US</h2>
      <div class="blue-underline"></div>
    </div>
    <div class="about-content">
      <div class="about-image">
        <img :src="require('@/assets/about-img.png')" alt="cashier" class="about-img" />
      </div>
      <div class="about-text">
        <h3>Hello,<br />Welcome to <em>La Luna Space</em></h3>
        <p>
          <strong>Laluna Space</strong> adalah <strong>cafe nyaman di Malang</strong> yang menawarkan konsep ruang 
          <strong>hangat dan modern</strong> di lokasi strategis, ideal untuk bersantai, bekerja, atau berkumpul. 
          Dengan semangat "Mari Bersua", kami menyajikan <strong>beragam menu</strong> mulai dari hidangan berat hingga ringan dan minuman segar, 
          semua disiapkan dengan bahan berkualitas tinggi untuk kepuasan Anda. Tersedia area indoor dan semi outdoor yang luas, 
          menjadikan <strong>Laluna Space</strong> pilihan sempurna sebagai <strong>venue untuk acaramu di Malang</strong>, termasuk 
          <strong>meeting, konferensi, hingga pernikahan</strong>, dengan fasilitas fleksibel dan layanan personal demi pengalaman tak terlupakan.
        </p>
        <div class="stats">
          <div class="stat-item">
            <span class="count" data-target="50">0</span>
            <p>Food</p>
          </div>
          <div class="stat-item">
            <span class="count" data-target="50">0</span>
            <p>Beverage</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

 <!-- Testimonials -->
<section class="testimonials" v-scroll-reveal>
  <div class="testimonials-container">
    <h2>customer says</h2>
    <div class="testimonial-wrapper">
      <div class="testimonial-card" 
           v-for="(item, index) in loopingTestimonials" 
           :key="index">
        <div class="testimonial-header">
          <img :src="item.avatar" class="avatar" />
          <span class="customer-name">{{ item.name }}</span>
        </div>
        <p class="testimonial-text">"{{ item.text }}"</p>
      </div>
    </div>
  </div>
</section>

<!-- Gallery -->
<section class="gallery" v-scroll-reveal>
  <div class="gallery-container">
    <h2><strong>OUR</strong> <em>FACILITY</em></h2>
    
    <div class="gallery-grid">
      <div 
        class="gallery-card" 
        v-for="(item, index) in facilityItems" 
        :key="index"
        @click="handleFacilityClick(item)"
      >
        <div class="image-container">
          <img :src="item.image" :alt="item.title" />
          <div class="overlay-card">
            <div class="card-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- More Facilities Card -->
    <div 
      class="more-facilities-card" 
      @click="goToServices"
    >
      <div class="more-facilities-content">
        <div class="facilities-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 12L11 14L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>More Facilities</h3>
        <p>Ayo cek fasilitas kami yang lain</p>
        <div class="facilities-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 7H17V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Countdown Modal -->
    <div v-if="showCountdown" class="countdown-modal" @click="closeCountdown">
      <div class="countdown-content" @click.stop>
        <h3>Redirecting to Services...</h3>
        <div class="countdown-circle">
          <span class="countdown-number">{{ countdownValue }}</span>
        </div>
        <button @click="closeCountdown" class="close-countdown">Cancel</button>
      </div>
    </div>
  </div>
</section>

    <!-- Popup Widget -->
    <PopupWidget 
      ref="popupWidget"
      :title="popupConfig.title"
      :description="popupConfig.description"
      :button-text="popupConfig.buttonText"
      :popup-image="popupConfig.image"
      :auto-close-delay="popupConfig.autoCloseDelay"
      :show-on-mount="popupConfig.showOnMount"
      @popup-opened="onPopupOpened"
      @popup-closed="onPopupClosed"
      @button-clicked="onPopupButtonClicked"
    />
  </div>
  <AppFooter />
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import PopupWidget from '@/components/PopupWidget.vue'

export default {
  name: 'LandingPage',
  components: {
    AppFooter,
    PopupWidget
  },
  data() {
    return {
      testimonials: [
        {
          name: 'Nusa',
          avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXqDT7U06mYf-xjYqB1-d-mAhorzEearC9vaLmjYqKflaemxLef=w108-h108-p-rp-mo-ba5-br100',
          text: 'Enak banget buat WFC! Tempat bersih, sepi, luas dan tersedia banyak tempat parkir. Chicken Curry nya enak, suka katsu nya yang juicy. Pelayanan mereka ramah sekaliii. Kasir dan waitress nya ramah sangat. Karna tempatnya udah bagus, lebih baik penyajian untuk minuman nya pake gelas.'
        },
        {
          name: 'Nur Aisyah Ari Yusuf',
          avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUofvoEReqOoIfbwKOpNRV2ZZSwzgngW4kw7lHpf4QwMZuy4h1v=w108-h108-p-rp-mo-ba3-br100',
          text: 'Best place buat WFC. Parkiran luas, makanan minumannya enak & affordable, wifi kencang. Mantap pokoknya.'
        },
        {
          name: 'Putri Sadini',
          avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWUrxLu2MDd2yMO7JNrMFhHh7dLGukvbgjxX5wsBwN8xnbfHbdd=w108-h108-p-rp-mo-ba2-br100',
          text: 'Asli ini kafenya good bangett Kopi dan snacknya enak, harga ramah kantong untuk service dan tempat yg mewah. Suasananya juga nyaman. Baru sekali ke sini kukira harganya mahal" ternyata engga. Recommended banget👍🏻'
        },
        {
          name: 'Nareswara',
          avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUSOJ5icBB3YgdUMcWoUnjSCdwE8DJn_nT9BpOyan6BTPbbi24=w108-h108-p-rp-mo-br100',
          text: 'Tempat nya nyaman sekali untuk berkumpul. Vibe nya,pencahayaan nya,suhu ruangan nya,makanan dan minuman nya,tempat parkir nya juga cukup untuk lumayan banyak untuk mobil dan motor. Untuk tempat seperti ini harga nya sangat-sangat murah dan sangat layak. Tetap di pertahankan ya kualitas nya 👍🏻👍🏻'
        },
        {
          name: 'andy (aselimalang channel)',
          avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWJk-VxCraaFpet_NKgX48PKe8wuc1yjn2eK5VAFxxDnvL77c9BVg=w108-h108-p-rp-mo-ba6-br100',
          text: 'Tempat nyaman, makanan enak. Parkirnya juga luas, staf cukup ramah. Bisa juga digunakan untuk even atau acara lain, tersedia beberap ruang khusus'
        }
      ],
      facilityItems: [
        {
          title: "Hall",
          description: "Our Main Room",
          image: require('@/assets/hero-bg.png')
        },
        {
          title: "VIP Room",
          description: "Arsya & Nendra",
          image: require('@/assets/hero-bg.png')
        },
        {
          title: "Balkon",
          description: "Outdoor relaxing area",
          image: require('@/assets/hero-bg.png')
        }
      ],
      showCountdown: false,
      countdownValue: 3,
      countdownTimer: null,
      popupConfig: {
        title: 'Welcome to La Luna Space',
        description: 'Nikmati pengalaman kuliner yang tak terlupakan di tempat yang cozy dan nyaman. Dengan berbagai menu pilihan terbaik untuk food dan beverage!',
        buttonText: 'Explore Menu',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop&crop=center',
        autoCloseDelay: 5000,
        showOnMount: true
      }
    }
  },
  computed: {
    loopingTestimonials() {
      // Duplikat data untuk seamless looping animasi
      return [...this.testimonials, ...this.testimonials];
    }
  },
  methods: {
    goToMenu() {
      this.$router.push('/menu');
    },
    goToServices() {
      this.$router.push('/services');
    },
  handleFacilityClick() {
  this.startCountdown();
},
    startCountdown() {
      this.showCountdown = true;
      this.countdownValue = 3;
      
      this.countdownTimer = setInterval(() => {
        this.countdownValue--;
        if (this.countdownValue <= 0) {
          this.closeCountdown();
          this.goToServices();
        }
      }, 1000);
    },
    closeCountdown() {
      this.showCountdown = false;
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    },
    onPopupOpened() {
      console.log('Popup opened');
      document.body.classList.add('popup-active');
    },
    onPopupClosed() {
      console.log('Popup closed');
      document.body.classList.remove('popup-active');
    },
    onPopupButtonClicked() {
      console.log('Popup button clicked');
      this.goToMenu();
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
      }
    }
  },
  mounted() {
    const counters = document.querySelectorAll('.count');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-target');
          let count = 0;
          const increment = target / 300;
          const updateCount = () => {
            count += increment;
            if (count < target) {
              el.innerText = Math.ceil(count);
              requestAnimationFrame(updateCount);
            } else {
              el.innerText = target;
            }
          };
          updateCount();
          observer.unobserve(el);
        }
      });
    }, { threshold: 1.0 });

    counters.forEach(counter => observer.observe(counter));
  },
beforeUnmount() {
  if (this.countdownTimer) {
    clearInterval(this.countdownTimer);
  }
}
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: black;
  color: white;
}

.landing-page {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

section {
  width: 100%;
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

.h1-text {
  color: #ffffff;
}

.hero {
  background-image: url('@/assets/hero-bg.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  position: relative;
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
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
  font-size: clamp(1.5rem, 5vw, 2rem);
  line-height: 1.2;
  letter-spacing: 0;
  margin-bottom: 2rem;
}

.explore-btn {
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid white;
  color: white;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.explore-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.about {
  background-color: #000;
  padding: 80px 0;
  min-height: auto;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.about-header {
  text-align: left;
  margin-bottom: 60px;
}

.about-header h2 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  font-style: italic;
}

.blue-underline {
  width: 60px;
  height: 4px;
  background-color: #4A90E2;
  margin-top: 10px;
}

.about-content {
  display: flex;
  align-items: flex-start;
  gap: 80px;
  flex-wrap: wrap;
}

.about-image {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.about-img {
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
}

.about-text {
  flex: 1;
  text-align: right;
  min-width: 300px;
  padding-left: 40px;
}

.about-text h3 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #ffffff;
  margin-bottom: 30px;
  line-height: 1.2;
  font-weight: normal;
}

.about-text em {
  font-style: italic;
  color: #ffffff;
}

.about-text p {
  font-size: 1rem;
  line-height: 1.6;
  color: #cccccc;
  margin-bottom: 40px;
  text-align: justify;
}

.stats {
  display: flex;
  gap: 80px;
  justify-content: flex-end;
}

.stat-item {
  text-align: center;
}

.stat-item .count {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: bold;
  display: block;
  color: #ffffff;
  line-height: 1;
}

.stat-item p {
  font-size: 1rem;
  color: #ffffff;
  margin-top: 5px;
  margin-bottom: 0;
}

.testimonials {
  background-color: #000;
  padding: 80px 0;
  overflow: hidden;
  min-height: auto;
}

.testimonials-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
}

.testimonials h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #ffffff;
  margin-bottom: 60px;
  font-style: italic;
  font-weight: normal;
}

.testimonial-wrapper {
  display: flex;
  animation: slide 20s linear infinite;
  gap: 30px;
  width: calc(300px * 10 + 30px * 9);
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-300px * 5 - 30px * 4));
  }
}

.testimonial-card {
  width: 300px;
  min-width: 300px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 25px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.customer-name {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  font-style: italic;
}

.testimonial-text {
  color: #cccccc;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  font-style: italic;
}

.testimonial-wrapper:hover {
  animation-play-state: paused;
}

/* Gallery Section */
.gallery {
  background-color: #000;
  padding: 80px 0;
  min-height: auto;
}

.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.gallery h2 {
  font-size: clamp(2rem, 5vw, 3rem);
  color: #ffffff;
  margin-bottom: 50px;
  text-align: center;
}

.gallery h2 strong {
  font-weight: bold;
}

.gallery h2 em {
  font-style: italic;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
  transition: all 0.5s ease;
}

.gallery-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  opacity: 1;
  transform: scale(1);
}

.gallery-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
}

.image-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-card:hover .image-container img {
  transform: scale(1.1);
}

.overlay-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    transparent 0%, 
    transparent 50%, 
    rgba(0, 0, 0, 0.7) 80%, 
    rgba(0, 0, 0, 0.9) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-card:hover .overlay-card {
  opacity: 1;
}

.card-content h3 {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
  transform: translateY(10px);
  transition: transform 0.3s ease 0.1s;
}

.card-content p {
  color: #cccccc;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  transform: translateY(10px);
  transition: transform 0.3s ease 0.2s;
}

.gallery-card:hover .card-content h3,
.gallery-card:hover .card-content p {
  transform: translateY(0);
}

.view-all-btn {
  display: block;
  margin: 40px auto 0;
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  border: none;
  color: white;
  padding: 12px 35px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.view-all-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
  background: linear-gradient(135deg, #357ABD, #4A90E2);
}

.view-all-btn:active {
  transform: translateY(-1px);
}

/* Services Card Styling */
.services-card {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.services-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.services-card:hover::before {
  left: 100%;
}

.services-card:hover {
  transform: translateY(-12px) scale(1.05) !important;
  box-shadow: 0 20px 50px rgba(74, 144, 226, 0.3) !important;
}

.services-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  padding: 30px 20px;
  text-align: center;
  position: relative;
}

.services-icon {
  color: #ffffff;
  margin-bottom: 20px;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.services-card:hover .services-icon {
  transform: scale(1.1);
}

.services-content h3 {
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.services-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
  font-weight: 500;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.services-arrow {
  color: #ffffff;
  opacity: 0.8;
  transform: translateX(0) translateY(0);
  transition: all 0.3s ease;
}

.services-card:hover .services-arrow {
  opacity: 1;
  transform: translateX(5px) translateY(-2px);
}

.services-card:hover .services-content h3,
.services-card:hover .services-content p {
  transform: translateY(-3px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .about-image,
  .about-text {
    min-width: auto;
  }
  
  .about-text {
    text-align: left;
    padding-left: 0;
  }
  
  .stats {
    justify-content: center;
    gap: 40px;
  }
  
  .testimonials-container {
    padding: 0 20px;
  }
  
  .testimonial-card {
    width: 280px;
    min-width: 280px;
  }
  
  .testimonial-wrapper {
    width: calc(280px * 10 + 30px * 9);
  }
  
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-280px * 5 - 30px * 4));
    }
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .image-container {
    height: 200px;
  }
  
  .gallery-container {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .hero-content h1 {
    font-size: 1.5rem;
  }
  
  section {
    padding: 40px 15px;
  }
}
</style>
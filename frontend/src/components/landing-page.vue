<template>
  <div class="landing-page">
    <AppNavbar />
    <!-- Hero Section -->
    <section class="hero" v-scroll-reveal>
      <div class="overlay">
        <div class="hero-content">
          <h1 class="h1-text"><strong>we're welcoming</strong> <em>you always</em></h1>
          <button class="explore-btn">Explore Menu</button>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt lobortis volutpat. Mauris in faucibus nunc. Sed efficitur accumsan magna nec tempus. Pellentesque varius pulvinar justo nec convallis. Ut quis pharetra dolor, vitae rhoncus felis. Quisque egestas nunc dolor, in volutpat leo ornare quis. Aenean dapibus ex sed ex mattis, sit amet volutpat enim lacinia.</p>
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
      <!-- Original 5 cards -->
      <div class="testimonial-card" v-for="i in 5" :key="i">
        <div class="testimonial-header">
          <img src="https://www.w3schools.com/howto/img_avatar.png" class="avatar" />
          <span class="customer-name">sabrina</span>
        </div>
        <p class="testimonial-text">"kalau ditanya sesuai dari ekspetasi, malah melebihi ekspetasi awal stur"</p>
      </div>
      <!-- Duplicate 5 cards untuk seamless loop -->
      <div class="testimonial-card" v-for="i in 5" :key="i + 5">
        <div class="testimonial-header">
          <img src="https://www.w3schools.com/howto/img_avatar.png" class="avatar" />
          <span class="customer-name">sabrina</span>
        </div>
        <p class="testimonial-text">"kalau ditanya sesuai dari ekspetasi, malah melebihi ekspetasi awal stur"</p>
      </div>
    </div>
  </div>
</section>

    <!-- Gallery -->
   <section class="gallery" v-scroll-reveal>
    <div class="gallery-container">
      <h2><strong>OUR</strong> <em>FACILITY</em></h2>
      
      <div class="gallery-grid" :class="{ 'expanded': showAllPhotos }">
        <div 
          class="gallery-card" 
          v-for="(item, index) in displayedItems" 
          :key="index"
          :class="{ 'hidden-item': index >= 5 && !showAllPhotos }"
        >
          <div class="image-container">
            <img :src="item.image" :alt="item.title" />
            <div class="overlay">
              <div class="card-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        class="view-all-btn" 
        @click="toggleGallery"
        :class="{ 'expanded': showAllPhotos }"
      >
        {{ showAllPhotos ? 'Show Less' : 'View All Gallery' }}
      </button>
    </div>
  </section>
  </div>
      <AppFooter />
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'LandingPage',
   components: {
    AppFooter
  },
  directives: {
    scrollReveal: {
      mounted(el) {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
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

.h1-text {
  color: #ffffff;
}

.hero {
  background-image: url('@/assets/hero-bg.png');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  /* Kompensasi tinggi navbar agar hero section tidak tertutup */
  margin-top: -80px; /* Sesuaikan dengan tinggi navbar */
  padding-top: 80px; /* Sesuaikan dengan tinggi navbar */
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
  font-size: 32px;
  line-height: 1;
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
  transition: background-color 0.3s ease;
}

.explore-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
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
}

.about-header {
  text-align: left;
  margin-bottom: 60px;
}

.about-header h2 {
  font-size: 3rem;
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
  min-width: 400px;
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
  min-width: 400px;
  padding-left: 40px;
}

.about-text h3 {
  font-size: 2.5rem;
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
  font-size: 4rem;
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
  
  .about-header h2 {
    font-size: 2.5rem;
  }
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
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 60px;
  font-style: italic;
  font-weight: normal;
}

.testimonial-wrapper {
  display: flex;
  animation: slide 20s linear infinite;
  gap: 30px;
  width: calc(300px * 10 + 30px * 9); /* Width untuk 10 cards + gaps */
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-300px * 5 - 30px * 4)); /* Geser sebesar 5 cards + gaps */
  }
}

.testimonial-card {
  width: 300px;
  min-width: 300px; /* Prevent shrinking */
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 25px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0; /* Prevent cards from shrinking */
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

/* Pause animation on hover */
.testimonial-wrapper:hover {
  animation-play-state: paused;
}

@media (max-width: 768px) {
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
  
  .testimonials h2 {
    font-size: 2rem;
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.gallery-item {
  position: relative;
}

.gallery-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.caption {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 4px 8px;
  border-radius: 4px;
}

.view-all {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
}
</style>
<template>
  <div class="landing-page">
    <!-- Section 1: Hero -->
    <section class="hero">
    <div class="overlay">
      <div class="header">LA LUNA SPACE</div>
      <div class="content">
        <p class="hero-text">
          we’re <strong>welcoming</strong> you <em>always</em>
        </p>
        <button class="explore-btn">Explore Menu</button>
      </div>
    </div>
  </section>

    <!-- Section 2: About Us -->
<section id="about" class="about" v-scroll-reveal>
  <h2><strong>About</strong> <em>Us</em></h2>
  <div class="about-content">
    <img src="@/assets/about-img.png" alt="About Us" class="about-img" />
    <div class="about-text">
      <h3><strong>Hello,</strong><br />Welcome to <em>La Luna Space</em>.</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div class="stats">
        <div>
          <span id="foodCount">0</span>
          <p>Food</p>
        </div>
        <div>
          <span id="beverageCount">0</span>
          <p>Beverage</p>
        </div>
      </div>
    </div>
  </div>
</section>



    <!-- Between Section 2-3: Customer Says -->
    <section class="testimonials" v-scroll-reveal>
      <h2>Customer Says</h2>
      <div class="testimonial-wrapper">
        <div class="testimonial-card" v-for="i in 20" :key="i">
          <img src="https://www.w3schools.com/howto/img_avatar.png" class="avatar" />
          <div>
            <h4>Customer {{ i }}</h4>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Gallery -->
    <section class="gallery" v-scroll-reveal>
      <h2><strong>OUR</strong> <em>FACILITY</em></h2>
      <div class="gallery-grid">
        <div class="gallery-item" v-for="i in 9" :key="i">
          <img src="https://www.w3schools.com/w3images/lights.jpg" alt="Gallery Image" />
          <div class="caption">Dump {{ i }}</div>
        </div>
      </div>
      <button class="view-all">View All Gallery</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  mounted() {
    const counters = document.querySelectorAll('.count');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-target');
          let count = 0;
          const increment = target / 100;
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
    }, {
      threshold: 1.0
    });

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }
};
</script>

<style>
body {
  margin: 0;
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
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

section[v-scroll-reveal].v-enter-active,
section[v-scroll-reveal].v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.hero {
  background-image: url('@/assets/hero-bg.png'); /* ganti dengan file gambar hero baru */
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  line-height: 1;
  letter-spacing: 0;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* sedikit overlay agar teks lebih kontras */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
}

.header {
  color: white;
  font-size: 1.25rem;
  font-weight: 300;
}

.content {
  text-align: center;
  margin-bottom: 5rem;
}

.hero-text {
  font-size: 2rem;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1;
}

.hero-text strong {
  font-weight: bold;
}

.hero-text em {
  font-style: italic;
}

.hero-content h1 {
  font-size: 32px;
  line-height: 1;
  letter-spacing: 0;
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

.about-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.about-img {
  width: 596px;
  height: 342px;
  object-fit: cover;
}

.about h2 {
  align-self: flex-start;
  font-size: 20px;
  font-style: italic;
  margin-bottom: 20px;
}

.about h2 strong {
  font-style: normal;
}

.about-text {
  max-width: 639px;
  text-align: right;
}

.about-text h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.about-text h3 em {
  font-style: italic;
}

.about-text p {
  font-size: 14px;
  line-height: 1.6;
}

.stats {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.stats div {
  text-align: center;
}

.stats span {
  font-size: 48px;
  display: block;
}

.testimonials {
  overflow: hidden;
}

.testimonial-wrapper {
  display: flex;
  gap: 20px;
  animation: scroll-left 30s linear infinite;
}

.testimonial-card {
  display: flex;
  align-items: center;
  width: 318px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.08);
  padding: 10px;
  border-radius: 8px;
  gap: 10px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-2000px); }
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

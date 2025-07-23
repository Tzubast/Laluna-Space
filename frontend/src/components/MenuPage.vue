<template>
  <div class="menu-page">
    <AppNavbar />

    <!-- Section 1: Header -->
    <section class="menu-header" v-scroll-reveal>
      <div class="menu-header-content">
        <h1>Our Menu</h1>
        <p>Explore our menu and choose which of favorite one</p>
      </div>
    </section>

    <!-- Section 2: Category Filter -->
    <section class="menu-filter" v-scroll-reveal>
      <div class="filter-container">
        <!-- Category Filter Button -->
<button 
  v-for="category in categories" 
  :key="category.id"
  :class="[
    'filter-btn', 
    { active: selectedCategory === category.id },
    { morning: category.id === 'morning' }
  ]"
  @click="selectCategory(category.id)"
>
  <span v-if="category.id === 'morning'" class="sun-icon"></span>
  {{ category.name }}
</button>
      </div>
    </section>

    <!-- Section 3: Menu Grid -->
    <section class="menu-grid-section" v-scroll-reveal>
      <div class="menu-grid">
        <div 
  v-for="item in filteredMenu" 
  :key="item.id"
  :class="['menu-item', { 'morning-only': item.category === 'morning' }]"
>
  <div class="menu-item-image">
    <img :src="item.image" :alt="item.name" />
  </div>
  <div v-if="item.category !== 'morning'" class="menu-item-content">
    <h3>{{ item.name }}</h3>
    <p class="menu-item-description">{{ item.description }}</p>
    <div class="menu-item-price">{{ item.price }}</div>
  </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MenuPage',
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
  data() {
    return {
      selectedCategory: 'all',
      categories: [
        { id: 'all', name: 'All Menu' },
        { id: 'coffee-based', name: 'Coffee Based' },
        { id: 'flavor-latte', name: 'Flavor Latte' },
        { id: 'non-coffee', name: 'Non Coffee' },
        { id: 'smoothies', name: 'Smoothies' },
        { id: 'refreshner', name: 'Refreshner' },
        { id: 'frappe', name: 'Frappe' },
        { id: 'tea-based', name: 'Tea Based' },
        { id: 'snack', name: 'Snack' },
        { id: 'platter', name: 'Platter' },
        { id: 'wingers', name: 'Wingers' },
        { id: 'western', name: 'Western' },
        { id: 'spaghetti', name: 'Spaghetti / Fettucine' },
        { id: 'nasi-goreng', name: 'Nasi Goreng' },
        { id: 'rice-bowl', name: 'Rice Bowl' },
        { id: 'indonesia', name: 'Indonesia Cuisine' },
        { id: 'dessert', name: 'Dessert' },
        { id: 'morning', name: 'Morning Choice' }
      ],
      menuItems: []
    };
  },
  created() {
    this.menuItems = this.generateMenuItems();
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    },
    generateMenuItems() {
      const items = [];
      const categoriesWithCount = {
        'coffee-based': 4,
        'flavor-latte': 8,
        'non-coffee': 6,
        'smoothies': 3,
        'refreshner': 5,
        'frappe': 3,
        'tea-based': 5,
        'snack': 12,
        'platter': 3,
        'wingers': 2,
        'western': 2,
        'spaghetti': 2,
        'nasi-goreng': 4,
        'rice-bowl': 10,
        'indonesia': 3,
        'dessert': 7,
        'morning': 1,
      };

      let idCounter = 1;
      for (const [category, count] of Object.entries(categoriesWithCount)) {
        for (let i = 1; i <= count; i++) {
          items.push({
            id: idCounter++,
            name: `${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${i}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: `${15 + Math.floor(Math.random() * 20)}K`,
            category: category,
            image: `https://source.unsplash.com/400x300/?food,drink&sig=${idCounter}`
          });
        }
      }

      return items;
    }
  },
  computed: {
    filteredMenu() {
      if (this.selectedCategory === 'all') {
        return this.menuItems;
      }
      return this.menuItems.filter(item => item.category === this.selectedCategory);
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

  .menu-page {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: black;
    color: white;
    min-height: 100vh;
  }

  section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.9s ease-out, transform 1s ease-out;
  }

  section[v-scroll-reveal].v-enter-active,
  section[v-scroll-reveal].v-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  /* Section 1: Header */
  .menu-header {
    background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), 
                url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop') center/cover;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: -80px;
    padding-top: 80px;
    position: relative;
  }

  .menu-header-content h1 {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  .menu-header-content p {
    font-size: 1.2rem;
    color: #cccccc;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Section 2: Filter */
  .menu-filter {
    background-color: #000;
    padding: 60px 0;
    min-height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .filter-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .filter-btn {
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .filter-btn:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .filter-btn.active {
    background-color: #4A90E2;
    border-color: #4A90E2;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  }

  /* Section 3: Menu Grid */
  .menu-grid-section {
    background-color: #000;
    padding: 80px 0;
    min-height: auto;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .menu-item {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .menu-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .menu-item-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
  }

  .menu-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .menu-item:hover .menu-item-image img {
    transform: scale(1.05);
  }

  .menu-item-content {
    padding: 25px;
  }

  .menu-item-content h3 {
    font-size: 1.4rem;
    color: #ffffff;
    margin-bottom: 8px;
    font-weight: 600;
  }

  .menu-item-description {
    color: #cccccc;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .menu-item-price {
    font-size: 1.3rem;
    font-weight: bold;
    color: #4A90E2;
    text-align: right;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .menu-header-content h1 {
      font-size: 2.5rem;
    }
    
    .menu-header-content p {
      font-size: 1rem;
      padding: 0 20px;
    }
    
    .filter-container {
      padding: 0 15px;
    }
    
    .filter-btn {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
    
    .menu-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 0 20px;
    }
    
    .menu-item {
      max-width: 100%;
    }
    
    .menu-filter {
      padding: 40px 0;
    }
    
    .menu-grid-section {
      padding: 60px 0;
    }
  }
   /* Matahari animasi */
.sun-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
  animation: sunPulse 2s infinite ease-in-out;
  margin-right: 8px;
  display: inline-block;
}

@keyframes sunPulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}

/* Button khusus Morning */
.filter-btn.morning {
  background: linear-gradient(45deg, #FFF8DC, #FFD700);
  color: #000;
  font-weight: bold;
  border-color: #FFD700;
  position: relative;
  overflow: hidden;
}
/* Ukuran khusus Morning */
.menu-item.morning-only .menu-item-image {
  width: 421px;
  height: 759px;
  margin: 0 auto;
}
  @media (max-width: 480px) {
    .menu-header {
      height: 50vh;
    }
    
    .menu-header-content h1 {
      font-size: 2rem;
    }
    
    .filter-container {
      gap: 10px;
    }
    
    .filter-btn {
      padding: 8px 16px;
      font-size: 0.85rem;
    }
    
    .menu-item-content {
      padding: 20px;
    }
    
    .menu-item-content h3 {
      font-size: 1.2rem;
    }
    
    .menu-item-price {
      font-size: 1.1rem;
    }
  }
  </style>
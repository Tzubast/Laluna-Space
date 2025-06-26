  <template>
    <div class="menu-page">
      <AppNavbar />
      
      <!-- Section 1: Header/Title -->
      <section class="menu-header" v-scroll-reveal>
        <div class="menu-header-content">
          <h1>Our Menu</h1>
          <p>Explore our menu and choose which of favorite one</p>
        </div>
      </section>

      <!-- Section 2: Category Filter -->
      <section class="menu-filter" v-scroll-reveal>
        <div class="filter-container">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['filter-btn', { active: selectedCategory === category.id }]"
            @click="selectCategory(category.id)"
          >
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
            class="menu-item"
          >
            <div class="menu-item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="menu-item-content">
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
          { id: 'snack', name: 'Snack' },
          { id: 'western', name: 'Western' },
          { id: 'indonesian', name: 'Indonesian' },
          { id: 'rice-bowl', name: 'Rice Bowl' },
          { id: 'coffee', name: 'Coffee' },
          { id: 'frappe', name: 'Frappe' },
          { id: 'refresher', name: 'Refresher' }
        ],
        menuItems: [
          {
            id: 1,
            name: 'Nasi Goreng',
            description: 'Traditional Indonesian fried rice with authentic spices',
            price: '25K',
            category: 'indonesian',
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop'
          },
          {
            id: 2,
            name: 'Coffee Creamy Melt',
            description: 'Rich and creamy coffee blend with perfect balance',
            price: '22K',
            category: 'coffee',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
          },
          {
            id: 3,
            name: 'Milosaurus',
            description: 'Special signature drink with unique flavor combination',
            price: '27K',
            category: 'refresher',
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop'
          },
          {
            id: 4,
            name: 'Beef Burger',
            description: 'Juicy beef patty with fresh vegetables and special sauce',
            price: '35K',
            category: 'western',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
          },
          {
            id: 5,
            name: 'Chicken Rice Bowl',
            description: 'Tender chicken served over steamed rice with vegetables',
            price: '28K',
            category: 'rice-bowl',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
          },
          {
            id: 6,
            name: 'Chocolate Frappe',
            description: 'Iced blended chocolate drink topped with whipped cream',
            price: '24K',
            category: 'frappe',
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'
          },
          {
            id: 7,
            name: 'French Fries',
            description: 'Crispy golden potato fries with special seasoning',
            price: '18K',
            category: 'snack',
            image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop'
          },
          {
            id: 8,
            name: 'Rendang Rice Bowl',
            description: 'Traditional Indonesian rendang served with steamed rice',
            price: '32K',
            category: 'rice-bowl',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
          },
          {
            id: 9,
            name: 'Iced Lemon Tea',
            description: 'Refreshing lemon tea served with ice and mint leaves',
            price: '15K',
            category: 'refresher',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
          }
        ]
      }
    },
    computed: {
      filteredMenu() {
        if (this.selectedCategory === 'all') {
          return this.menuItems;
        }
        return this.menuItems.filter(item => item.category === this.selectedCategory);
      }
    },
    methods: {
      selectCategory(categoryId) {
        this.selectedCategory = categoryId;
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
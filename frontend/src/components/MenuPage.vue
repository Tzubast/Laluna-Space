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
  
  // Data menu dengan gambar yang sesuai kategori
  const menuData = {
    'coffee-based': [
      { name: 'Espresso', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop' },
      { name: 'Americano', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop' },
      { name: 'Cappuccino', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop' },
      { name: 'Black Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' }
    ],
    'flavor-latte': [
      { name: 'Vanilla Latte', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' },
      { name: 'Caramel Latte', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
      { name: 'Hazelnut Latte', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop' },
      { name: 'Mocha Latte', image: 'https://images.unsplash.com/photo-1521302200778-33500795e128?w=400&h=300&fit=crop' },
      { name: 'Coconut Latte', image: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=400&h=300&fit=crop' },
      { name: 'Almond Latte', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&h=300&fit=crop' },
      { name: 'Cinnamon Latte', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
      { name: 'Lavender Latte', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' }
    ],
    'non-coffee': [
      { name: 'Hot Chocolate', image: 'https://images.unsplash.com/photo-1542990253-0b395fb73a88?w=400&h=300&fit=crop' },
      { name: 'Matcha Latte', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop' },
      { name: 'Chai Latte', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop' },
      { name: 'Golden Milk', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop' },
      { name: 'Steamed Milk', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop' },
      { name: 'Honey Lemon', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' }
    ],
    'smoothies': [
      { name: 'Berry Smoothie', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop' },
      { name: 'Mango Smoothie', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop' },
      { name: 'Green Smoothie', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop' }
    ],
    'refreshner': [
      { name: 'Lemon Mint', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
      { name: 'Cucumber Water', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop' },
      { name: 'Infused Water', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
      { name: 'Sparkling Lime', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop' },
      { name: 'Fresh Orange', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop' }
    ],
    'frappe': [
      { name: 'Coffee Frappe', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop' },
      { name: 'Chocolate Frappe', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
      { name: 'Vanilla Frappe', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop' }
    ],
    'tea-based': [
      { name: 'Earl Grey', image: 'https://images.unsplash.com/photo-1544787219-7092b8d9a1c7?w=400&h=300&fit=crop' },
      { name: 'Green Tea', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop' },
      { name: 'Chamomile Tea', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop' },
      { name: 'Jasmine Tea', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
      { name: 'Oolong Tea', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' }
    ],
    'snack': [
      { name: 'Croissant', image: 'https://images.unsplash.com/photo-1555507036-ab794f575e77?w=400&h=300&fit=crop' },
      { name: 'Club Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop' },
      { name: 'Chocolate Cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop' },
      { name: 'Blueberry Muffin', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop' },
      { name: 'Glazed Donut', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop' },
      { name: 'Everything Bagel', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop' },
      { name: 'Soft Pretzel', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop' },
      { name: 'Belgian Waffle', image: 'https://images.unsplash.com/photo-1562440499-64c9a74f0d24?w=400&h=300&fit=crop' },
      { name: 'Fluffy Pancake', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
      { name: 'Avocado Toast', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop' },
      { name: 'English Scone', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop' },
      { name: 'Cheesecake Slice', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' }
    ],
    'platter': [
      { name: 'Cheese Platter', image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=400&h=300&fit=crop' },
      { name: 'Fruit Platter', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop' },
      { name: 'Mix Platter', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop' }
    ],
    'wingers': [
      { name: 'Buffalo Wings', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop' },
      { name: 'BBQ Wings', image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop' }
    ],
    'western': [
      { name: 'Beef Steak', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop' },
      { name: 'Grilled Chicken', image: 'https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?w=400&h=300&fit=crop' }
    ],
    'spaghetti': [
      { name: 'Spaghetti Bolognese', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop' },
      { name: 'Fettuccine Alfredo', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop' }
    ],
    'nasi-goreng': [
      { name: 'Nasi Goreng Spesial', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop' },
      { name: 'Nasi Goreng Seafood', image: 'https://images.unsplash.com/photo-1559847844-d942df961ac6?w=400&h=300&fit=crop' },
      { name: 'Nasi Goreng Ayam', image: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=300&fit=crop' },
      { name: 'Nasi Goreng Kampung', image: 'https://images.unsplash.com/photo-1605032834994-bf2d5e7b1ba0?w=400&h=300&fit=crop' }
    ],
    'rice-bowl': [
      { name: 'Chicken Teriyaki Bowl', image: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=300&fit=crop' },
      { name: 'Beef Bowl', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop' },
      { name: 'Salmon Bowl', image: 'https://images.unsplash.com/photo-1559847844-d942df961ac6?w=400&h=300&fit=crop' },
      { name: 'Tuna Bowl', image: 'https://images.unsplash.com/photo-1605032834994-bf2d5e7b1ba0?w=400&h=300&fit=crop' },
      { name: 'Vegetable Bowl', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
      { name: 'Tofu Bowl', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop' },
      { name: 'Shrimp Bowl', image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop' },
      { name: 'Katsu Bowl', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' },
      { name: 'Egg Bowl', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop' },
      { name: 'Mushroom Bowl', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop' }
    ],
    'indonesia': [
      { name: 'Rendang', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop' },
      { name: 'Gado-Gado', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
      { name: 'Sate Ayam', image: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=300&fit=crop' }
    ],
    'dessert': [
      { name: 'Tiramisu', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
      { name: 'Chocolate Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
      { name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop' },
      { name: 'Cheesecake', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop' },
      { name: 'Panna Cotta', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop' },
      { name: 'Macarons', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop' },
      { name: 'Crème Brûlée', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop' }
    ],
    'morning': [
      { name: 'Breakfast Special', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=421&h=759&fit=crop' }
    ]
  };

  let idCounter = 1;
  
  // Loop melalui setiap kategori
  for (const [category, categoryItems] of Object.entries(menuData)) {
    // Loop melalui setiap item dalam kategori
    categoryItems.forEach(item => {
      items.push({
        id: idCounter++,
        name: item.name,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: `${15 + Math.floor(Math.random() * 20)}K`,
        category: category,
        image: item.image
      });
    });
  }

  console.log('Generated menu items:', items); // Untuk debugging
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
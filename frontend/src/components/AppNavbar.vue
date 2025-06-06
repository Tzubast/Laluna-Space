<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <img src="@/assets/logo lls.png" alt="La Luna Space Logo" class="logo-img" />
    </router-link>
    <ul class="nav-links">
      <li><router-link to="/">about</router-link></li>
      <li><router-link to="/menu">menu</router-link></li>
      <li><router-link to="/services">services</router-link></li>
      <li><router-link to="/contact">contact</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar"
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(13, 13, 13, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 0 50px;
  height: 60px; /* lebih ramping dari sebelumnya */
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-img {
  height: 40px;
  display: block;
  object-fit: contain;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-links li a {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
  text-transform: lowercase;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1;
}

.nav-links li a:hover {
  color: #ffb300;
}

.nav-links li a.router-link-active {
  color: #ffb300;
}
</style>

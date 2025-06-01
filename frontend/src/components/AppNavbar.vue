<template> 
  <nav class="navbar"> 
    <div class="logo">La Luna Space</div> 
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
  background-color: rgba(13, 13, 13, 0.2); /* 20% transparency */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 20px 50px; 
  color: #fff; 
  position: sticky; 
  top: 0; 
  z-index: 1000; 
} 
 
.logo { 
  font-family: 'Inter', sans-serif; 
  font-size: 1.8rem; 
  font-weight: 700; 
  color: #ffffff; 
  text-transform: uppercase; 
  letter-spacing: 2px; 
} 
 
.nav-links { 
  list-style: none; 
  display: flex; 
  gap: 40px;
  margin: 0;
  padding: 0;
} 
 
.nav-links li a { 
  color: rgba(255, 255, 255, 0.8); 
  font-weight: 500; 
  text-decoration: none; 
  transition: color 0.3s ease; 
  text-transform: lowercase; 
  font-family: 'Inter', sans-serif; 
} 
 
.nav-links li a:hover { 
  color: #ffb300; 
}

.nav-links li a.router-link-active { 
  color: #ffb300; 
}
</style>
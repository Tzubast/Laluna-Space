import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/landing-page.vue'
import MenuPage from '@/components/MenuPage.vue'
import ServicesPage from '@/components/ServicesPage.vue'

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/menu', name: 'MenuPage', component: MenuPage },
  { path: '/services', name: 'ServicesPage', component: ServicesPage },
  {
    path: '/contact',
    name: 'ContactSection',
    component: LandingPage,
    props: { scrollToContact: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

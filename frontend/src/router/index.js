import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/landing-page.vue'
import MenuPage from '@/components/MenuPage.vue'
import ServicesPage from '@/components/ServicesPage.vue'

// Error Pages
import Error404 from '@/views/Error404.vue'
import Error500 from '@/views/Error500.vue'
import Error403 from '@/views/Error403.vue'
import ErrorNetwork from '@/views/ErrorNetwork.vue'
import MaintenancePage from '@/views/MaintenancePage.vue'

const routes = [
  // Existing Routes
  { 
    path: '/', 
    name: 'LandingPage', 
    component: LandingPage 
  },
  { 
    path: '/menu', 
    name: 'MenuPage', 
    component: MenuPage 
  },
  { 
    path: '/services', 
    name: 'ServicesPage', 
    component: ServicesPage 
  },
  {
    path: '/contact',
    name: 'ContactSection',
    component: LandingPage,
    props: { scrollToContact: true }
  },
  
  // Error Routes
  {
    path: '/error/404',
    name: 'Error404',
    component: Error404,
    meta: { title: '404 - Page Not Found' }
  },
  {
    path: '/error/500',
    name: 'Error500',
    component: Error500,
    meta: { title: '500 - Server Error' }
  },
  {
    path: '/error/403',
    name: 'Error403',
    component: Error403,
    meta: { title: '403 - Access Forbidden' }
  },
  {
    path: '/error/network',
    name: 'ErrorNetwork',
    component: ErrorNetwork,
    meta: { title: 'Network Error' }
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: MaintenancePage,
    meta: { title: 'Under Maintenance' }
  },
  
  // Catch all 404 - harus di paling bawah
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Error404,
    meta: { title: '404 - Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Handle scroll to contact section
    if (to.name === 'ContactSection') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: '#contact', behavior: 'smooth' })
        }, 500)
      })
    }
    
    // Return to saved position or top
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guards
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'Coffee Shop'
  
  // Check if maintenance mode is active
  const isMaintenanceMode = localStorage.getItem('maintenanceMode') === 'true'
  const allowedDuringMaintenance = ['Maintenance', 'Error404', 'Error500', 'Error403', 'ErrorNetwork']
  
  if (isMaintenanceMode && !allowedDuringMaintenance.includes(to.name)) {
    next({ name: 'Maintenance' })
    return
  }
  
  // Check network connectivity for pages that require internet
  const requiresNetwork = ['MenuPage', 'ServicesPage']
  if (!navigator.onLine && requiresNetwork.includes(to.name)) {
    next({ name: 'ErrorNetwork' })
    return
  }
  
  // Simulate authentication check (if needed)
  const protectedRoutes = [] // Add route names that need authentication
  const isAuthenticated = localStorage.getItem('authToken') // Check your auth logic
  
  if (protectedRoutes.includes(to.name) && !isAuthenticated) {
    next({ name: 'Error403' })
    return
  }
  
  next()
})

// Handle route errors
router.onError((error) => {
  console.error('Router error:', error)
  
  // Handle chunk loading errors (usually happens in production)
  if (error.message.includes('Loading chunk') || error.message.includes('Loading CSS chunk')) {
    window.location.reload()
    return
  }
  
  // Handle other router errors
  if (error.message.includes('404') || error.message.includes('not found')) {
    router.push({ name: 'Error404' })
  } else {
    router.push({ name: 'Error500' })
  }
})

// Add error handling for navigation failures
router.afterEach((to, from, failure) => {
  if (failure) {
    console.error('Navigation failed:', failure)
    
    // Handle specific navigation failures
    if (failure.type === 4) { // NavigationFailureType.aborted
      console.log('Navigation was aborted')
    } else if (failure.type === 8) { // NavigationFailureType.cancelled
      console.log('Navigation was cancelled')
    } else if (failure.type === 2) { // NavigationFailureType.redirected
      console.log('Navigation was redirected')
    }
  }
})

export default router
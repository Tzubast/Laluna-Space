import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Services
import LalunaAPI from './services/LalunaAPI'
import ErrorService from './services/errorService'

// Mixins
import errorHandlingMixin from './mixins/errorHandling'

const app = createApp(App)

// Create global services
const errorService = new ErrorService(router)
const apiService = new LalunaAPI(router)

// Global properties
app.config.globalProperties.$errorService = errorService
app.config.globalProperties.$api = apiService

// Global error handler
app.config.errorHandler = (error, instance, info) => {
  errorService.handleError(error, `Vue Error Handler: ${info}`)
}

// Global mixin
app.mixin(errorHandlingMixin)

// Router and mount
app.use(router)

// Global error handlers for unhandled promises and errors
window.addEventListener('unhandledrejection', (event) => {
  errorService.handleError(event.reason, 'Unhandled Promise Rejection')
  event.preventDefault()
})

window.addEventListener('error', (event) => {
  errorService.handleError(event.error, 'Global Error Handler')
})

// Network status monitoring
window.addEventListener('online', () => {
  console.log('Connection restored')
  errorService.showToast('Connection restored', 'success')
})

window.addEventListener('offline', () => {
  console.log('Connection lost')
  router.push({ name: 'ErrorNetwork' })
})

app.mount('#app')

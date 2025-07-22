import axios from 'axios'
import ErrorService from './errorService'

class LalunaApi {
  constructor(router) {
    this.errorService = new ErrorService(router)
    this.api = axios.create({
      baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        // Add loading state
        this.setLoading(true)
        
        return config
      },
      (error) => {
        this.setLoading(false)
        this.errorService.handleError(error, 'Request Interceptor')
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        this.setLoading(false)
        return response
      },
      (error) => {
        this.setLoading(false)
        this.errorService.handleError(error, 'Response Interceptor')
        return Promise.reject(error)
      }
    )
  }

  setLoading(isLoading) {
  console.log('Loading state:', isLoading)
  // Atau nanti kamu bisa commit ke Vuex atau emit event
}


  // API Methods for Coffee Shop

  // Menu related
  async getMenu() {
    try {
      const response = await this.api.get('/menu')
      return response.data
    } catch (error) {
      this.errorService.handleError(error, 'Get Menu')
      throw error
    }
  }

  async getMenuItem(id) {
    try {
      const response = await this.api.get(`/menu/${id}`)
      return response.data
    } catch (error) {
      this.errorService.handleError(error, `Get Menu Item ${id}`)
      throw error
    }
  }

  // Services related
  async getServices() {
    try {
      const response = await this.api.get('/services')
      return response.data
    } catch (error) {
      this.errorService.handleError(error, 'Get Services')
      throw error
    }
  }

  async sendContactMessage(messageData) {
    try {
      const response = await this.api.post('/contact', messageData)
      return response.data
    } catch (error) {
      this.errorService.handleError(error, 'Send Contact Message')
      throw error
    }
  }

  // Newsletter subscription
  async subscribeNewsletter(email) {
    try {
      const response = await this.api.post('/newsletter/subscribe', { email })
      return response.data
    } catch (error) {
      this.errorService.handleError(error, 'Subscribe Newsletter')
      throw error
    }
  }
}

export default LalunaApi
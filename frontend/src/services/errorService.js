class ErrorService {
  constructor(router) {
    this.router = router
    this.errorLog = []
  }

  // Log error for debugging
  logError(error, context = '') {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    this.errorLog.push(errorInfo)
    console.error('Error logged:', errorInfo)

    // In production, you might want to send this to a logging service
    // this.sendToLoggingService(errorInfo)
  }

  // Handle different types of errors
  handleError(error, context = '') {
    this.logError(error, context)

    if (error.response) {
      // HTTP error
      this.handleHttpError(error.response.status)
    } else if (error.request) {
      // Network error
      this.handleNetworkError()
    } else {
      // JavaScript error
      this.handleJavaScriptError(error)
    }
  }

  handleHttpError(status) {
    switch (status) {
      case 400:
        this.showToast('Bad Request', 'error')
        break
      case 401:
        localStorage.removeItem('authToken')
        this.router.push({ name: 'Login' })
        break
      case 403:
        this.router.push({ name: 'Error403' })
        break
      case 404:
        this.router.push({ name: 'Error404' })
        break
      case 429:
        this.showToast('Terlalu banyak permintaan, coba lagi nanti', 'warning')
        break
      case 500:
      case 502:
      case 503:
      case 504:
        this.router.push({ name: 'Error500' })
        break
      default:
        this.router.push({ name: 'Error500' })
    }
  }

  handleNetworkError() {
    if (!navigator.onLine) {
      this.router.push({ name: 'ErrorNetwork' })
    } else {
      this.showToast('Network error occurred', 'error')
    }
  }

  handleJavaScriptError(error) {
    if (error.message.includes('ChunkLoadError')) {
      window.location.reload()
    } else {
      this.router.push({ name: 'Error500' })
    }
  }

  showToast(message, type = 'info') {
    // Implement your toast notification here
    // For now, we'll use alert as fallback
    console.log(`Toast: ${type} - ${message}`)

    // Example using a toast library:
    // this.$toast({ message, type, duration: 5000 })
  }

  // Get error logs (useful for debugging)
  getErrorLogs() {
    return this.errorLog
  }

  // Clear error logs
  clearErrorLogs() {
    this.errorLog = []
  }
}

export default ErrorService

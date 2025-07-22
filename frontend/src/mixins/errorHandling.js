export default {
  methods: {
    // Handle async operations with error catching
    async handleAsync(asyncFunction, errorContext = '') {
      try {
        return await asyncFunction()
      } catch (error) {
        this.handleError(error, errorContext)
        throw error
      }
    },

    // Generic error handler
    handleError(error, context = '') {
      console.error(`Error in ${context}:`, error)

      if (this.$errorService) {
        this.$errorService.handleError(error, context)
      } else {
        // Fallback error handling
        if (error.response) {
          const status = error.response.status
          switch (status) {
            case 404:
              this.$router.push({ name: 'Error404' })
              break
            case 403:
              this.$router.push({ name: 'Error403' })
              break
            case 500:
              this.$router.push({ name: 'Error500' })
              break
            default:
              this.showErrorMessage('Something went wrong. Please try again.')
          }
        } else if (!navigator.onLine) {
          this.$router.push({ name: 'ErrorNetwork' })
        } else {
          this.showErrorMessage('An unexpected error occurred.')
        }
      }
    },

    // Show error message (customize based on your UI library)
    showErrorMessage(message) {
      // Using alert as fallback
      alert(message)
      
      // If you're using a toast library:
      // this.$toast.error(message)
      
      // If you're using a notification library:
      // this.$notification.error({ message })
    },

    // Show success message
    showSuccessMessage(message) {
      // Using alert as fallback
      alert(message)
      
      // If you're using a toast library:
      // this.$toast.success(message)
    },

    // Retry function with exponential backoff
    async retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await fn()
        } catch (error) {
          if (i === maxRetries - 1) throw error
          
          const backoffDelay = delay * Math.pow(2, i)
          await new Promise(resolve => setTimeout(resolve, backoffDelay))
        }
      }
    }
  }
}
export function formatDate(dateString) {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  export function formatTime(dateString) {
    if (!dateString) return ''
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  export function formatDateTime(dateString) {
    if (!dateString) return ''
    return `${formatDate(dateString)} ${formatTime(dateString)}`
  }
  
  export function getISODateString(date) {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }
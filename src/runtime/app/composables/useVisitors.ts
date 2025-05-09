import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useState } from '#imports'

/**
 * Composable for tracking real-time website visitors count via WebSocket
 *
 * Features:
 * - Real-time visitors count updates
 * - Automatic WebSocket connection management
 * - Connection status tracking
 * - Error handling
 * - Automatic cleanup on component unmount
 *
 * @returns {Object} An object containing:
 *  - visitors: Ref<number> - Current number of visitors
 *  - locations: Ref<Location[]> - Array of geolocation objects for all visitors (if `locations: true`)
 *  - myLocation: Ref<Location | null> - Geolocation of the current visitor (if `locations: true`)
 *  - isLoading: Ref<boolean> - Loading state indicator
 *  - error: Ref<string | null> - Error message if any
 *  - isConnected: Ref<boolean> - WebSocket connection status
 *  - reconnect: () => void - Function to manually reconnect
 */
export function useVisitors() {
  // State management
  const visitors = useState<number>('visitors', () => 0)
  const locations = ref<Array<{ latitude: number, longitude: number }>>([])
  const myLocation = useState('location', () => ({
    latitude: 0,
    longitude: 0,
  }))
  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const wsRef = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const isMounted = ref(true)

  // Constants
  const RECONNECTION_DELAY = 5000 // 5 seconds delay for reconnection
  const WS_NORMAL_CLOSURE = 1000

  /**
   * Constructs the WebSocket URL based on the current protocol and host
   * @returns {string} WebSocket URL
   */
  const getWebSocketUrl = (): string => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const baseUrl = window.location.host.replace(/^(http|https):\/\//, '')
    return `${ protocol }//${ baseUrl }/.nuxt-visitors/ws?latitude=${ myLocation.value.latitude }&longitude=${ myLocation.value.longitude }`
  }

  /**
   * Cleans up WebSocket connection and resets state
   */
  const cleanup = () => {
    if (wsRef.value) {
      wsRef.value.close()
      wsRef.value = null
    }
    isConnected.value = false
    isLoading.value = false
  }

  /**
   * Handles WebSocket messages
   * @param {MessageEvent} event - WebSocket message event
   */
  const handleMessage = async (event: MessageEvent) => {
    if (!isMounted.value) return
    try {
      const data = typeof event.data === 'string' ? event.data : await event.data.text()
      const payload = JSON.parse(data)
      if (!Array.isArray(payload) && !isNaN(payload) && payload >= 0) {
        visitors.value = payload
      } else if (Array.isArray(payload)) {
        locations.value = payload
        visitors.value = payload.length
      }
    } catch (err: unknown) {
      console.error('Failed to parse visitors WebSocket data:', err)
      error.value = 'Invalid data received'
    }
  }

  /**
   * Handles WebSocket connection closure
   * @param {CloseEvent} event - WebSocket close event
   */
  const handleClose = (event: CloseEvent) => {
    console.log('Visitors WebSocket closed:', event.code, event.reason)
    isConnected.value = false
    wsRef.value = null

    if (isMounted.value && event.code !== WS_NORMAL_CLOSURE) {
      error.value = 'Connection lost'
      // Attempt to reconnect after delay
      setTimeout(() => reconnect(), RECONNECTION_DELAY)
    }
  }

  /**
   * Initializes WebSocket connection
   */
  const initWebSocket = () => {
    if (!isMounted.value) return

    cleanup()

    try {
      const ws = new WebSocket(getWebSocketUrl())
      wsRef.value = ws

      ws.onopen = () => {
        if (!isMounted.value) {
          ws.close()
          return
        }
        console.log('Stats WebSocket connected')
        isConnected.value = true
        isLoading.value = false
        error.value = null
      }

      ws.onmessage = handleMessage
      ws.onclose = handleClose
      ws.onerror = (event: Event) => {
        if (!isMounted.value) return
        console.error('Visitors WebSocket error:', event)
        error.value = 'Connection error'
      }
    } catch (err) {
      if (!isMounted.value) return
      console.error('Failed to initialize Visitors WebSocket:', err)
      error.value = 'Failed to initialize connection'
      isLoading.value = false
    }
  }

  /**
   * Manually triggers WebSocket reconnection
   */
  const reconnect = () => {
    if (!isMounted.value) return
    error.value = null
    isLoading.value = true
    initWebSocket()
  }

  // Lifecycle hooks
  onMounted(() => {
    if (import.meta.client) {
      isMounted.value = true
      initWebSocket()
    }
  })

  onBeforeUnmount(() => {
    isMounted.value = false
    cleanup()
  })

  return {
    visitors,
    locations,
    myLocation,
    isLoading,
    error,
    isConnected,
    reconnect
  }
}

import type { Peer } from 'crossws'
import { defineWebSocketHandler } from 'h3'
import { getQuery } from 'ufo'

export default defineWebSocketHandler({
  open(peer: Peer) {
    const locations = Array.from(peer.peers.values()).map(peer => getQuery(peer.websocket.url!))
    peer.subscribe('nuxt-visitors')
    peer.publish('nuxt-visitors', JSON.stringify(locations))
    peer.send(JSON.stringify(locations))
  },

  close(peer: Peer) {
    peer.unsubscribe('nuxt-visitors')
    setTimeout(() => {
      const locations = Array.from(peer.peers.values()).map(peer => getQuery(peer.websocket.url!))
      peer.publish('visitors', JSON.stringify(locations))
    }, 500)
  }
})

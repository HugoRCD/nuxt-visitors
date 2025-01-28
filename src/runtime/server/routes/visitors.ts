import type { Peer } from 'crossws'
import { defineWebSocketHandler } from 'h3'

export default defineWebSocketHandler({
  open(peer: Peer) {
    peer.subscribe('nuxt-visitors')
    peer.send(peer.peers.size)
    peer.publish('nuxt-visitors', peer.peers.size)
  },

  close(peer: Peer) {
    peer.publish('nuxt-visitors', peer.peers.size)
    peer.unsubscribe('nuxt-visitors')
  }
})

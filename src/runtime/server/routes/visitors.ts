import type { Peer } from 'crossws'

export default defineWebSocketHandler({
  open(peer: Peer) {
    peer.subscribe('nuxt-visitors')
    peer.send(peer.peers.size)
    peer.publish('nuxt-visitors', peer.peers.size)
  },

  close(peer) {
    peer.publish('nuxt-visitors', peer.peers.size)
    peer.unsubscribe('nuxt-visitors')
  }
})

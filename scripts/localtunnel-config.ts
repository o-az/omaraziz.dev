import localtunnel from 'localtunnel'
import type { TunnelConfig } from 'localtunnel'
const config: TunnelConfig = {}
function startTunnel() {
  localtunnel(3000, config)
}

import type { Line, Stop } from '~/type'

export const lines: Line[] = Array.from({
  length: 10,
}).map((_, i) => ({ id: `line-${i}`, name: `line ${i}` }))

export const stops: Stop[] = Array.from({
  length: 10,
}).map((_, i) => ({
  id: `stop-${i}`,
  name: `stop ${i}`,
  geoPoint: { lat: 0, lon: 0 },
}))

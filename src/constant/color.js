import { lines } from '~/__fixtures__'

export const line_color = {
  bakerloo: '#8a4d1e',
  central: '#ee3024',
  circle: '#fbd201',
  district: '#00843e',
  'hammersmith-city': '#d698af',
  jubilee: '#6b7278',
  metropolitan: '#750955',
  northern: '#030303',
  piccadilly: '#1c3d97',
  victoria: '#009cdd',
  'waterloo-city': '#76cfbb',
}

lines.forEach((id, i) => {
  // const k =
  //   ((i * i * i * 7 + i * 37 + i * i * 17 + 18 + i * i * i * i * 3) % 23) / 23

  const k = i / lines.length

  return (line_color[id] = `hsl(${Math.round(k * 340)},80%,58%)`)
})

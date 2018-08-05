import { lines } from '~/__fixtures__'

export const line_color = {}
lines.forEach(({ id }, i) => {
  // const k =
  //   ((i * i * i * 7 + i * 37 + i * i * 17 + 18 + i * i * i * i * 3) % 23) / 23

  const k = i / lines.length

  return (line_color[id] = `hsl(${Math.round(k * 340)},80%,58%)`)
})

import React from 'react'
import styled from 'react-emotion'
import { white, transitionUnit } from '~/component/_abstract/palette'

const flat = arr => [].concat(...arr)

export const Lines = ({ segments, color }) => {
  if (!segments || !segments[0]) return null

  const mx = 30
  const my = 50
  const r = 10

  const l = 12

  const segments_ = segments.map(arr =>
    arr.map(({ x, y }) => ({ x: x * mx, y: y * my }))
  )

  const points = flat(segments_)

  const max_x = Math.max(...points.map(({ x }) => x))
  const max_y = Math.max(...points.map(({ y }) => y)) - 1

  const width = max_x + l * 2
  const height = max_y + l * 2

  return (
    <Container
      viewBox={`${-l} ${-l} ${width} ${height}`}
      style={{ width, height, margin: `${-l}px` }}
    >
      {segments_.map(([a, b], i) => (
        <Line key={i} stroke={color} d={`M${a.x} ${a.y}L${b.x} ${b.y}`} />
      ))}

      {points.map(({ x, y }, i) => (
        <Dot key={i} fill={color} cx={x} cy={y} r={r} />
      ))}
    </Container>
  )
}

const Container = styled.svg`
  margin: -10px;
`

const Line = styled.path`
  fill: none;
  stroke-width: 5px;
`
const Dot = styled.circle`
  stroke: none;
`

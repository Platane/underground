import test from 'tape'
import { getAllLines, getLineStops, getNextArrivalsTime } from '../index'
import type { Line, Stop, ArrivalTime } from '~/type'

test('api-tfl - getAllLines', async t => {
  const lines = await getAllLines()

  t.pass('request should succeed')

  lines.map(line => Line.assert(line))

  t.pass('type should match')

  t.end()
})

test('api-tfl - getLineNode', async t => {
  const [line] = await getAllLines()

  const stops = await getLineStops(line.id)

  t.pass('request should succeed')

  stops.map(stop => Stop.assert(stop))

  t.pass('type should match')

  t.end()
})

test('api-tfl - getNextArrivalsTime', async t => {
  const [line] = await getAllLines()

  const [stop] = await getLineStops(line.id)

  const nextArrivalsTime = await getNextArrivalsTime(stop.id)

  t.pass('request should succeed')

  nextArrivalsTime.map(a => ArrivalTime.assert(a))

  t.pass('type should match')

  t.end()
})

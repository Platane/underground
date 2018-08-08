import test from 'tape'
import {
  getAllLines,
  getLineStatus,
  getLineStops,
  getNextArrivalsTime,
  getLineRoutes,
} from '../index'
import type { Line, Station, Route, ArrivalTime, LineStatus } from '~/type'

test('api-tfl - getAllLines', async t => {
  const lines = await getAllLines()

  t.pass('request should succeed')

  lines.map(line => Line.assert(line))

  t.pass('type should match')

  t.end()
})

test('api-tfl - getLineRoutes', async t => {
  const line = (await getAllLines())[1]

  const res = await getLineRoutes(line.id)

  t.pass('request should succeed')

  type Res = { stations: Station[], routes: Route[] }

  Res.assert(res)

  t.pass('type should match')

  t.assert(
    res.routes.every(route =>
      route.every(id => res.stations.some(s => s.id === id))
    ),
    'every point of each rotues should refer to a station'
  )

  t.end()
})

test('api-tfl - getLineStatus', async t => {
  const [line] = await getAllLines()

  const status = await getLineStatus(line.id)

  t.pass('request should succeed')

  LineStatus.assert(status)

  t.pass('type should match')

  t.end()
})

// test('api-tfl - getNextArrivalsTime', async t => {
//   const [line] = await getAllLines()
//
//   const [stop] = await getLineStops(line.id)
//
//   const nextArrivalsTime = await getNextArrivalsTime(stop.id)
//
//   t.pass('request should succeed')
//
//   nextArrivalsTime.map(a => ArrivalTime.assert(a))
//
//   t.pass('type should match')
//
//   t.end()
// })

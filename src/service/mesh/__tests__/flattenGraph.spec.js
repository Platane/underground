import test from 'tape'
import { flattenGraph } from '../flattenGraph'
import { buildGraph } from '../buildGraph'
import { routes } from './samples'

const checkUniqueness = (arr: *[]) => {
  const o = {}
  ;[].concat(...arr).forEach(id => (o[id] = (o[id] || 0) + 1))
  return Object.keys(o).every(id => o[id] === 1)
}

test('flattenGraph - 1', t => {
  const routes = [
    //
    ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
    [/* */ 'a1', 'b2', 'b3'],
  ]

  const graph = buildGraph(routes)

  const flat = flattenGraph(graph)

  t.assert(checkUniqueness(flat), 'id in graph should be unique')

  t.end()
})

test('flattenGraph - 2', t => {
  const routes = [
    //
    ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
    [/* */ 'a1', 'b2', 'a3', 'b4', 'a5'],
  ]

  const graph = buildGraph(routes)

  const flat = flattenGraph(graph)

  t.assert(checkUniqueness(flat), 'id in graph should be unique')

  t.end()
})

test('flattenGraph - 3', t => {
  const graph = buildGraph(routes)

  const flat = flattenGraph(graph)

  t.assert(checkUniqueness(flat), 'id in graph should be unique')

  t.end()
})

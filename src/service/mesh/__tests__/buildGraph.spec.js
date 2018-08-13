import test from 'tape'
import { buildGraph } from '../buildGraph'

test('buildGraph', t => {
  const routes = [
    //
    ['a0', 'a1', 'a2'],
    ['a0', 'b1'],
  ]

  const graph = buildGraph(routes)

  t.deepEqual(graph, {
    a0: ['a1', 'b1'],
    a1: ['a0', 'a2'],
    a2: ['a1'],
    b1: ['a0'],
  })

  t.end()
})

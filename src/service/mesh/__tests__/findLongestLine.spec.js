import test from 'tape'
import { findLongestLine } from '../findLongestLine'
import { buildGraph } from '../buildGraph'

test('findLongestLine - 1', t => {
  const routes = [
    //
    ['a0', 'a1', 'a2'],
    ['a0', 'b1'],
    ['a0', 'c1', 'c2'],
  ]

  const graph = buildGraph(routes)

  const longestLine = findLongestLine(graph)

  t.equal(longestLine.length, 5, 'should have 5 elements')

  t.end()
})

test('findLongestLine - 2', t => {
  const routes = [
    //
    ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
    [/* */ 'a1', 'b2', 'a3'],
  ]

  const graph = buildGraph(routes)

  const longestLine = findLongestLine(graph)

  t.equal(longestLine.length, 7, 'should have 7 elements')

  t.end()
})

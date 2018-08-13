import { routeToEdges } from './buildGraph'
import { findLongestLine } from './findLongestLine'
import { addEdgeToGraph, pruneEdgeFromGraph, copyGraph } from './graphUtil'
import type { Key, Route, Graph } from './graphUtil'
import type { FlatGraph } from './flattenGraph'

const graphToEdges = (graph: Graph): [Key, Key][] =>
  [].concat(
    ...Object.keys(graph).map(a =>
      graph[a].filter(b => a + '' < b + '').map(b => [a, b])
    )
  )

type Point = { x: number, y: number }

export const flattenGraphToSegments = (flatGraph: FlatGraph, graph: Graph) => {
  const line: Key[] = []

  const coord_byId: { [Key]: Point } = {}

  flatGraph.forEach(arr =>
    arr.forEach((key, x) => {
      coord_byId[key] = { x, y: line.length }

      line.push(key)
    })
  )

  const segments: [Point, Point][] = graphToEdges(graph).map(([a, b]) => [
    coord_byId[a],
    coord_byId[b],
  ])

  return {
    segments,
    line,
  }
}

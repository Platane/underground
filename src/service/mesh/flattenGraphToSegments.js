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
      coord_byId[key] = {
        x,
        y: line.length,
      }

      line.push(key)
    })
  )

  const segments: [Point, Point][] = [].concat(
    ...graphToEdges(graph).map(([a, b]) => {
      const pa = coord_byId[a]
      const pb = coord_byId[b]

      if (pa.x === pb.x) return [[pa, pb]]

      const top = pa.x > pb.x ? pa : pb
      const bottom = pa.x > pb.x ? pb : pa

      const pc = {
        x: top.x,
        y: bottom.y < top.y ? bottom.y + 1 : bottom.y - 1,
      }

      return [[pa, pc], [pc, pb]]
    })
  )

  return {
    points: line.map(id => coord_byId[id]),
    segments,
    line,
  }
}

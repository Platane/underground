import { routeToEdges } from './buildGraph'
import { findLongestLine } from './findLongestLine'
import { addEdgeToGraph, pruneEdgeFromGraph, copyGraph } from './graphUtil'
import type { Key, Route, Graph } from './graphUtil'

export type FlatGraph = Key[][]

const pruneRouteFromGraph = (graph: Graph, route: Route) =>
  routeToEdges(route).reduce(
    (graph, [a, b]) => pruneEdgeFromGraph(graph, a, b),
    graph
  )

export const flattenGraph = (graph: Graph) => {
  graph = copyGraph(graph)

  const longestLine = findLongestLine(graph)

  pruneRouteFromGraph(graph, longestLine)

  const flat = longestLine.map(key => [key])

  let k = 300

  // append forks
  while (k--) {
    // find next fork ( a )
    let aKey = null
    let aIndex = flat.findIndex(
      line => (aKey = line.find(x => graph[x].length > 0))
    )

    // if no fork left, end
    if (!aKey) return flat

    // b is the next neightboor
    // at the end of the loop, b will be either the end of the branch,
    // or the merged point if there is a loop
    let bKey = aKey
    let bIndex = -1

    const chain = []

    while (true) {
      const next = graph[bKey][0]

      if (!next) break

      pruneEdgeFromGraph(graph, bKey, next)

      bKey = next

      if ((bIndex = flat.findIndex(line => line.includes(bKey))) >= 0) break
      else chain.push(bKey)
    }

    if (bIndex === -1) {
      // no loop
      // direction have no meaning
      // choose arbitrary the direction
    } else {
      // loop
      // set the direction
      if (aIndex > bIndex) {
        ;[aIndex, bIndex] = [bIndex, aIndex]
        chain.reverse()
      }
    }

    for (let k = 0; k < chain.length; k++)
      (flat[aIndex + 1 + k] = flat[aIndex + 1 + k] || []).push(chain[k])
  }

  throw new Error('weird graph ?')
}

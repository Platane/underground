import { routeToEdges } from './buildGraph'
import { addEdgeToGraph, pruneEdgeFromGraph } from './graphUtil'
import type { Key, Route, Graph } from './graphUtil'

const findLongestLineFrom = (
  graph: Graph,
  key: Key,
  acc: Route = [key]
): Route =>
  (graph[key] || [])
    .filter(key => !acc.includes(key))
    .reduce((longest, next) => {
      pruneEdgeFromGraph(graph, key, next)

      const line = findLongestLineFrom(graph, next, [...acc, next])

      addEdgeToGraph(graph, key, next)

      return line.length > longest.length ? line : longest
    }, acc)

export const findLongestLine = (graph: Graph): Route =>
  Object.keys(graph).reduce((longest, startingPoint) => {
    const line = findLongestLineFrom(graph, startingPoint)

    return line.length > longest.length ? line : longest
  }, [])

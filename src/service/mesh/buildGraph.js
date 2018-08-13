export type Key = number | string
export type Route = Key[]
export type Graph = { [Key]: Key[] }

export const addEdgeToGraph = (graph: Graph, a: Key, b: Key) => {
  graph[a] = graph[a] || []
  graph[b] = graph[b] || []

  if (!graph[a].includes(b)) graph[a].push(b)
  if (!graph[b].includes(a)) graph[b].push(a)

  return graph
}

export const routeToEdges = (route: Route): [Key, Key][] =>
  Array.from({ length: route.length - 1 }).map((_, i) => [
    route[i],
    route[i + 1],
  ])

const addRouteToGraph = (graph, route) =>
  routeToEdges(route).reduce(
    (graph, [a, b]) => addEdgeToGraph(graph, a, b),
    graph
  )

export const buildGraph = (routes: Route[]): Graph =>
  routes.reduce((graph, route) => addRouteToGraph(graph, route), {})

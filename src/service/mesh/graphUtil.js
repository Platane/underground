export type Key = number | string
export type Route = Key[]
export type Graph = { [Key]: Key[] }

export const addEdgeToGraph = (graph: Graph, a: Key, b: Key): Graph => {
  graph[a] = graph[a] || []
  graph[b] = graph[b] || []

  if (!graph[a].includes(b)) graph[a].push(b)
  if (!graph[b].includes(a)) graph[b].push(a)

  return graph
}

export const copyGraph = (graph: Graph): Graph => {
  const copy = {}

  for (let a in graph) copy[a] = graph[a].slice()

  return copy
}

export const pruneEdgeFromGraph = (graph: Graph, a: Key, b: Key): Graph => {
  const ia = graph[a].indexOf(b)

  if (ia >= 0) graph[a].splice(ia, 1)

  const ib = graph[b].indexOf(a)

  if (ib >= 0) graph[b].splice(ib, 1)

  return graph
}

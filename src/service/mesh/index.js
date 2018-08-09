type Grid = { id: any, k: number }[]

const fill = (grid: Grid, route: any[], k): Grid => {
  const [route_head, ...route_tail] = route
  const [grid_head, ...grid_tail] = grid

  if (!route_head) return grid

  if (!grid_head) return route.map(id => ({ id, k }))

  // look for route head in grid
  const s = grid.findIndex(u => u.id === route_head)

  // if found, route jump to the point on grid
  if (s > -1)
    return [...grid.slice(0, s + 1), ...fill(grid.slice(s + 1), route_tail, k)]

  //

  // look for grid head in route
  const v = route.indexOf(grid_head.id)

  // if found, found is copied to the grid util the mergin point
  if (v > -1)
    return [
      ...route.slice(0, v).map(id => ({ id, k })),
      grid_head,
      ...fill(grid_tail, route.slice(v + 1), k),
    ]

  // if nothing else, not merge the two

  const g = [{ id: route_head, k }, ...fill(grid_tail, route_tail, k)]

  if (grid_head) g.splice(1, 0, grid_head)

  return g
}

const mergeRouteInGrid = (grid, route, k): Grid => {
  // first population of the grid
  if (!grid.length) return route.map(id => ({ id, k }))

  // find a common point ...
  let igrid
  const iroute = route.findIndex(
    id => (igrid = grid.findIndex(u => u.id === id)) !== -1
  )

  if (iroute === -1) throw new Error('no common point')

  // and fill from here

  return [
    // before
    ...fill(
      grid.slice(0, igrid).reverse(),
      route.slice(0, iroute).reverse(),
      k
    ).reverse(),

    grid[igrid],

    // after
    ...fill(grid.slice(igrid + 1), route.slice(iroute + 1), k),
  ]
}

export const createMesh = ([route, ...routes]: any[]): Grid => {
  if (!route) return []

  return mergeRouteInGrid(createMesh(routes), route, routes.length + 1)
}

export const extractLines = (grid, routes) =>
  routes.map(route =>
    route.map(id => {
      const y = grid.findIndex(u => u.id === id)
      const x = grid[y].k

      return { x, y, id }
    })
  )

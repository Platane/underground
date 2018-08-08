import { createSelector } from 'reselect'
import { selectLines, selectCurrentLineId } from './line'
import { createMesh, extractLines } from '~/service/mesh'
import type { State } from '~/type'

export const selectCurrentStationId = (state: State) =>
  state.router.param.stationId || null

export const selectCurrentStation = createSelector(
  state => state.resource.stations_byId,
  selectCurrentStationId,
  selectLines,
  (stations_byId, stationId, lines) =>
    stations_byId[stationId] && formatStation(lines)(stations_byId[stationId])
)

const filterWhiteListLines = whiteListLines => lines =>
  lines.filter(({ id }) => whiteListLines.some(x => x.id === id))

const formatStation = lines =>
  !lines
    ? x => x
    : ({ linesIncludingBuses, ...x }) => ({
        ...x,
        lines: filterWhiteListLines(lines)(linesIncludingBuses),
      })

export const selectCurrentLineStationsMesh = createSelector(
  state => state.resource.stations_byId,
  state => state.resource.routes_byLineId,
  selectCurrentLineId,
  selectLines,
  (stations_byId, routes_byLineId, lineId, lines) => {
    const routes = routes_byLineId[lineId]

    if (!routes) return null

    const mesh = createMesh(routes)

    return {
      lines: extractLines(mesh, routes),
      stations: mesh.map(u => stations_byId[u.id]).map(formatStation(lines)),
    }
  }
)

import { createSelector } from 'reselect'
import { selectLines, selectCurrentLineId } from './line'
import {
  buildGraph,
  flattenGraph,
  flattenGraphToSegments,
} from '~/service/mesh'
import type { State } from '~/store/reducer'

export const selectCurrentStationId = (state: State) =>
  state.router.param.stationId || null

export const selectCurrentStation = createSelector(
  state => state.resource.station_byId,
  selectCurrentStationId,
  selectLines,
  (station_byId, stationId, lines) =>
    station_byId[stationId] && formatStation(lines)(station_byId[stationId])
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
  state => state.resource.station_byId,
  state => state.resource.routes_byLineId,
  selectCurrentLineId,
  selectLines,
  (station_byId, routes_byLineId, lineId, lines) => {
    const routes = routes_byLineId[lineId]

    if (!routes) return null

    const graph = buildGraph(routes)

    const { line, points, segments } = flattenGraphToSegments(
      flattenGraph(graph),
      graph
    )

    return {
      points,
      segments,
      stations: line.map(id => station_byId[id]).map(formatStation(lines)),
    }
  }
)

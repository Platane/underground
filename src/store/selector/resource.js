import { createSelector } from 'reselect'
import { lines, stops } from '~/__fixtures__'
import { line_color } from '~/constant/color'
import type { State } from '~/type'

export const selectLines = (state: State) => state.resource.lines

export const selectCurrentLineId = (state: State) =>
  state.router.param.lineId || null

export const selectCurrentLineColor = createSelector(
  selectCurrentLineId,
  lineId => line_color[lineId]
)

export const selectCurrentLine = createSelector(
  selectLines,
  selectCurrentLineId,
  (lines, lineId) => lines && lines.find(x => x.id === lineId)
)

const filterWhiteListLines = whiteListLines => lines =>
  lines.filter(({ id }) => whiteListLines.some(x => x.id === id))

const formatStop = lines =>
  !lines
    ? x => x
    : ({ linesIncludingBuses, ...x }) => ({
        ...x,
        lines: filterWhiteListLines(lines)(linesIncludingBuses),
      })

export const selectCurrentLineStops = createSelector(
  state => state.resource.stops_byLineId,
  selectCurrentLineId,
  selectLines,
  (stops_byLineId, lineId, lines) =>
    stops_byLineId[lineId] && stops_byLineId[lineId].map(formatStop(lines))
)

export const selectCurrentStopId = (state: State) =>
  state.router.param.stopId || null

export const selectCurrentStop = createSelector(
  selectCurrentLineStops,
  selectCurrentStopId,
  (stops, stopId) => stops && stops.find(x => x.id === stopId)
)

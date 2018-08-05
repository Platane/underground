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

export const selectCurrentLineStops = createSelector(
  state => state.resource.stops_byLineId,
  selectCurrentLineId,
  (stops_byLineId, lineId) => stops_byLineId[lineId]
)

export const selectCurrentStopId = (state: State) =>
  state.router.param.stopId || null

export const selectCurrentStop = createSelector(
  selectCurrentLineStops,
  selectCurrentStopId,
  (stops, stopId) => stops.find(x => x.id === stopId)
)

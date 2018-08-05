import { createSelector } from 'reselect'
import { lines, stops } from '~/__fixtures__'
import type { State } from '~/type'

export const selectLines = () => lines

export const selectCurrentLineId = (state: State) =>
  state.router.params.lineId || null

export const selectCurrentLine = createSelector(
  selectLines,
  selectCurrentLineId,
  (lines, lineId) => lines.find(x => x.id === lineId)
)

export const selectCurrentLineStops = () => stops

export const selectCurrentStopId = (state: State) =>
  state.router.params.stopId || null

export const selectCurrentStop = createSelector(
  selectCurrentLineStops,
  selectCurrentStopId,
  (stops, stopId) => stops.find(x => x.id === stopId)
)

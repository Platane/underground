import { createSelector } from 'reselect'
import { line_color } from '~/constant/color'
import type { State } from '~/store/reducer'

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

export const selectCurrentLineStatus = createSelector(
  state => state.resource.status_byLineId,
  selectCurrentLineId,
  (status_byLineId, lineId) => status_byLineId[lineId]
)

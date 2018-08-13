import { createSelector } from 'reselect'
import { selectLines, selectCurrentLineId } from './line'
import { selectCurrentStationId } from './station'
import type { State } from '~/store/reducer'

export const selectCurrentStationArrivalTimes = createSelector(
  state => state.resource.arrivalTimes_byStationId,
  selectCurrentStationId,
  selectCurrentLineId,
  (arrivalTimes_byStationId, stationId, lineId) =>
    arrivalTimes_byStationId[stationId] &&
    arrivalTimes_byStationId[stationId].filter(x => x.lineId === lineId)
)

export const selectCurrentStationArrivalTimesByDestination = createSelector(
  selectCurrentStationArrivalTimes,
  arrivalTimes => {
    if (!arrivalTimes) return null

    const by_destination = {}

    arrivalTimes.forEach(x =>
      (by_destination[x.destinationId] =
        by_destination[x.destinationId] || []).push(x)
    )

    return Object.keys(by_destination).map(id => ({
      id,
      name: by_destination[id][0].destinationName,
      arrivalTimes: by_destination[id],
    }))
  }
)

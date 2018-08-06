import {
  getAllLines,
  getLineStops,
  getNextArrivalsTime,
} from '~/service/api-tfl'

import {
  selectCurrentLineId,
  selectCurrentStopId,
} from '~/store/selector/resource'
import { createSelector } from 'reselect'

const selectRequired = createSelector(
  selectCurrentLineId,
  selectCurrentStopId,
  (lineId, stopId) =>
    [
      // all the lines
      { type: 'lines', key: 'lines' },

      // one line
      lineId && { type: 'line:stops', key: `line:${lineId}:stops`, lineId },

      // one stop arrival times
      stopId && {
        type: 'stop:arrivalTimes',
        key: `stop:${stopId}:arrivalTimes`,
        lineId,
        stopId,
      },
    ].filter(Boolean)
)

const hydrate = (required, res) => ({ type: 'tfl:hydrate', required, res })
const fetchFailed = (required, error) => ({
  type: 'tfl:error',
  required,
  error,
})

export const init = store => {
  const fetching = {}

  const update = async () => {
    const state = store.getState()

    selectRequired(state).forEach(required => {
      if (fetching[required.key]) return

      fetching[required.key] = Date.now()

      let promise

      switch (required.type) {
        case 'lines':
          promise = getAllLines()
          break
        case 'line:stops':
          promise = getLineStops(required.lineId)
          break
        case 'stop:arrivalTimes':
          promise = getNextArrivalsTime(required.stopId)
          break
      }

      if (promise)
        promise
          .then(res => store.dispatch(hydrate(required, res)))
          .catch(error => store.dispatch(fetchFailed(required, error)))
    })
  }

  update()

  store.subscribe(update)
}

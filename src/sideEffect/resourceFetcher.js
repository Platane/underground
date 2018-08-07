import {
  getAllLines,
  getLineStops,
  getLineStatus,
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

      // one line stops
      lineId && { type: 'line:stops', key: `line:${lineId}:stops`, lineId },

      // one line status
      lineId && { type: 'line:status', key: `line:${lineId}:status`, lineId },

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
  errorMessage: error && error.message,
})

const REFRESH_ARRIVAL_TIMES_DELAY = 100 * 60 * 3
const REFRESH_STATUS_DELAY = 100 * 60 * 10

export const init = store => {
  const fetching = {}

  const update = async () => {
    const state = store.getState()

    selectRequired(state).forEach(required => {
      if (
        // fetch if ...

        // it's not fetched yet
        !fetching[required.key] ||
        // or it's an arrival times request, and it should be refreshed
        (required.type === 'stop:arrivalTimes' &&
          Date.now() - fetching[required.key] > REFRESH_ARRIVAL_TIMES_DELAY) ||
        // or it's an line status request, and it should be refreshed
        (required.type === 'line:status' &&
          Date.now() - fetching[required.key] > REFRESH_STATUS_DELAY)
      ) {
        fetching[required.key] = Date.now()

        let promise

        switch (required.type) {
          case 'lines':
            promise = getAllLines()
            break
          case 'line:stops':
            promise = getLineStops(required.lineId)
            break
          case 'line:status':
            promise = getLineStatus(required.lineId)
            break
          case 'stop:arrivalTimes':
            promise = getNextArrivalsTime(required.stopId)
            break
        }

        if (promise)
          promise
            .then(res => store.dispatch(hydrate(required, res)))
            .catch(error => {
              console.error(error)
              store.dispatch(fetchFailed(required, error))
            })
      }
    })
  }

  update()

  setInterval(update, REFRESH_ARRIVAL_TIMES_DELAY / 10)

  store.subscribe(update)
}

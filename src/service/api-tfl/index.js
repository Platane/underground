import fetch from '~/service/fetch'
import { TFL_API_ID, TFL_API_KEY, TFL_API_URL } from '~/config'
import type { Line, Stop, ArrivalTime, ID } from '~/type'

const fetchFTL = (path, options = {}) =>
  fetch(TFL_API_URL + path, {
    ...options,
    query: {
      ...(options.query || {}),
      app_key: TFL_API_KEY,
      app_id: TFL_API_ID,
    },
  })

export const getAllLines = (): Promise<Line[]> =>
  fetchFTL('/line/mode/tube').then(x =>
    x.map(({ id, name }) => ({
      id,
      name,
    }))
  )

// export const getLineStatus = (lineId): line[] =>
//   fetchFTL(`/line/${lineId}/status`)

export const getLineStops = (lineId: ID): Promise<Stop[]> =>
  fetchFTL(`/line/${lineId}/stoppoints`).then(x =>
    x.map(({ id, commonName, lat, lon, lines }) => ({
      id,
      name: commonName,
      geoPoint: { lat, lon },

      // at this point, there is no way to tell which line is a tube line
      // let's filter that later
      linesIncludingBuses: lines.map(({ id, name }) => ({ id, name })),
    }))
  )

export const getNextArrivalsTime = (stopId: ID): Promise<ArrivalTime[]> =>
  fetchFTL(`/stoppoint/${stopId}/arrivals`).then(x =>
    x
      .filter(({ modeName }) => modeName === 'tube')
      .map(
        ({
          id,
          lineId,
          expectedArrival,
          platformName,
          destinationName,
          destinationNaptanId,
        }) => ({
          id,
          lineId,
          arrivalTime: expectedArrival,
          platformName,

          destinationId: destinationNaptanId,
          destinationName,
        })
      )
  )

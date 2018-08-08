import fetch from '~/service/fetch'
import { TFL_API_ID, TFL_API_KEY, TFL_API_URL } from '~/config'
import type { Line, Station, Route, ArrivalTime, ID, LineStatus } from '~/type'

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
  fetchFTL('/line/mode/tube').then(x => x.map(parseLine))

const parseStationName = x => x.split('Underground Station')[0].trim()

const parseLine = ({ id, name }) => ({
  id,
  name,
})

const parseStation = ({ name, id, lat, lon, lines }) => ({
  name: parseStationName(name),

  id,
  geoPoint: { lat, lon },

  linesIncludingBuses: lines.map(parseLine),
})

const flat = arr => [].concat(...arr)

export const getLineRoutes = (
  lineId: ID
): Promise<{ stations: Station[], routes: Route[] }> =>
  fetchFTL(`/line/${lineId}/route/sequence/outbound`).then(
    ({ orderedLineRoutes, stations, stopPointSequences }) => ({
      // stations
      stations: [
        ...flat(stopPointSequences.map(({ stopPoint }) => stopPoint)),
        ...stations,
      ].map(parseStation),

      //
      routes: orderedLineRoutes.map(({ naptanIds }) => naptanIds),
    })
  )

export const getLineStatus = (lineId: ID): Promise<LineStatus> =>
  fetchFTL(`/line/${lineId}/status`).then(x => {
    // for whatever reason the result is an array
    const { lineStatuses } = x.find(x => x.id === lineId)

    const currentStatus =
      // find the status with the current period
      lineStatuses.find(
        x => x.validityPeriods && x.validityPeriods.some(({ isNow }) => isNow)
      ) ||
      // or take the first one
      lineStatuses[0]

    if (!currentStatus) return 'unknown'

    return currentStatus.statusSeverityDescription
  })

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

          destinationId: destinationNaptanId || null,
          destinationName: destinationName || null,
        })
      )
  )

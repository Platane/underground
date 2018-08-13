import type { Line, Station, Route, LineStatus, ID, ArrivalTime } from '~/type'

export type State = {
  lines: Line[] | null,
  station_byId: { [ID]: Station },
  status_byLineId: { [ID]: LineStatus | null },
  routes_byLineId: { [ID]: Route[] },
  arrivalTimes_byStationId: { [ID]: ArrivalTime[] },
}

export const reduce = (state: State, action: *): State => {
  switch (action.type) {
    case 'tfl:hydrate':
      switch (action.required.type) {
        case 'lines':
          return { ...state, lines: action.res }

        case 'line:routes': {
          const newState = {
            ...state,
            routes_byLineId: {
              ...state.routes_byLineId,
              [action.required.lineId]: action.res.routes,
            },
            station_byId: {
              ...state.station_byId,
            },
          }

          action.res.stations.forEach(
            station => (newState.station_byId[station.id] = station)
          )

          return newState
        }

        case 'line:status':
          return {
            ...state,
            status_byLineId: {
              ...state.status_byLineId,
              [action.required.lineId]: action.res,
            },
          }

        case 'station:arrivalTimes':
          return {
            ...state,
            arrivalTimes_byStationId: {
              ...state.arrivalTimes_byStationId,
              [action.required.stationId]: action.res,
            },
          }
      }
  }
  return state || defaultState
}

export const defaultState: State = {
  lines: null,
  station_byId: {},
  routes_byLineId: {},
  status_byLineId: {},
  arrivalTimes_byStationId: {},
}

export const reduce = (state, action) => {
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
            stations_byId: {
              ...state.stations_byId,
            },
          }

          action.res.stations.forEach(
            station => (newState.stations_byId[station.id] = station)
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
            arrivalTimes_byStopId: {
              ...state.arrivalTimes_byStopId,
              [action.required.stationId]: action.res,
            },
          }
      }
  }
  return state || defaultState
}

export const defaultState = {
  lines: null,
  stations_byId: {},
  routes_byLineId: {},
  status_byLineId: {},
  arrivalTimes_byStopId: {},
}

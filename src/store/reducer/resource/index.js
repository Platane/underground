export const reduce = (state, action) => {
  switch (action.type) {
    case 'tfl:hydrate':
      switch (action.required.type) {
        case 'lines':
          return { ...state, lines: action.res }

        case 'line:stops':
          return {
            ...state,
            stops_byLineId: {
              ...state.stops_byLineId,
              [action.required.lineId]: action.res,
            },
          }

        case 'stop:arrivalTimes':
          return {
            ...state,
            arrivalTimes_byStopId: {
              ...state.arrivalTimes_byStopId,
              [action.required.stopId]: action.res,
            },
          }
      }
  }
  return state || defaultState
}

export const defaultState = {
  lines: null,
  stops_byLineId: {},
  arrivalTimes_byStopId: {},
}

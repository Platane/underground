export type ID = string
export type Date = string

export type Line = {
  id: ID,
  name: string,
}

export type GeoPoint = {
  lat: number,
  lon: number,
}

export type Route = ID[]

export type Station = {
  id: ID,
  name: string,
  geoPoint: GeoPoint,

  linesIncludingBuses: Line[],
}

export type ArrivalTime = {
  id: ID,
  lineId: ID,
  arrivalTime: Date,
  platformName: string,

  destinationId: ID | null,
  destinationName: string | null,
}

export type State = {
  router: {
    key: string,
    path: string,
    param: { [string]: string },
  },

  resource: {
    lines: Line[] | null,
    status_byLineId: { [ID]: LineStatus | null },
    station_byId: { [ID]: Station },
    routes_byLineId: { [ID]: Route[] },
    arrivalTimes_byStationId: { [ID]: ArrivalTime[] },
  },
}

export type LineStatus = 'unknown' | 'Good Service' | 'Part Suspended' | string

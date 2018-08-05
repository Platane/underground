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

export type Stop = {
  id: ID,
  name: string,
  geoPoint: GeoPoint,
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
    params: { [string]: string },
  },
}

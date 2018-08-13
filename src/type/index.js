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

export type LineStatus = 'unknown' | 'Good Service' | 'Part Suspended' | string

import { connect } from 'react-redux'
import { ArrivalTime as Dumb } from './Dumb'
import {
  selectCurrentLine,
  selectCurrentStop,
  selectCurrentLineColor,
  selectCurrentStopArrivalTimesByDestination,
} from '~/store/selector/resource'

const injectState = connect(state => ({
  line: selectCurrentLine(state),
  stop: selectCurrentStop(state),
  destinations: selectCurrentStopArrivalTimesByDestination(state),
  lineColor: selectCurrentLineColor(state),
}))

export const ArrivalTime = injectState(Dumb)

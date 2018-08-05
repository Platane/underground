import { connect } from 'react-redux'
import { ArrivalTime as Dumb } from './Dumb'
import {
  selectCurrentLine,
  selectCurrentStop,
  selectCurrentLineColor,
} from '~/store/selector/resource'

const injectState = connect(state => ({
  line: selectCurrentLine(state),
  stop: selectCurrentStop(state),
  lineColor: selectCurrentLineColor(state),
}))

export const ArrivalTime = injectState(Dumb)

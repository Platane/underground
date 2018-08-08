import { connect } from 'react-redux'
import { ArrivalTime as Dumb } from './Dumb'
import {
  selectCurrentLine,
  selectCurrentStation,
  selectCurrentLineColor,
  selectCurrentLineStatus,
} from '~/store/selector'

const injectState = connect(state => ({
  line: selectCurrentLine(state),
  station: selectCurrentStation(state),
  destinations: [],
  lineColor: selectCurrentLineColor(state),
  lineStatus: selectCurrentLineStatus(state),
}))

export const ArrivalTime = injectState(Dumb)

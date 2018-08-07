import { connect } from 'react-redux'
import { StopList as Dumb } from './Dumb'
import {
  selectCurrentLine,
  selectCurrentLineStatus,
  selectCurrentLineColor,
  selectCurrentLineStops,
} from '~/store/selector/resource'
import { line_color } from '~/constant/color'

const injectState = connect(state => ({
  line: selectCurrentLine(state),
  lineStatus: selectCurrentLineStatus(state),
  stops: selectCurrentLineStops(state),
  lineColor: selectCurrentLineColor(state),
}))

export const StopList = injectState(Dumb)

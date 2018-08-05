import { connect } from 'react-redux'
import { StopList as Dumb } from './Dumb'
import {
  selectCurrentLine,
  selectCurrentLineColor,
  selectCurrentLineStops,
} from '~/store/selector/resource'
import { line_color } from '~/constant/color'

const injectState = connect(state => ({
  line: selectCurrentLine(state),
  stops: selectCurrentLineStops(state),
  lineColor: selectCurrentLineColor(state),
}))

export const StopList = injectState(Dumb)

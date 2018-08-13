import { connect } from 'react-redux'
import { StationList as Dumb } from './Dumb'
import {
  selectCurrentLine,
  selectCurrentLineStatus,
  selectCurrentLineColor,
  selectCurrentLineStationsMesh,
} from '~/store/selector'
import { line_color } from '~/constant/color'

const injectState = connect(state => ({
  line: selectCurrentLine(state),
  lineStatus: selectCurrentLineStatus(state),
  lineColor: selectCurrentLineColor(state),
  mesh: selectCurrentLineStationsMesh(state),
}))

export const StationList = injectState(Dumb)

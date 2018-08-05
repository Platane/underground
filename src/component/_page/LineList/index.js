import { connect } from 'react-redux'
import { LineList as Dumb } from './Dumb'
import { selectLines } from '~/store/selector/resource'

const injectState = connect(state => ({ lines: selectLines(state) }))

export const LineList = injectState(Dumb)

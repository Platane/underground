import { combineReducers } from 'redux'
import {
  reduce as resource,
  defaultState as resourceDefaultState,
} from './resource'

import type { State as routerState } from './router'
import type { State as resourceState } from './resource'

import { reduce as router, defaultState as routerDefaultState } from './router'

export const reduce = combineReducers({
  router,
  resource,
})

export type State = {
  router: routerState,
  resource: resourceState,
}

export const defaultState: State = {
  router: routerDefaultState,
  resource: resourceDefaultState,
}

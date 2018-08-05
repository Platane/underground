import { combineReducers } from 'redux'
// import {
//   reduce as resource,
//   reduceGlobal as resourceGlobal,
//   defaultState as resourceDefaultState,
// } from './resource'

import { reduce as router, defaultState as routerDefaultState } from './router'

export const reduce = combineReducers({
  router,
})

export const defaultState = {
  router: routerDefaultState,
}

import { createRouteResolver, reduce as reduce_ } from 'declarative-router'
import { routes } from './routes'

const resolveRoute = createRouteResolver(routes)

export type State = {
  key: string,
  path: string,
  param: { [string]: string },
}

export const defaultState: State = {
  query: {},
  hash: '',
  ...resolveRoute('/'),
}

export const reduce = reduce_(routes)

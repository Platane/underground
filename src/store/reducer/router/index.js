import { createRouteResolver, reduce as reduce_ } from 'declarative-router'
import { routes } from './routes'

const resolveRoute = createRouteResolver(routes)

export const defaultState = {
  query: {},
  hash: '',
  ...resolveRoute('/'),
}

export const reduce = reduce_(routes)

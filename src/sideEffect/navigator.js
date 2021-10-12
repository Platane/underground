import {
  createDomNavigator,
  initSideEffect as initRouter,
} from 'declarative-router'

const navigator = createDomNavigator({ pathPrefix: process.env.PUBLIC_PATH })

export const init = initRouter({ navigator })

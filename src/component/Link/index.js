import { connect } from 'react-redux'
import React from 'react'

import { goTo } from '~/store/action/router'

const pathPrefix = '/'+(process.env.PUBLIC_PATH || '/').split('/').filter(Boolean).join('/')

const DumbLink = ({ href, goTo, children, ...props }) => (
  <a
    {...props}
    href={pathPrefix+href}
    onClick={e => {
      e.preventDefault()
      goTo(href)
    }}
  >
    {children}
  </a>
)

export const Link = connect(null, { goTo })(DumbLink)

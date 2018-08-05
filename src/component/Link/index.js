import { connect } from 'react-redux'
import React from 'react'

import { goTo } from '~/store/action/router'

const DumbLink = ({ href, goTo, children, ...props }) => (
  <a
    href={href}
    onClick={e => {
      e.preventDefault()
      goTo(href)
    }}
  >
    {children}{' '}
  </a>
)

export const Link = connect(null, { goTo })(DumbLink)

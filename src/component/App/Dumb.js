import React from 'react'
import styled from 'react-emotion'
import { LineList } from '../_page/LineList'

const Content = ({ router, ...props }) => {
  switch (router.key) {
    case 'home':
      return <LineList {...props} />
    default:
      return null
  }
}

export const App = props => (
  <Container>
    <Content {...props} />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

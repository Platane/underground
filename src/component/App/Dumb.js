import React from 'react'
import styled from 'react-emotion'
import { LineList } from '../_page/LineList'
import { StationList } from '../_page/StationList'
import { ArrivalTime } from '../_page/ArrivalTime'

const Content = ({ router, ...props }) => {
  switch (router.key) {
    case 'home':
      return <LineList {...props} />
    case 'line':
      return <StationList {...props} />
    case 'station':
      return <ArrivalTime {...props} />
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
  width: 100%;
`

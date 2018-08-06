import React from 'react'
import styled from 'react-emotion'
import {
  white,
  black,
  grey,
  transitionUnit,
} from '~/component/_abstract/palette'
import { TimeAgo } from '~/component/TimeAgo'
import { withUpdatedTimes } from './withUpdatedTimes'

const Destination_ = ({ name, arrivalTimes }) => (
  <Container>
    <Name>
      {name ||
        'We have no idea where those are going. Use them if you feel lucky'}
    </Name>

    <ArrivalList>
      {arrivalTimes.map(({ id, arrivalTime }, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span>,</span>}
          <ArrivalDate date={arrivalTime} />
        </React.Fragment>
      ))}
      <span> min </span>
    </ArrivalList>
  </Container>
)

const ArrivalList = styled.div`
  margin: 10px;
`
const ArrivalDate = styled(TimeAgo)`
  margin-left: 6px;
`

const Container = styled.div`
  margin: 20px;
`

const Name = styled.h3``

export const Destination = withUpdatedTimes(Destination_)

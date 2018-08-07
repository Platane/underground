import React from 'react'
import styled from 'react-emotion'
import {
  white,
  black,
  grey,
  transitionUnit,
} from '~/component/_abstract/palette'
import { Header } from '../StopList/Header'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { Destination } from './Destination'
import { line_color } from '~/constant/color'

export const ArrivalTime = ({
  line,
  stop,
  lineColor,
  lineStatus,
  destinations,
}) => (
  <Container>
    <Header line={stop} lineColor={lineColor} lineStatus={lineStatus} />

    <Center>
      {!destinations && <Spinner />}

      <DestinationList>
        {(destinations || []).map(destination => (
          <Destination key={destination.id || '_'} {...destination} />
        ))}
      </DestinationList>

      {destinations &&
        destinations.length === 0 && (
          <span>
            Wow! have you see the time ? There is obviously no train until
            tomorrow. Seems like you are up for a walk{' '}
          </span>
        )}
    </Center>
  </Container>
)

const Center = styled.div`
  margin: 0 auto;
`
const DestinationList = styled.div``

const Line = styled.div`
  width: 6px;
  background-color: ${grey};
  border-radius: 3px;
  position: absolute;
  bottom: 24px;
  top: 24px;
  left: 7px;
`

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`
// align-items: center;
// justify-content: flex-start;

const StopLine = styled.div`
  position: relative;
  margin: 0 auto;
`

const Tic = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  margin-right: 20px;
`

const Name = styled.h3`
  min-width: 200px;
  color: ${black};
`

const Row = styled(Link)`
  padding: 10px 0;
  margin: 10px 0;

  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

import React from 'react'
import styled from 'react-emotion'
import {
  white,
  black,
  grey,
  transitionUnit,
} from '~/component/_abstract/palette'
import { Header } from './Header'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { line_color } from '~/constant/color'

export const StopList = ({ line, stops, lineColor }) => (
  <Container>
    <Header line={line} lineColor={lineColor} />

    <StopLine>
      <Line style={{ backgroundColor: lineColor }} />

      {(stops || []).map(stop => (
        <Row key={stop.id} href={`/line/${line.id}/stop/${stop.id}`}>
          <Tic style={{ backgroundColor: lineColor }} />

          <Branches>
            {stop.lines
              .filter(x => x.id !== line.id)
              .map(({ name, id }) => (
                <Branch
                  key={id}
                  style={{ backgroundColor: line_color[id] }}
                  title={name}
                />
              ))}
          </Branches>

          <Name>{stop.name}</Name>
        </Row>
      ))}

      {!stops && <Spinner />}
    </StopLine>
  </Container>
)

const Line = styled.div`
  width: 6px;
  background-color: ${grey};
  border-radius: 3px;
  position: absolute;
  bottom: 24px;
  top: 24px;
  left: 7px;
`

const Branches = styled.div`
  min-width: 120px;

  display: flex;
  flex-direction: row;
`
const Branch = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;

  margin-right: 6px;
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

  margin-right: 16px;
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

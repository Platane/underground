import React from 'react'
import styled from 'react-emotion'
import { white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'

window.React = React

const equal = (a, b) => a.lineId === b.lineId

export const LineList = ({ lines }) => (
  <Container>
    {lines.map(line => (
      <Row key={line.id} href={`/line/${line.id}`}>
        {line.name}
      </Row>
    ))}
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Row = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

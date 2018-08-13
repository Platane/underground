import React from 'react'
import styled from 'react-emotion'
import { white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'

export const Header = ({ line, lineColor, lineStatus }) => (
  <Container style={{ backgroundColor: lineColor }}>
    <Center>
      <Name>{line && line.name}</Name>
    </Center>
    <Status>{lineStatus || <Spinner />}</Status>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 160px;
  width: 100%;
  padding: 10px 30px;
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`

const Name = styled.h1`
  color: ${white};
`
const Status = styled.h3`
  min-height: 22px;
  color: ${white};
`

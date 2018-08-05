import React from 'react'
import styled from 'react-emotion'
import { white, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'

export const Header = ({ line, lineColor }) => (
  <Container style={{ backgroundColor: lineColor }}>
    <Name>{line && line.name}</Name>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 160px;
  width: 100%;
  padding: 30px;
`

const Name = styled.h1`
  color: ${white};
`

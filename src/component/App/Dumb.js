import React from 'react'
import styled from 'react-emotion'

export const App = props => <Container>{props.router.key}</Container>

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

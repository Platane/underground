import React from 'react'
import styled from 'react-emotion'
import { white, black, transitionUnit } from '~/component/_abstract/palette'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { line_color } from '~/constant/color'

export const LineList = ({ lines }) => (
  <Container>
    <Center>
      {(lines || []).map(line => (
        <Row key={line.id} href={`/line/${line.id}`}>
          <Tic style={{ backgroundColor: line_color[line.id] }} />
          <Name>{line.name}</Name>
        </Row>
      ))}
    </Center>

    {!lines && <Spinner />}
  </Container>
)

const Center = styled.div`
  margin: 0 auto;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Tic = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  margin-right: 20px;
`

const Name = styled.h3`
  color: ${black};
`

const Row = styled(Link)`
  padding: 10px;
  margin: 10px;

  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

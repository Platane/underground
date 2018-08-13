import React from 'react'
import styled from 'react-emotion'
import {
  white,
  black,
  grey,
  transitionUnit,
} from '~/component/_abstract/palette'
import { Lines } from './Lines'
import { Header } from './Header'
import { Link } from '~/component/Link'
import { Spinner } from '~/component/Spinner'
import { line_color } from '~/constant/color'

export const StationList = ({ line, mesh, lineColor, lineStatus }) => (
  <Container>
    <Header line={line} lineColor={lineColor} lineStatus={lineStatus} />

    <Center>
      <Table>
        <div style={{ margin: '24px 20px 0 0' }}>
          <Lines
            color={lineColor}
            segments={(mesh && mesh.segments) || []}
            points={(mesh && mesh.points) || []}
          />
        </div>

        <StationLine>
          {((mesh && mesh.stations) || []).map(station => (
            <Row
              key={station.id}
              href={`/line/${line.id}/station/${station.id}`}
            >
              <Name>{station.name}</Name>

              <Stations>
                {station.lines
                  .filter(x => x.id !== line.id)
                  .map(({ name, id }) => (
                    <Station
                      key={id}
                      style={{ backgroundColor: line_color[id] }}
                      title={name}
                    />
                  ))}
              </Stations>
            </Row>
          ))}
        </StationLine>
      </Table>

      {!mesh && <Spinner />}
    </Center>
  </Container>
)

const Stations = styled.div`
  min-width: 120px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`
const Station = styled.div`
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

const Center = styled.div`
  margin: 0 auto;
  position: relative;
`
const StationLine = styled.div`
  position: relative;
`
const Table = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`

const Name = styled.h4`
  min-width: 180px;
  color: ${black};
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Row = styled(Link)`
  height: 50px;

  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

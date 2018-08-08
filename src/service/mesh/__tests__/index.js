import test from 'tape'
import { createMesh } from '../index'

test('createMesh', async t => {
  {
    const routes = [
      //
      ['a0', 'a1'],
      ['a0', 'b1'],
    ]

    const mesh = createMesh(routes)

    t.deepEqual(createMesh(routes).map(x => x.id[1]), ['0', '1', '1'])
  }

  //
  {
    const routes = [
      //
      ['a0', 'a1', 'a2', 'a3', 'a4', 'a5'],
      [/* */ 'b1', 'a2', 'a3', 'b4', 'b5', 'b6'],
    ]

    const mesh = createMesh(routes)

    t.deepEqual(createMesh(routes).map(x => x.id[1]), [
      '0',
      '1',
      '1',
      '2',
      '3',
      '4',
      '4',
      '5',
      '5',
      '6',
    ])
  }

  t.end()
})

import test from 'tape'
import { createMesh } from '../index'

test('createMesh - 1', t => {
  const routes = [
    //
    ['a0', 'a1'],
    ['a0', 'b1'],
  ]

  const mesh = createMesh(routes)

  t.deepEqual(createMesh(routes).map(x => x.id[1]), ['0', '1', '1'])

  t.end()
})

test('createMesh - 2', t => {
  const routes = [
    //
    ['a0', 'a1', 'a2', 'a3', 'a4', 'a5'],
    [/* */ 'b1', 'a2', 'a3', 'b4', 'b5', 'b6'],
  ]

  const mesh = createMesh(routes)

  // prettier-ignore
  t.deepEqual(
      createMesh(routes).map(x => x.id[1]),
      ['0','1','1','2','3','4','4','5','5','6']
    )

  t.end()
})

test('createMesh - 3', t => {
  const routes = [(['a1', 'a0'], ['a0', 'a1', 'b2'])]

  const mesh = createMesh(routes)

  // prettier-ignore

  // t.deepEqual(
  //     createMesh(routes).map(x => x.id[1]),
  //     ['0','1','1','2','3','4','4','5','5','6']
  //   )

  t.end()
})

const removeDuplicate = arr => arr.filter((x, i) => i === arr.indexOf(x))
const flat = arr => [].concat(...arr)

test('createMesh - 4', t => {
  // prettier-ignore
  let routes =[["940GZZLUAMS","940GZZLUCAL","940GZZLUCYD","940GZZLURKW","940GZZLUMPK","940GZZLUNOW","940GZZLUNWH","940GZZLUPNR","940GZZLUNHA","940GZZLUHOH","940GZZLUNKP","940GZZLUPRD","940GZZLUWYP","940GZZLUWIG","940GZZLUFYR","940GZZLUBST","940GZZLUGPS","940GZZLUESQ","940GZZLUKSX","940GZZLUFCN","940GZZLUBBN","940GZZLUMGT","940GZZLULVT","940GZZLUALD"],["940GZZLUCSM","940GZZLUCAL","940GZZLUCYD","940GZZLURKW","940GZZLUCXY","940GZZLUWAF"],["940GZZLUCSM","940GZZLUCAL","940GZZLUCYD","940GZZLURKW","940GZZLUMPK","940GZZLUNOW","940GZZLUNWH","940GZZLUPNR","940GZZLUNHA","940GZZLUHOH","940GZZLUNKP","940GZZLUPRD","940GZZLUWYP","940GZZLUFYR","940GZZLUBST","940GZZLUGPS","940GZZLUESQ","940GZZLUKSX","940GZZLUFCN","940GZZLUBBN","940GZZLUMGT","940GZZLULVT","940GZZLUALD"],["940GZZLUUXB","940GZZLUHGD","940GZZLUICK","940GZZLURSP","940GZZLURSM","940GZZLUEAE","940GZZLURYL","940GZZLUWHW","940GZZLUHOH","940GZZLUNKP","940GZZLUPRD","940GZZLUWYP","940GZZLUFYR","940GZZLUBST","940GZZLUGPS","940GZZLUESQ","940GZZLUKSX","940GZZLUFCN","940GZZLUBBN","940GZZLUMGT","940GZZLULVT","940GZZLUALD"],["940GZZLUWAF","940GZZLUCXY","940GZZLUMPK","940GZZLUNOW","940GZZLUNWH","940GZZLUPNR","940GZZLUNHA","940GZZLUHOH","940GZZLUNKP","940GZZLUPRD","940GZZLUWYP","940GZZLUFYR","940GZZLUBST","940GZZLUGPS","940GZZLUESQ","940GZZLUKSX","940GZZLUFCN","940GZZLUBBN","940GZZLUMGT","940GZZLULVT","940GZZLUALD"]]

  let ids = removeDuplicate(flat(routes))

  // prettier-ignore
  // const x = [
  // 20,25,26,
  // ].map(i => ids[i])
  // routes = routes.map(route => route.filter(id => x.includes(id)))
  // ids = removeDuplicate(flat(routes))

  const mesh = createMesh(routes)

  // t.equal(mesh.length, ids.length)

  t.end()
})

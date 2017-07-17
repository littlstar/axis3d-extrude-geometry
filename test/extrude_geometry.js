'use strict'

const test = require('tape')
const { Geometry } = require('axis3d')
const ExtrudeGeometry = require('../extrude_geometry')

let geoCount
const noop = () => void 0
const createExtrudedGeometry = (o) => {
  const ex = new ExtrudeGeometry(o)
  ++geoCount
  return ex
}

test('new ExtrudeGeometry({positions})', ({
  deepEqual,
  assert,
  throws,
  pass,
  plan,
  end
}) => {
  plan(12)

  if ('function' == typeof ExtrudeGeometry) {
    pass('is function')
  }

  throws(() => { createExtrudedGeometry({positions: undefined}) },
        TypeError,
        'throws TypeError when `positions` is not an array.')

  throws(() => { createExtrudedGeometry({
                      positions: [1,0,-1],
                      path: {}})
        },
        TypeError,
        'throws TypeError when `path` is not an array.')

  throws(() => { createExtrudedGeometry({
                      positions: [1,0,-1],
                      path: []})
        },
        TypeError,
        'throws TypeError when `path` array is empty.')

  throws(() => { createExtrudedGeometry({
                      positions: [1,0,-1],
                      path: [1,0,-1],
                      edges: 'undefined'})
        },
        TypeError,
        'throws TypeError when `edges` is not an array.')

  throws(() => { createExtrudedGeometry({
                      positions: [1,0,-1],
                      path: [1,0,-1],
                      edges: []})
        },
        TypeError,
        'throws TypeError when `edges` array is empty.')

  throws(() => { createExtrudedGeometry({
                      positions: [1,0,-1],
                      path: [1,0,-1],
                      edges: [1,0,-1],
                      cells: 'hello'})
        },
        TypeError,
        'throws TypeError when `cells` is not an array.')

  throws(() => { createExtrudedGeometry({
                      positions: [1,0,-1],
                      path: [1,0,-1],
                      edges: [1,0,-1],
                      cells: []})
        },
        TypeError,
        'throws TypeError when `cells` array is empty.')

  throws(() => { createExtrudedGeometry({asdf:0}) },
        TypeError,
        'throws TypeError when no `positions` array is passed in.')

  const extrudedGeo = createExtrudedGeometry({positions: [1,0,-1]})
  assert('object' == typeof extrudedGeo.complex)
  assert(null != extrudedGeo.complex)

  const nullGeo = createExtrudedGeometry({positions: [1,0,-1]})
  deepEqual({
          flatten: false,
        }, nullGeo, 'creates complex if `positions` array is passed in.')

  end()
})
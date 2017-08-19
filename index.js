const isTypedArray = require('is-typedarray')
const { Geometry } = require('axis3d')

const extrudeByShape = require('extrude')
const extrudeByPath = require('extrude-by-path')
const extrudeEdges = require('extrude-edges')
const cleanPSLG = require('clean-pslg')
const cdt2d = require('cdt2d')

const isArrayLike = (array) => {
  return Boolean(Array.isArray(array) || isTypedArray(array))
}

class ExtrudeGeometry extends Geometry {
  constructor(opts = {}) {
    let complex = null
    let {
      positions = null,
      closed = true,
      edges = null,
      cells = null,
      path = null,
    } = opts

    if (null == positions) {
      throw new TypeError("Expecting positions to be an array, but `null` was given.")
    } else if (false == isArrayLike(positions)) {
      throw new TypeError("Expecting positions to be an array.")
    } else if (0 == positions.length) {
      throw new TypeError("Empty positions array given.")
    }

    if (null == path) {
      complex = extrudeByShape(positions, {bottom: -1, top: 1})
    } else {
      closed = Boolean(closed)

      if (false == isArrayLike(path)) {
        throw new TypeError("Expecting path to be an array.")
      } else
        if (0 == path.length) {
          throw new TypeError("Empty path array given.")
        }

      // extrude edges, if not given
      if (null == edges) {
        let tmp = extrudeEdges.faces(positions)
        edges = []
        for (let i = 0; i < tmp.length; i += 2) {
          edges.push([tmp[i], tmp[i + 1]])
        }
      } else if (false == isArrayLike(edges)) {
        throw new TypeError("Expecting edges to be an array.")
      } else if (0 == edges.length) {
        throw new TypeError("Empty edges array given.")
      }

      // triangluate cells if cells aren't given and edges are
      if (null == cells) {
        cells = cdt2d(positions)
      } else if (cells && false == isArrayLike(cells)) {
        throw new TypeError("Expecting cells to be an array.")
      } else if (0 == cells.length) {
        throw new TypeError("Empty cells array given.")
      }

      cleanPSLG(positions, edges)
      complex = extrudeByPath({
        positions,
        closed,
        edges,
        cells,
        path
      })
    }

    super({complex})
  }
}

module.exports = {
  ExtrudeGeometry
}

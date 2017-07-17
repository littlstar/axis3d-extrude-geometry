'use strict'

/**
 * Module dependencies.
 */
const isTypedArray = require('is-typedarray')
const { Geometry } = require('axis3d')

const extrudeByShape = require('extrude')
const extrudeByPath = require('extrude-by-path')
const extrudeEdges = require('extrude-edges')
const cleanPSLG = require('clean-pslg')
const coalesce = require('defined')
const cdt2d = require('cdt2d')

const kDefaultExtrudeGeometryPathZCoefficient = 0.001
const kDefaultExtrudeGeometryPathSteps = 10

module.exports = kDefaultExtrudeGeometryPathZCoefficient
module.exports = kDefaultExtrudeGeometryPathSteps

module.exports = ExtrudeGeometry
function ExtrudeGeometry({
    positions,
    edges,
    cells,
    path,
    closed = true,
  } = {}) {

  let complex = null

  if (null == positions) {
    throw new TypeError("Expecting positions to be an array, but `null` was given.")
  } else if (false == isTypedArray(positions)) {
    throw new TypeError("Expecting positions to be an array.")
  } else if (0 == positions.length) {
    throw new TypeError("Empty positions array given.")
  }

  if (null == path) {
    complex = extrudeByShape(positions, {bottom: -1, top: 1})
  } else {
    closed = Boolean(closed)

// TODO: @vipyne fix this
// if (false == Boolean(isTypedArray(path))) {
//       throw new TypeError("Expecting path to be an array.")
//     } else
    if (0 == path.length) {
      throw new TypeError("Empty path array given.")
    }

    // extrude edges, if not given
    if (null == edges) {
      let tmp = [...extrudeEdges.faces(positions)]
      edges = []
      for (let i = 0; i < tmp.length; i += 2) {
        edges.push([tmp[i], tmp[i + 1]])
      }
// TODO: @vipyne fix this
    // } else if (false == Boolean(isTypedArray(edges))) {
    //   throw new TypeError("Expecting edges to be an array.")
    } else if (0 == edges.length) {
      throw new TypeError("Empty edges array given.")
    }

    // triangluate cells if cells aren't given and edges are
    if (null == cells) {
      cells = cdt2d(positions)
    } else if (cells && false == Boolean(isTypedArray(cells))) {
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

  const extrudedGeometry = new Geometry({complex})

  return extrudedGeometry
}

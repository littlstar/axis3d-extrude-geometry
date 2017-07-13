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
  let extrudedGeometry = {}

  if (false == isTypedArray(positions)) {
    throw new TypeError("Expecting positions to be an array.")
  } else if (0 == positions.length) {
    throw new TypeError("Empty positions array given.")
  }

  if (null == path) {
    complex = extrudeByShape(positions, {bottom: -1, top: 1})
  } else {
    closed = Boolean(closed)

    if (false == isTypedArray(path)) {
      throw new TypeError("Expecting path to be an array.")
    } else if (0 == path.length) {
      throw new TypeError("Empty path array given.")
    }

    // extrude edges, if not given
    if (null == edges) {
      let tmp = [...extrudeEdges.faces(positions)]
      edges = []
      for (let i = 0; i < tmp.length; i += 2) {
        edges.push([tmp[i], tmp[i + 1]])
      }
    } else if (false == isTypedArray(edges)) {
      throw new TypeError("Expecting edges to be an array.")
    } else if (0 == edges.length) {
      throw new TypeError("Empty edges array given.")
    }

    // triangluate cells if cells aren't given and edges are
    if (null == cells) {
      cells = cdt2d(positions)
    } else if (cells && false == isTypedArray(cells)) {
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

  const extrusion = new Geometry({complex})

  extrudedGeometry._complex = extrusion._complex
  extrudedGeometry.complex = extrusion.complex
  extrudedGeometry.positions = extrusion.complex.positions
  extrudedGeometry.normals = extrusion.complex.normals
  extrudedGeometry.uvs = extrusion.complex.uvs
  extrudedGeometry.cells = extrusion.complex.cells
  extrudedGeometry.path = extrusion.path

  return extrudedGeometry
}

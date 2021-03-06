const { PerspectiveCamera } = require('axis3d/camera')
const { Material } = require('axis3d/material')
const { Context } = require('axis3d')
const { Frame } = require('axis3d/frame')
const { Mesh } = require('axis3d/mesh')

const { ExtrudeGeometry } = require('../')
const quat = require('gl-quat')

// https://github.com/substack/extrude-by-path
function helix() {
  let helix = {}
  const path = []
  const positions = [
    [0,0], [-0.06,-0.08], [0.06,-0.08], [0,-0.2], [0.06,-0.08],
    [0.1,0.03], [0.19,-0.06], [0.1,0.03], [0,0.1], [0.12,0.16], [0,0.1],
    [-0.1,0.03], [-0.12,0.16], [-0.1,0.03], [-0.06,-0.08], [-0.19,-0.06]
  ]
  for (let i = 0; i < 1000; ++i) {
    const theta = i/320*2*Math.PI
    const p = (i-500)/250
    path.push([Math.cos(theta), Math.sin(theta), p, 8*theta])
  }
  helix.path = path
  helix.positions = positions
  return helix
}

const ctx = new Context()
const material = new Material(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const box = new Mesh(ctx, {geometry: new ExtrudeGeometry(helix())})

frame(({time}) => {
  camera({position: [0, 0, 3]}, () => {
    material({}, () => {
      box({wireframe: true})
    })
  })
})

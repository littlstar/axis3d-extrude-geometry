axis3d-extrude-geometry
=======================

Geometry extrusion for Axis3D.

This modules provides a class that accepts an array of 2D positions and
extrudes that shape into 3D. It attempts to compute a simplicial complex
from given parameters. Edges, cells, and path can also be provided,
otherwise they are computed. This class leverages [clean-pslg][clean-pslg] to
remove duplicate vertices and edges from a planar straight line graph using
iterated snap rounding. If cells are not given, this class uses
[Constrained Delaunay triangulation][cdt] by way of [cdt2d][cdt2d] to compute them.

## Usage

```js
new ExtrudeGeometry({ positions: positions })
```

## Installation

```sh
$ npm install axis3d axis3d-extrude-geometry
```

## Example

```js
const { PerspectiveCamera } = require('axis3d/camera')
const { ExtrudeGeometry } = require('axis3d-extrude-geometry')
const { Material } = require('axis3d/material')
const { Context } = require('axis3d')
const { Frame } = require('axis3d/frame')
const { Mesh } = require('axis3d/mesh')

const geometry = new ExtrudeGeometry({positions: [0.5, 1.0, -0.5]})
const material = new Material(ctx)
const camera = new PerspectiveCamera(ctx)
const frame = new Frame(ctx)
const mesh = new Mesh(ctx, {geometry})

frame(() => {
  camera({position: [0, 0, 10]}, () => {
    material({wireframe: true}, () => {
      mesh()
    })
  })
})
```

## API

### ExtrudeGeometry(opts)

Extends the built-in `Geometry` class in [Axis3D][axis3d].

```js
new ExtrudeGeometry(opts)
```

where `opts` contains

* `positions` - An array of 2D vectors that form points in a polygon
* `edges` - An array of 2D vectors of indices (`[i, j]`) to compute complex cells
* `cells` - An array of 3D vectors of indices to the complex positions
* `path` - An array of 3D (`[x, y, z]`) or 4D (`[x, y, z, r]`) vectors where `r` is the twist angle in radians
* `closed` - Indicates a closed path. (Default: `true`)

## See Also

* https://github.com/mikolalysenko/clean-pslg
* https://github.com/substack/extrude-by-path
* https://github.com/hughsk/extrude-edges
* https://github.com/freeman-lab/extrude
* https://github.com/mikolalysenko/cdt2d

## License

MIT



[cdt]: https://en.wikipedia.org/wiki/Constrained_Delaunay_triangulation
[cdt2d]: https://github.com/mikolalysenko/cdt2d
[axis3d]: https://github.com/littlstar/axis3d
[clean-pslg]: https://github.com/mikolalysenko/clean-pslg

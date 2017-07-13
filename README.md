# axis3d-extrude-geometry

Geometry extrusion module for use with Axis3D.

## Usage
#### `extrudedGeometry = new ExtrudeGeometry({positions: [positions]})`

## Installation

Download or clone this repo and run:

```
npm install
budo example -p 3000 --live --verbose
```

## Example
```javascript
const { PerspectiveCamera,
        FlatMaterial,
        Command,
        Context,
        Frame,
        Mesh
      } = require('axis3d')
const { ExtrudeGeometry } = require('axis3d-extrude-geometry')

const extrudedGeometry = new ExtrudeGeometry({positions: [0.5, 1.0, -0.5, ...]})
const mesh = new Mesh(ctx, {geometry: extrudedGeometry})

frame(({time}) => {
  camera({position: [0, 0, 10]}, () => {
    material({}, () => {
      extrudedGeometry({wireframe: true})
    })
  })
})
```

## API

### ExtrudeGeometry
#### Parameters:
`positions` - positions, required<br>
`edges` - edges, optional<br>
`cells` - cells, optional<br>
`path` - path, optional<br>
`closed` - closed, defaults to true<br>
#### Returns:
```
{
  cells: Array
  complex: Object
  normals: Array
  positions: Array
  path: Array
  uvs: Array
  _complex: Object
}
```

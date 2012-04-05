from geoscript.geom import Geometry

def run(geom, dist):
  return geom.buffer(dist)

run.title = 'Buffer'
run.description = 'Buffers a geometry'
run.inputs = [(Geometry, 'The geometry to buffer'), (float,'The buffer distance')]
run.outputs = [('result', Geometry, 'The buffered geometry')]

import EdgeDescriptor from './EdgeDescriptor';
import NodeDescriptor from './NodeDescriptor';

export default interface GraphDescriptor {
  edges: EdgeDescriptor[];
  nodes: NodeDescriptor[];
}

export default interface EdgeDescriptor {
  key?: string;
  from: string;
  to: string;
  label?: string;
  fromPort?: string;
  toPort?: string;
}

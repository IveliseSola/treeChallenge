import { Node } from './Node';
import { NodeLeaf } from './NodeLeaf';

export class NodeFactory {
    _id: number;
    name: string;
    minValue: number;
    maxValue: number;
    leaves: NodeLeaf[];
    constructor( name?, minValue?, maxValue?, leaves?) {
        this.name = name;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.leaves = [];
    }
}

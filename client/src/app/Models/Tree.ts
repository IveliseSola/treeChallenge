import { Node } from './Node';
import { NodeFactory } from './NodeFactory';

export class Tree {
    root: Node;
    constructor(node?) {
        this.root = new Node(node);
    }

    add(nodeFactoryName, nodesLeavesAmount, minValue, maxValue) {
        const min = +minValue;
        const max = +maxValue;
        const nodeFactory = new NodeFactory(nodeFactoryName, min, max);
        this.root.children.push(nodeFactory);
        nodeFactory.parent = this.root.name;

        if (nodesLeavesAmount < 15) {
            for (let i = 0; i < nodesLeavesAmount; i++) {
                const value = nodeFactory.generateNumber();
                const child = new Node(value);
                nodeFactory.children.push(child);
            }
        } else {
            throw new Error('Maximum amount of children nodes allow is 15');
        }
    }
}

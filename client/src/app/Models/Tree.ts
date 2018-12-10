import { Node } from './Node';
import { NodeFactory } from './FactoryNode';

class Tree {
    root: Node;
    constructor(node){
        this.root = new Node(node);
    }

add (nodeFactoryName, nodesLeavesAmount, minValue, maxValue) {
    //if (this.root.children.includes(nodeFactoryName))

    let nodeFactory = new NodeFactory(nodeFactoryName, minValue, maxValue);
    this.root.children.push(nodeFactory);
    nodeFactory.parent = this.root.name;
    
    if (nodesLeavesAmount <=15) {
        for(let i = 0 ; i < nodesLeavesAmount; i++) {
            let value = nodeFactory.generateNumber();
            let child = new Node(value);
            nodeFactory.children.push(child);
      }
    } else {
        throw new Error('Maximum amount of leaves nodes allow it is 15');
    }
    
}

remove (nodeFactory) {
      //By Id I guess since I can't do it by name, name might be duplicate it.
}

// remove (name, parentname, traversal) {
//     let tree = this,
//         parent = null,
//         childToRemove = null,
//         index;

//     let callback = (node) => {
//         if (node.name === parentname){
//             parent = node;
//         }
//     };
//     this.containValue(callback, traversal);

//     if (parent){
//         index = parent.children.findIndex(parent.children.name === name);

//         if(index === undefined){
//             throw new Error('Node to remove does not exist.');
//         } else {
//             childToRemove = parent.children.splice(index, 1);
//         }
//     } else {
//         throw new error('Parent does not exist.');
//     }
//     return childToRemove;    
// }

}

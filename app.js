//  UTILS


class Node {
    constructor(data){
        this.data = data;
        this.parent = null;
        this.children = [];
    }
}

class NodeFactory extends Node {
    constructor(data, min, max){
        super(data)
        this.min = min;
        this.max = max;
    }

    generateNumber () {
        return Math.floor(Math.random() * (this.max - this.min) + this.min);
    }
}

class Tree {
    constructor(node){
        this.root = new Node(node);
    }

traverseDTree (callback) {
    /*
    I could use a while loop to check for depth < 3, 
    and call the traverseD function in it,
    my tree has a known detph = 2, but for this, 
    the function always need to be call from the root.
    */
    (function traverseD(currentNode) {
        for (let i = 0; i < currentNode.children.length; i++) {
            traverseD(currentNode.children[i]);
        }
        callback(currentNode);
    })
    (this.root);
}

containValue (callback, traversal) { traversal.call(this, callback) };


addNodesLeaves (data, parentData, traversal) {
    let child = new Node(data);
    let parent = null;
        
    let callback = (node) => {
            if (node.data === parentData) {
                parent = node;
            }
        };
    this.containValue(callback, traversal);

    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existing parent.')
    }
};

add (nodeFactoryName, nodesLeavesAmount, minValue, maxValue) {
    let nodeFactory = new NodeFactory(nodeFactoryName, minValue, maxValue);
    this.root.children.push(nodeFactory);
    nodeFactory.parent = this.root.data;
    
    if (nodesLeavesAmount <=15) {
        for(let i = 0 ; i < nodesLeavesAmount; i++) {
            let value = nodeFactory.generateNumber();
            let child = new Node(value);
            nodeFactory.children.push(child);
      }
    } else {
        throw new Error('Maximun amount of leaves nodes allow it is 15');
    }
    
}

remove (data, parentData, traversal) {
    let tree = this,
        parent = null,
        childToRemove = null,
        index;

    let callback = (node) => {
        if (node.data === parentData){
            parent = node;
        }
    };
    this.containValue(callback, traversal);

    if (parent){
        index = parent.children.findIndex(parent.children.data === data);

        if(index === undefined){
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = paent.children.splice(index, 1);
        }
    } else {
        throw new error('Parent does not exist.');
    }
    return childToRemove;    
}

}

//  let tree2 = new Tree('CEO')
let newTree =  new Tree('GreatA');
newTree.add('PapiB', 2, 100, 200);
console.log(newTree.root.data);
console.log(newTree.root.children[0].children[0].data);
console.log(newTree.root.children[0].children[1].data);

// tree2.add('VP of Happiness', 'CEO', tree2.traverseDTree);
// tree2.add('VP of Finance', 'CEO', tree2.traverseDTree);
// tree2.add('VP of Sadness', 'CEO', tree2.traverseDTree);
 
// tree2.add('Director of Puppies', 'VP of Finance', tree2.traverseDTree);
// tree2.add('Manager of Puppies', 'Director of Puppies', tree2.traverseDTree);

// console.log(tree2);
// console.log(tree1.root.children[1].children[0].data);




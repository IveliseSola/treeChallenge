
class Node {
    constructor(data){
        this.data = data;
        this.parent = null;
        this.children = [];
    }
}

class Tree {
    constructor(node){
        this.root = node
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


add (data, parentData, traversal) {
    let child = new Node(data);
        parent = null;
        
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

remove(data, parentData, traversal){
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

module.exports = {
    tree: new Tree,
    node: new Node
}




function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    var node = new Node(data);
    this.root = node;
}

Tree.prototype.traverseDTree = function (callback) {
    /*
    I could use a while loop to check for depth < 3, 
    and call the traverseD function in it,
    my tree has a known detph = 2, but for this, 
    the function always need to be call from the root.
    */
    (function traverseD(currentNode) {
        for (var i = 0; i < currentNode.children.length; i++) {
            traverseD(currentNode.children[i]);
        }
        callback(currentNode);
    })
        (this.root);
}

Tree.prototype.containValue = function (callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.add = function (data, parentData, traversal) {
    var child = new Node(data);
    parent = null;
    callback = function (node) {
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

Tree.prototype.remove = function(data, parentData, traversal){
    var tree = this,
        parent = null,
        childToRemove = null,
        index;

    var callback = function(node){
        if (node.data === parentData){
            parent = node;
        }
    };
    this.containValue(callback, traversal);

    if (parent){
        index = findIndex(parent.children, data);

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
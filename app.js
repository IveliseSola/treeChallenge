
function Node(data){
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data){
    var node = new Node(data);
    this._root = node;
}

Tree.prototype.traverseVTree = function(callback){

    (function traverseV(currentNode){
        for (var i = 0; i < currentNode.children.length; i++ ){
            traverseV(currentNode.children[i]);
        }
        callback(currentNode);
    })
    (this._root);
}

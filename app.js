

class Node {
    constructor(data){
        this.data = data;
        this.parent = null;
        this.children = [];
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


add (data, parentData, traversal) {
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

 let tree2 = new Tree('CEO')


tree2.add('VP of Happiness', 'CEO', tree2.traverseDTree);
tree2.add('VP of Finance', 'CEO', tree2.traverseDTree);
tree2.add('VP of Sadness', 'CEO', tree2.traverseDTree);
 
tree2.add('Director of Puppies', 'VP of Finance', tree2.traverseDTree);
tree2.add('Manager of Puppies', 'Director of Puppies', tree2.traverseDTree);
console.log(tree2);



// function Node(data) {
//     this.data = data;
//     this.parent = null;
//     this.children = [];
// }

// function Tree(data) {
//     var node = new Node(data);
//     this.root = node;
// }

// Tree.prototype.traverseDTree = function (callback) {
//     /*
//     I could use a while loop to check for depth < 3, 
//     and call the traverseD function in it,
//     my tree has a known detph = 2, but for this, 
//     the function always need to be call from the root.
//     */
//     (function traverseD(currentNode) {
//         for (var i = 0; i < currentNode.children.length; i++) {
//             traverseD(currentNode.children[i]);
//         }
//         callback(currentNode);
//     })
//         (this.root);
// }

// Tree.prototype.containValue = function (callback, traversal) {
//     traversal.call(this, callback);
// };

// Tree.prototype.add = function (data, parentData, traversal) {
//     var child = new Node(data);
//     parent = null;
//     callback = function (node) {
//         if (node.data === parentData) {
//             parent = node;
//         }
//     };
//     this.containValue(callback, traversal);

//     if (parent) {
//         parent.children.push(child);
//         child.parent = parent;
//     } else {
//         throw new Error('Cannot add node to a non-existing parent.')
//     }
// };

// Tree.prototype.remove = function(data, parentData, traversal){
//     var tree = this,
//         parent = null,
//         childToRemove = null,
//         index;

//     var callback = function(node){
//         if (node.data === parentData){
//             parent = node;
//         }
//     };
//     this.containValue(callback, traversal);

//     if (parent){
//         index = findIndex(parent.children, data);

//         if(index === undefined){
//             throw new Error('Node to remove does not exist.');
//         } else {
//             childToRemove = paent.children.splice(index, 1);
//         }
//     } else {
//         throw new error('Parent does not exist.');
//     }
//     return childToRemove;    
// }

// findIndex = (arr, data) => {
//     var index;
//     for (let i = 0; i < arr.length; i++){
//         if (arr[i].data === data){
//             index = i;
//         }
//     }
//     return index;

// }

// let tree1 = new Tree('CEO')

// tree1.add('VP of Happiness', 'CEO', tree1.traverseDTree);
// tree1.add('VP of Finance', 'CEO', tree1.traverseDTree);
// tree1.add('VP of Sadness', 'CEO', tree1.traverseDTree);
 
// tree1.add('Director of Puppies', 'VP of Finance', tree1.traverseDTree);
// tree1.add('Manager of Puppies', 'Director of Puppies', tree1.traverseDTree);

// console.log(tree1.root.children[1].children[0].data);

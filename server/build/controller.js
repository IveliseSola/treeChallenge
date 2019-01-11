
const rootModel = require('./models/Root');

export const getTree = io => {
    rootModel.find({}).then(root => {
        const result = { 'success': true, 'message': 'Sending Tree Successfully', root };
        io.emit('getTree', result);
    }).catch(err => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
};
export const getNode = (io, id) => {
    rootModel.findOne({ 'children._id': id }).then(root => {
        const child = root.children.id(id);
        const result = { 'success': true, 'message': 'Node Found Successfully', child };
        io.emit('getNode', result);
    }).catch(err => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
};
export const addRoot = (io, Root) => {
    rootModel.create(Root).then(root => {
        const result = { 'success': true, 'message': 'Root created Successfully', root };
        io.emit('addRoot', result);
    }).catch(err => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
};
export const addNode = (io, NodeData) => {
    rootModel.findOne({ _id: NodeData.rootId }).then(root => {
        root.children.push(NodeData.child);
        return root.save();
    }).then(root => {
        const result = { 'success': true, 'message': 'Node Added Successfully', root };
        io.emit('addNode', result);
    }).catch(err => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
};
export const updateNode = (io, NodeData) => {
    rootModel.findOne({ 'children._id': NodeData.idChild }).then(root => {
        const oldNode = root.children.id(NodeData.idChild);
        oldNode.set(NodeData.data);
        return root.save();
    }).then(root => {
        const result = { 'success': true, 'message': 'Node Updated Successfully', root };
        io.emit('updateNode', result);
    }).catch(err => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
};
export const deleteNode = (io, id) => {
    rootModel.findOne({ 'children._id': id }).then(root => {
        root.children.id(id).remove();
        return root.save();
    }).then(root => {
        const result = { 'success': true, 'message': 'Node Deleted Successfully', root };
        io.emit('deleleNode', result);
    }).catch(err => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
};
export const deleteTree = (io, id) => {
    rootModel.findByIdAndRemove({ '_id': id }).then(() => {
        const result = { 'success': true, 'message': 'Tree Deleted Successfully' };
        io.emit('deleleTree', result);
    }).catch(err => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
};
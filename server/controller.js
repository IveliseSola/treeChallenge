
const rootModel = require('./models/Root');

module.exports.getTree = (io) => {
    rootModel.find({})
        .then((root) => {
            const result = { 'success': true, 'message': 'Sending Tree Successfully', root }
            io.emit('getTree', result);
        }).catch((err) => {
            const result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        });
}
module.exports.getNode = (io, id) => {
    rootModel.findOne({ 'children._id': id })
        .then((root) => {
            const child = root.children.id(id);
            const result = { 'success': true, 'message': 'Node Found Successfully', child }
            // io.emit('getNode', result);
        }).catch((err) => {
            const result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        });
}
module.exports.addRoot = (io, Root) => {
    rootModel.create(Root)
        .then((root) => {
            const result = { 'success': true, 'message': 'Root created Successfully', root }
            // io.emit('addRoot', result);
        }).catch((err) => {
            const result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        })
}
module.exports.addNode = (io, auxObj) => {
    rootModel.findOne({ _id: auxObj.id })
        .then((root) => {
            root.children.push(auxObj.nodeFactoryData);
            return root.save();
        }).then((root) => {
            const result = { 'success': true, 'message': 'Node Added Successfully', root }
            // io.emit('addNode', result);
        }).catch((err) => {
            const result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        });
}
module.exports.updateNode = (io, nodeData) => {
    rootModel.findOne({ 'children._id': nodeData.id })
        .then((root) => {
            const oldNode = root.children.id(nodeData.id);
            oldNode.set(nodeData.nodeFactoryData);
            return root.save();
        }).then((root) => {
            const result = { 'success': true, 'message': 'Node Updated Successfully', root }
            // io.emit('updateNode', result);
        }).catch((err) => {
            const result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        });
}
module.exports.deleteNode = (io, id) => {
    rootModel.findOne({ 'children._id': id})
        .then((root) => {
            root.children.id(id).remove();
            return root.save();
        }).then((root) => {
            const result = { 'success': true, 'message': 'Node Deleted Successfully', root }
            // io.emit('deleleNode', result);
        }).catch((err) => {
            const result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        });
}
module.exports.deleteTree = (io, id) => {
    rootModel.findByIdAndRemove({'_id': id})
    .then(() => {
        const result = { 'success': true, 'message': 'Tree Deleted Successfully'}
        // io.emit('deleleTree', result);
    }).catch( (err) => {
        const result = { 'success': false, 'message': 'Some Error', 'error': err };
        console.log(result);
    });
}

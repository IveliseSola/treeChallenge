
const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.route('/').get(controller.getTree);

router.route('/:id').get(controller.getNode);

router.route('/').post(controller.addRoot);

router.route('/:id').post(controller.addNode);

router.route('/').put(controller.updateNode);

router.route('/:id').put(controller.deleteNode);

router.route('/:id').delete(controller.deleteTree);

export default router;
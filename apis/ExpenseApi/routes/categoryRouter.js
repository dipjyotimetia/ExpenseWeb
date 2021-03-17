const express = require('express');
const categoryController = require('../controllers/categoryController');

const routes = (Category) => {
    const categoryRouter = express.Router();
    const controller = categoryController(Category);

    categoryRouter.route('/category')
        .post(controller.post)
        .get(controller.get);

    return categoryRouter;

}

module.exports = routes;
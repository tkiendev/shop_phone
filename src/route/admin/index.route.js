const dashbordRoute = require('./dashbord.route.js');
const productRoute = require('./product.route.js');
const categoryRoute = require('./category.route.js');


module.exports = (app) => {
    app.use('/admin/dashboard', dashbordRoute);
    app.use('/admin/products', productRoute);
    app.use('/admin/category', categoryRoute);
    return app;
}
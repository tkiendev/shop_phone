const dashbordRoute = require('./dashbord.route.js');
const productRoute = require('./product.route.js');

module.exports = (app) => {
    app.use('/admin/dashboard', dashbordRoute);
    app.use('/admin/products', productRoute);
    return app;
}
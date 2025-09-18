const productModel = require('../../models/product.model');

module.exports.index = async (req, res) => {

    const products = await productModel.find({
        deleted: false
    });
    console.log(products);
    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Quản lý sản phẩm',
        lickReload: '/admin/products',
        activeProduct: true,
        products: products
    });
}
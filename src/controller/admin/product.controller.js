const productModel = require('../../models/product.model');

module.exports.index = async (req, res) => {

    const products = await productModel.find({
        deleted: false
    });
    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Quản lý sản phẩm',
        lickReload: '/admin/products',
        activeProduct: true,
        products: products
    });
}

module.exports.changeStatus = async (req, res) => {
    const productId = req.params.id;
    const status = req.params.status;
    try {
        if (productId && status) {
            await productModel.updateOne(
                { _id: productId },
                { status: (status === 'active' ? 'inactive' : 'active') }
            );

            res.redirect('/admin/products');
        }
    } catch (error) {

    }

}
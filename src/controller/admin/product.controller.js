const productModel = require('../../models/product.model');

module.exports.index = async (req, res) => {
    try {
        const products = await productModel.find({
            deleted: false
        });

        console.log(products.length);
        if (products.length === 0) {
            req.flash('warning', 'Không có sản phẩm nào trong hệ thống!');
        }

        res.render('admin/pages/product/index.pug', {
            pageTitle: 'Quản lý sản phẩm',
            lickReload: '/admin/products',
            activeProduct: true,
            products: products
        });
    } catch (error) {
        req.flash('error', 'Lấy danh sách sản phẩm thất bại!');
        res.redirect('/admin/dashboard');
    }
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

            req.flash('success', 'Cập nhật trạng thái sản phẩm thành công!');
            res.redirect('/admin/products');
        }
    } catch (error) {
        req.flash('error', 'Cập nhật trạng thái sản phẩm thất bại!');
        res.redirect('/admin/products');
    }

}
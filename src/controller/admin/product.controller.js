module.exports.index = (req, res) => {
    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Quản lý sản phẩm',
        lickReload: '/admin/products',
        activeProduct: true,
    });
}
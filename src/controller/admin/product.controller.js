const productModel = require('../../models/product.model');

const searchHelper = require('../../helpers/search');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    try {
        const query = req.query;
        let sort = {
            position: 'asc'
        }
        if (query.sortName && query.sortType) {
            sort = { [query.sortName]: query.sortType === 'asc' ? 'asc' : 'desc' };
        }
        const find = {
            deleted: false
        };

        // Search by name
        const keyword = searchHelper(query.keyword);
        if (keyword) {
            find.name = keyword;
        }

        // filter by status
        if (query.status) {
            find.status = query.status;
        }

        // Take out the products
        const products = await productModel.find(find).sort(sort);

        if (products.length === 0) {
            req.flash('warning', 'Không có sản phẩm nào trong hệ thống!');
        }

        res.render('admin/pages/product/index.pug', {
            pageTitle: 'Quản lý sản phẩm',
            lickReload: '/admin/products',
            activeProduct: true,
            products: products,
            keywordSearch: keyword ? query.keyword : '',
            status: query.status || ''
        });
    } catch (error) {
        req.flash('error', 'Không thể load trang!');
        res.redirect('/admin/dashboard');
    }
}

// [PATCH] /admin/products/change-status/:id/:status
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
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        }
    } catch (error) {
        req.flash('error', 'Cập nhật trạng thái sản phẩm thất bại!');
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
}
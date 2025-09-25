const productModel = require('../../models/product.model');
const productMethodModel = require('../../models/productMethod.model');

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

        // pagination
        let pagination = {}
        if (query.page || query.limit) {
            pagination = {
                page: query.page ? parseInt(query.page) : 1,
                limit: query.limit ? parseInt(query.limit) : 4
            }
        } else {
            pagination = {
                page: 1,
                limit: 4
            }
        }

        const countDocuments = await productModel.countDocuments();
        const lengthPage = Math.floor(countDocuments / pagination.limit);

        // Take out the products
        const products = await productModel.find(find).sort(sort).skip((pagination.page - 1) * 4).limit(pagination.limit);

        if (products.length === 0) {
            req.flash('warning', 'Không có sản phẩm nào trong hệ thống!');
        }

        res.render('admin/pages/product/index.pug', {
            pageTitle: 'Quản lý sản phẩm',
            lickReload: '/admin/products',
            activeProduct: true,
            products: products,
            keywordSearch: keyword ? query.keyword : '',
            status: query.status || '',
            lengthPage: lengthPage,
            currentPage: pagination.page
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

// [DELETE] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findOne({ _id: productId });
        if (product) {
            await productModel.updateOne(
                { _id: productId },
                { deleted: true }
            );
            req.flash('success', 'Xóa sản phẩm thành công!');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        } else {
            req.flash('warning', 'Không tìm thấy sản phẩm!');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        }
    } catch (error) {
        req.flash('error', 'Xóa sản phẩm thất bại!');
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
}

// [PATCH] /admin/products/change-position/:id
module.exports.changePosition = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findOne({ _id: productId });
        if (product) {
            await productModel.updateOne(
                { _id: productId },
                { position: parseInt(req.body.position) }
            );
            req.flash('success', 'Cập nhật vị trí sản phẩm thành công!');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        } else {
            req.flash('warning', 'Không tìm thấy sản phẩm!');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        }
    } catch (error) {
        req.flash('error', 'Cập nhật vị trí sản phẩm thất bại!');
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, action } = req.body
        if (ids.split(",").length === 0) {
            req.flash('warning', 'Vui lòng chọn ít nhất 1 sản phẩm');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
            return;
        }

        let message = ''
        switch (action) {
            case 'change-delete': {
                const arrayId = ids.split(",");

                await productModel.updateMany({ _id: { $in: [...arrayId] } }, { $set: { deleted: true } });
                message = `Xóa thành công ${arrayId.length} sản phẩm`;
                break;
            }
            case 'change-position': {
                const arrayId = ids.split(",");

                for (item of arrayId) {
                    const [id, position] = item.split("_");
                    await productModel.updateOne({ _id: id }, { position: position })
                }
                message = `Thay vị trí ${arrayId.length} sản phẩm`;
                break;
            }
            case 'change-active': {
                const arrayId = ids.split(",");

                await productModel.updateMany({ _id: { $in: [...arrayId] } }, { $set: { status: 'active' } });
                message = `Thay đổi trạng thái hoạt động ${arrayId.length} sản phẩm`;
                break;
            }
            case 'change-inactive': {
                const arrayId = ids.split(",");

                await productModel.updateMany({ _id: { $in: [...arrayId] } }, { $set: { status: 'inactive' } });
                message = `Thay đổi trạng thái dừng hoạt động ${arrayId.length} sản phẩm`;
                break;
            }
            default:
                req.flash('warning', 'Vui lòng chọn trạng thái cập nhật');
                const previousPage = req.get('Referer') || '/';
                res.redirect(previousPage);
                break;
        }

        req.flash('success', message);
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
    catch (error) {
        req.flash('error', 'Cập nhật sản phẩm thất bại!');
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    try {
        res.render('admin/pages/product/create.pug', {
            pageTitle: 'Thêm sản phẩm'
        });
    }
    catch (error) {
        req.flash('error', 'Cập nhật sản phẩm thất bại!');
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
}

// [POST] /admin/products/create
module.exports.activeCreate = async (req, res) => {
    function splitObject(obj, splitKey) {
        const obj1 = {};
        const obj2 = {};
        let foundSplit = false;

        for (const key in obj) {
            if (!foundSplit) {
                obj1[key] = obj[key];
                if (key === splitKey) {
                    foundSplit = true;
                }
            } else {
                obj2[key] = obj[key];
            }
        }

        return { obj1, obj2 };
    }

    try {
        const { obj1: product, obj2: productMethod } = splitObject(req.body, 'position')

        product.price = parseInt(product.price) ? parseInt(product.price) : 0;
        product.discountPercent = parseInt(product.discountPercent) ? parseInt(product.discountPercent) : 0;
        product.quantity = parseInt(product.quantity) ? parseInt(product.quantity) : 0;

        if (product.position == '') {
            product.position = await productModel.countDocuments() + 1;
            console.log(product.position)
        } else {
            product.position = parseInt(product.position) ? parseInt(product.position) : 1;
        }

        product.quantity = parseInt(product.quantity);

        const newProduct = new productModel(product);
        await newProduct.save();

        if (newProduct) {
            console.log()
            const NewProductMethod = new productMethodModel(productMethod);
            await NewProductMethod.save();
            if (productMethod) {
                newProduct.methodId = productMethod.id;
                productModel.updateOne({ _id: newProduct.id }, newProduct)

                req.flash('success', 'Tải lên sản phẩm thành công');
                const previousPage = '/admin/products';
                res.redirect(previousPage);
            }
            else {
                console.log(1);
                req.flash('success', 'Tải lên thuộc tính sản phẩm thất bại!');
                const previousPage = '/admin/products';
                res.redirect(previousPage);
            }
        } else {
            console.log(2);
            req.flash('success', 'Tải lên sản phẩm thành công');
            const previousPage = '/admin/products';
            res.redirect(previousPage);
        }
    }
    catch (error) {
        req.flash('error', 'Tải lên sản phẩm thất bại!');
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
}
const categoryModel = require('../../models/category.model.js');

const searchHelper = require('../../helpers/search.js');

// [GET] /admin/ctegory
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

        const categorys = await categoryModel.find(find).sort(sort);

        if (categorys.length === 0) {
            req.flash('warning', 'Không danh mục nào trong hệ thống!');
        }

        res.render('admin/pages/category/index.pug', {
            pageTitle: 'Danh mục sản phẩm',
            lickReload: '/admin/category',
            activeProduct: true,
            categorys: categorys,
            keywordSearch: keyword ? query.keyword : '',
            status: query.status || '',
        });
    }
    catch (error) {
        req.flash('error', 'Không thể tải trang danh mục');
        const previousPage = '/admin/dashbord';
        res.redirect(previousPage);
    }
}

// [GET] /admin/ctegory/create
module.exports.create = async (req, res) => {
    function buildTree(data) {
        const map = {};
        const tree = [];

        data.forEach(item => {
            const id = item._id.toString();
            map[id] = { ...item, children: [] };
        });

        data.forEach(item => {
            const parentId = item.parentId;
            if (parentId && map[parentId]) {
                map[parentId].children.push(map[item._id.toString()]);
            } else {
                tree.push(map[item._id.toString()]);
            }
        });

        return tree;
    }

    try {
        let categorys = await categoryModel.find({ deleted: false });
        categorys = categorys.map(item => item._doc);
        categorys = buildTree(categorys);

        console.log(categorys)
        res.render('admin/pages/category/create.pug', {
            pageTitle: 'Danh mục sản phẩm',
            categorys: categorys
        });
    }
    catch (error) {
        req.flash('error', 'Tải trang thêm mới danh mục thất bại!');
        const previousPage = '/admin/category';
        res.redirect(previousPage);
    }
}

// [PATCH] /admin/ctegory/create
module.exports.actionCreate = async (req, res) => {
    try {

        req.body.images = req.linkImg[0]
        const newCategory = new categoryModel(req.body);
        await newCategory.save();
        if (newCategory) {
            req.flash('success', 'Tạo danh mục thành công');
            const previousPage = '/admin/category';
            res.redirect(previousPage);
        } else {
            req.flash('error', 'Tạo danh mục thất bại!');
            const previousPage = req.get('Referer') || '/';
            res.redirect(previousPage);
        }

    }
    catch (error) {
        req.flash('error', 'Tạo danh mục thất bại!');
        const previousPage = req.get('Referer') || '/';
        res.redirect(previousPage);
    }
}

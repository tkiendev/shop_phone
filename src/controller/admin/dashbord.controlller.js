module.exports.index = (req, res) => {
    res.render('admin/pages/dashbord/index.pug', {
        pageTitle: 'Trang tổng quan',
        lickReload: '/admin/dashboard',
        activeDashboard: true
    });
};
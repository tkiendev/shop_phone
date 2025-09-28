// Hàm chờ jQuery được load xong rồi mới chạy
function waitForjQuery(callback) {
    if (typeof window.jQuery !== 'undefined') {
        callback();
    } else {
        setTimeout(() => waitForjQuery(callback), 50);
    }
}

// Khởi chạy khi jQuery đã sẵn sàng
waitForjQuery(function () {
    $(function () {
        // Xử lý click ảnh phụ → cập nhật ảnh chính
        $('.thumbnail').on('click', function () {
            const newSrc = $(this).data('src');
            $('#mainImage').attr('src', newSrc);
        });

        // Xử lý chuyển đổi mô tả / thông số kỹ thuật
        window.hideOthers = function (showId) {
            const sections = ['description', 'specs'];
            sections.forEach(id => {
                if (id !== showId) {
                    $('#' + id).collapse('hide');
                }
            });
        };

        // Xử lý xóa sản phẩm
        window.confirmDelete = function (id) {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                fetch(`/admin/products/delete/${id}`, {
                    method: 'DELETE'
                })
                window.location.href = `/admin/products`;
            }
        };
    });
});
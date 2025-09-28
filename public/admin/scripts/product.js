
// Change product status
const formChangeStatus = document.querySelector('form[form-change-status]');
if (formChangeStatus) {
    const productRows = document.querySelectorAll('tr[id]');
    productRows.forEach(row => {
        const statusCell = row.querySelector('td[status]');
        if (statusCell) {
            const productId = row.getAttribute('id');
            statusCell.addEventListener('click', (event) => {
                event.preventDefault();
                const status = statusCell.getAttribute('status');

                const checkDelete = confirm(`Bạn có chắc chắn muốn thay đổi trạng thái sang "${status === 'active' ? 'Đừng hoạt động' : 'Hoạt động'}"?`);
                if (!checkDelete) return;

                formChangeStatus.action = `/admin/products/change-status/${productId}/${status}?_method=PATCH`;
                formChangeStatus.submit();
            })
        }
    });
}

// delete product
const formDelete = document.querySelector('form[form-delete]');
if (formDelete) {
    const productRows = document.querySelectorAll('tr[id]');
    productRows.forEach(row => {
        const deleteBtn = row.querySelector('button[type="delete"]');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (event) => {
                event.preventDefault();

                const checkDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
                if (!checkDelete) return;

                const productId = row.getAttribute('id');
                formDelete.action = `${formDelete.action}/delete/${productId}?_method=DELETE`;
                formDelete.submit();
            });
        }
    });
}

// restore product
const formRestore = document.querySelector('form[form-restore]');
if (formRestore) {
    const productRows = document.querySelectorAll('tr[id]');
    productRows.forEach(row => {
        const restoreBtn = row.querySelector('button[type="restore"]');
        if (restoreBtn) {
            restoreBtn.addEventListener('click', (event) => {
                event.preventDefault();

                const checkrestore = confirm('Bạn có chắc chắn muốn Khôi phục sản phẩm này?');
                if (!checkrestore) return;

                const productId = row.getAttribute('id');
                formRestore.action = `${formRestore.action}/restore/${productId}?_method=PATCH`;
                formRestore.submit();
            });
        }
    });
}

// change position
const formPosition = document.querySelectorAll('form[change-position]');
if (formPosition) {
    formPosition.forEach(form => {
        const input = form.querySelector('input[name="position"]');
        if (input) {
            form.addEventListener('submit', (event) => {
                input.addEventListener('click', (e) => {
                    e.preventDefault();
                });
                event.preventDefault();
                form.action = `${form.action}/?_method=PATCH`;
                form.submit();
            });
        }

    });
}

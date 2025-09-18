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
                formChangeStatus.action = `/admin/products/change-status/${productId}/${status}?_method=PATCH`;
                formChangeStatus.submit();
            })
        }
    });
}
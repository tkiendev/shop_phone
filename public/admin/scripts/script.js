
// Notification auto close
const alert = document.querySelector('[role="alert"]');
if (alert) {
    const time = alert.getAttribute('time') || 5000;
    const notification = alert.parentElement;
    setTimeout(() => {
        alert.classList.add('fade-out');
    }, time - 1000);

    setTimeout(() => {
        notification.remove();
    }, time);
}

const href = window.location.href;
const url = new URL(href);
// seach & filter

// search by name
const inputSearchName = document.querySelector('#searchName');
if (inputSearchName) {
    const btnFilter = document.querySelector('[filterBtn]');
    if (btnFilter) {
        btnFilter.addEventListener('click', (event) => {
            event.preventDefault();
            const keyword = inputSearchName.value.trim();
            if (keyword === '') {
                url.searchParams.delete('keyword');
            } else {
                url.searchParams.set('keyword', keyword);
            }
            window.location.href = url;
        });
    }
}

// filter by status
const filterStatus = document.querySelector('#filterStatus');
if (filterStatus) {
    const btnFilter = document.querySelector('[filterBtn]');
    if (btnFilter) {
        btnFilter.addEventListener('click', (event) => {
            event.preventDefault();
            const status = filterStatus.value;
            if (status === '') {
                url.searchParams.delete('status');
            } else {
                url.searchParams.set('status', status);
            }
            window.location.href = url;
        });
    }
}

// sort
const filterSort = document.querySelector('#filterSort');
if (filterSort) {
    filterSort.addEventListener('change', (event) => {
        event.preventDefault();
        const sortName = filterSort.value;
        const sortType = filterSort.options[filterSort.selectedIndex].getAttribute('valueSort');
        if (sortName === '') {
            url.searchParams.delete('sortName');
            url.searchParams.delete('sortType');
        } else {
            url.searchParams.set('sortName', sortName);
            url.searchParams.set('sortType', sortType);
        }
        window.location.href = url;
    });
}

// select all
const selectAll = document.querySelector('#selectAll');
if (selectAll) {
    const checkboxes = document.querySelectorAll('input[name="selected"]');

    selectAll.addEventListener('click', (event) => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (event) => {
            let checkAll = 0;
            checkboxes.forEach(box => {
                if (box.checked) checkAll++;
            });

            // check if all selected
            checkAll === checkboxes.length ? selectAll.checked = true : selectAll.checked = false;
        });
    });

}

// change multi
const formChangMulti = document.querySelector('form[change-multi]');
if (formChangMulti) {
    formChangMulti.addEventListener('submit', (event) => {
        event.preventDefault();
        const checkboxes = document.querySelectorAll('input[name="selected"]');
        let ids = [];
        if (checkboxes.length > 0) {
            checkboxes.forEach((box) => {
                if (box.checked === true) {

                    const select = formChangMulti.querySelector('select');
                    if (select) {
                        const productPosition = box.parentElement.parentElement.querySelector('input[name=position]').value;
                        select.value === 'change-position' ? ids.push(`${box.value}_${productPosition}`) : ids.push(box.value);
                    } else {
                        ids.push(box.value);
                    }
                }
            });
        }

        if (ids.length === 0) {
            confirm('Vui lòng chọn ít nhất 1 sản phẩm');
            return;
        }

        const inputIds = formChangMulti.querySelector('input');
        if (inputIds) {
            inputIds.value = ids.toString();
        }

        formChangMulti.submit();
    })
}

// pagination
const pagination = document.querySelector('#pagination');
if (pagination) {
    const pages = pagination.querySelectorAll('li');
    if (pages.length !== 0) {
        pages.forEach((page) => {
            page.addEventListener('click', (event) => {
                const ValuePage = page.getAttribute('page');
                if (ValuePage) {
                    url.searchParams.set('page', ValuePage);
                } else {
                    url.searchParams.delete('page');
                }

                window.location.href = url
            });
        });
    }
}
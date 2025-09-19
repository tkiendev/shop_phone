
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
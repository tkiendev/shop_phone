
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

// seach & filter
const href = window.location.href;
const inputSearchName = document.querySelector('#searchName');
if (inputSearchName) {
    const url = new URL(href);
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
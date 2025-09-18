
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
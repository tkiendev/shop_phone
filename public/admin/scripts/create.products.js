const btnCreate = document.querySelector('button[btn-create]');
if (btnCreate) {
    btnCreate.addEventListener('click', (event) => {
        event.preventDefault();
        const formCreate = document.querySelector('form[form-create]');
        if (formCreate) {
            formCreate.submit();
        }
        const formCreateMethod = document.querySelector('from[form-create-method]');
        if (formCreateMethod) {
            formCreateMethod.submit();
        }
    });
}
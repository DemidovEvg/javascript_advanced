export function spinnerShow(containerSelector) {
    let spinner = `<div class="spinner-border mt-3" role="status">
            </div>`;

    let container = document.querySelector(containerSelector);
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', spinner)
}

export function spinnerShow(containerSelector) {
    let spinner = `
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>`;

    let container = document.querySelector(containerSelector);
    container.insertAdjacentHTML('beforeend', spinner)
}

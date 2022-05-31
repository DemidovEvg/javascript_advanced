app.component('my-error-comp', {
    props: ['message',],
    template: `
    <div class="alert alert-danger" role="alert">
    {{ message }}
    </div>`
});

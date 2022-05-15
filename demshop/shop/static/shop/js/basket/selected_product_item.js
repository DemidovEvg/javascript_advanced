export class SelectedProductItem {
    constructor({ id, title, price, img, count, description }) {
        this.title = title;
        this.id = id;
        this.price = price;
        this.img = img;
        this.count = count
        this.description = description;

    }
    renderItem() {
        let template = `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div>
                            <img src="${this.img}"
                                class="img-fluid rounded-3" alt="Shopping item"
                                style="width: 65px;">
                        </div>
                        <div class="ms-3">
                            <h5>${this.title}</h5>
                            <p class="small mb-0">${this.description}</p>
                        </div>
                    </div>
                    <div class="d-flex flex-row align-items-center">
                        <div style="width: 80px;">
                        <input type="number" class="counter form-control" 
                        value="${this.count}" 
                        data-product-id="${this.id}">
                        </div>
                        <div style="width: 80px;">
                            <h5 class="ms-2 mb-0">${this.price} р</h5>
                        </div>
                        <a href="#!" style="color: #cecece;"
                        data-product-id="${this.id}" class="remove-product">Х</a>
                    </div>
                </div>
            </div>
        </div>
         `;
        return template
    }


    changeCount(value) {
        this.count = value;
    }

}
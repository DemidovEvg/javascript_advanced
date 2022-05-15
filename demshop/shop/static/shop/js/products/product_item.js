export class ProductItem {
    constructor({ id, title, price, img, rating, description }) {
        this.title = title;
        this.id = id;
        this.price = price;
        this.img = img;
        this.rating = rating;
        this.description = description;
    }
    renderItem() {
        let template = `
                <div class="card p-3 col-12 col-lg-3 m-1">
                    <div class="wrapper h-100">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div class="mt-2">
                                <h4 class="product-name text-uppercase">${this.title}</h4>
                                <div class="mt-5">
                                    <div class="d-flex flex-row user-ratings">
                                        <div class="ratings">
                                            ${'<i class="fa fa-star"></i>'.repeat(this.rating)}
                                            ${'<i class="fa fa-star"></i>'.repeat(5 - this.rating)}
                                        </div>
                                        <h6 class="product-rating text-muted ms-1">${this.rating}/5</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="image">
                                <img class="product-image" src="${this.img}" width="110">
                            </div>
                        </div>
                        <p class="product-description">${this.description}</p>
                    </div>
                    <p class="product-price">${this.price}</p>
                    <button class="btn btn-danger">Купить</button>
                </div>
        `;

        return template
    }
}
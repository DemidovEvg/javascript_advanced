let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

let remove = (cart, req) => {
    // console.log(cart.contents);
    let currentElement = cart.contents.find(el => el.id_product === +req.params.id);
    let currentElementIndex = cart.contents.indexOf(currentElement);
    cart.contents.splice(currentElementIndex, 1)
    return JSON.stringify(cart, null, 4);
};


module.exports = {
    add,
    change,
    remove
};
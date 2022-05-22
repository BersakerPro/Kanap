
let basketProduct = JSON.parse(localStorage.getItem("dataProduct"))


console.log(basketProduct)

if (basketProduct === null) {
    document.querySelector("#cart__items").insertAdjacentHTML('afterend',  `<div class="cart__item__img">
        <p>Votre panier est vide</p>
    </div>`);
    document.querySelector("#cart__items").getElementsByClassName.cssText = "text-align : center;"
}
function getBasket() {
    let basket = localStorage.getItem("basket");
    return JSON.parse(basket)
}

let basketProduct = getBasket();
console.log(basketProduct)

if (basketProduct === null || basketProduct.lenght == 0) {
    document.querySelector("#cart__items").insertAdjacentHTML("afterend" , `<div class="cart__item__img">
        <p>Votre panier est vide</p>
    </div>`);
}else{

    let cart__items = document.getElementById("cart__items");

    
    for (let detail of basketProduct){

        let fetchingCurrent = `http://localhost:3000/api/products/` + detail.id;
        console.log(fetchingCurrent)
        let currentProduct = fetch (fetchingCurrent)
            .then((response) => {
                return response.JSON;

                
            })
    }
}
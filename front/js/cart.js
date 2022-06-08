
//Récupération du panier via le localStorage
function getBasket(){
    if(localStorage.getItem("basket")==null){
        return[]
    }else{
        return JSON.parse(localStorage.getItem("basket"));
    }
}

function clickQtyBtn() {
    let qtyBtn = document.getElementsByClassName("itemQuantity");
    console.log(qtyBtn);
    console.log(qtyBtn.length)
    for (const row of qtyBtn) {
        console.log(row);
        row.addEventListener("change", (e) => {
            console.log(e)
            alert(e.target.value);       
        });
    }
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let row of basket){
        number += row.quantity;
    }
    console.log(number)
    return number
}

function getTotalPrice(){
    let products  = getBasket();
    let totalPriceProduct = 0;
    let totalPrice = 0
    for(let product of products){
        totalPriceProduct = product.quantity * product.price;

        totalPrice += totalPriceProduct;

    }
    return totalPrice
}

function fillHtml(detail, product){

    let cart__items = document.getElementById("cart__items");
    //Création de la balise article cart__item
    let cart__item = document.createElement ("article");
    cart__items.appendChild(cart__item);
    cart__item.classList.add("cart__item");
    cart__item.setAttribute("data-id" , detail.id);
    cart__item.setAttribute("data-color" , detail.color);

    //Création de la balise div contenant les images ds produits du panier
    let cart__item__img = document.createElement("div");
    cart__item.appendChild(cart__item__img);
    cart__item__img.classList.add("cart__item__img");
    let img = document.createElement("img");
    cart__item__img.appendChild(img);
    img.src = product.imageUrl;
    img.alt = product.altTxt;

    //création de la balise div description du produit
    let cart__item__content = document.createElement("div");
    cart__item.appendChild(cart__item__content);
    cart__item__content.classList.add("cart__item__content");

    let cart__item__content__description = document.createElement("div");
    cart__item__content.appendChild(cart__item__content__description);
    cart__item__content__description.classList.add("cart__item__content__description");

    let cart__item__content__description__name = document.createElement("h2");
    let cart__item__content__description__price = document.createElement("p");
    let cart__item__content__description__color = document.createElement("p");
    cart__item__content__description.append(
        cart__item__content__description__name,
        cart__item__content__description__color,
        cart__item__content__description__price
    );
    cart__item__content__description__name.textContent = detail.name;
    cart__item__content__description__color.textContent = detail.color;
    cart__item__content__description__price.textContent = Intl.NumberFormat("fr-FR", {
        style:"currency", currency: "EUR",}).format(product.price);

    //Création de la balise div settings
    let cart__item__content__settings = document.createElement("div");
    cart__item__content.appendChild(cart__item__content__settings);
    cart__item__content__settings.classList.add("cart__item__content__settings");

    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
    cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");

    let qtyText = document.createElement("p");
    cart__item__content__settings__quantity.appendChild(qtyText);
    qtyText.textContent = "Qté : ";

    let itemQuantity = document.createElement("input");
    cart__item__content__settings__quantity.appendChild(itemQuantity);
    itemQuantity.classList.add("itemQuantity");
    itemQuantity.setAttribute("name" , "itemQuantity");
    itemQuantity.setAttribute("type" , "number");
    itemQuantity.setAttribute("value" , detail.quantity);

    let cart__item__content__settings__delete = document.createElement("div")
    cart__item__content__settings.appendChild(cart__item__content__settings__delete);
    cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");

    let deleteText = document.createElement("p");
    cart__item__content__settings__delete.append(deleteText);
    deleteText.classList.add("deleteItem");
    deleteText.textContent = "Supprimer" ;   
    
    
    let totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = getNumberProduct();

    let totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = getTotalPrice();
}
    

const getProductData = async () => {

    let basketProduct = getBasket();
    
    for (let detail of basketProduct){ 
    let fetchingCurrent = `http://localhost:3000/api/products/` + detail.id;
    console.log(fetchingCurrent)
    
    const resultat = await fetch (fetchingCurrent);
    productData = await resultat.json()

    
    //Déclaration d'un panier vide si le localStorage est vide
    if (basketProduct === null || basketProduct.length == 0) {
    document.querySelector("#cart__items").insertAdjacentHTML("afterend" , `<div class="cart__item__img">
        <p>Votre panier est vide</p>
    </div>`);

    //Si le localStorage contient des élément:
    } else {
        fillHtml(detail , productData)       
    }
}}
getProductData();




    



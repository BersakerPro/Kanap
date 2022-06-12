function saveBasket(basket) {

    //Sauvegarde des données en chaine de caractère
    localStorage.setItem("basket", JSON.stringify(basket));
}
//Récupération du panier via le localStorage
function getBasket(){
    if(localStorage.getItem("basket")==null){
        return[]
    }else{
        return JSON.parse(localStorage.getItem("basket"));
    }
}

function clickQtyBtn() {
    let basket = getBasket()
    let qtyBtn = document.getElementsByClassName("itemQuantity");
    console.log(qtyBtn);
    for (const row of qtyBtn) {
        console.log(row);
        row.addEventListener("change", (e) => {
            console.log(e);
            let productId = e.composedPath()[4].dataset.id
            console.log(productId)

            for (product of basket) {
                if(product.id == productId){
                    product.quantity = parseInt(e.target.value)
                }
            }
            alert(e.target.value);
            e.target.setAttribute("value" , e.target.value)
            console.log(row)
            getNumberProduct()

            saveBasket(basket)
           
            getTotalPrice()

        });
    }
}
function getNumberProduct(){
    let itemQuantity = document.getElementsByClassName("itemQuantity");
    totalQuantity = 0
    for (let i = 0 ; i < itemQuantity.length ; i++) {
        totalQuantity += itemQuantity[i].valueAsNumber;
        console.log(totalQuantity)
    }
    let totalProductsQuantity = document.getElementById("totalQuantity");
    totalProductsQuantity.textContent = totalQuantity;
}

async function getTotalPrice(){
    let products = getBasket()
    let totalPrice = 0

    for (let i=0 ; i<products.length ; i++) {
        console.log(products[i].quantity)
        let product = await fetch (`http://localhost:3000/api/products/${products[i].id}`);
        let productData = await product.json();
        let price = productData.price

        totalPrice += products[i].quantity * price

    }

    let totalPriceContent = document.getElementById("totalPrice");
    totalPriceContent.textContent = totalPrice;
}

function removeProductFromPanier() {
    let deleteBtn = document.getElementsByClassName("deleteItem");
    console.log(deleteBtn)
    let products = getBasket()

    for (let i=0 ; i<deleteBtn.length ; i++) {
        deleteBtn[i].addEventListener("click" , (e) => {
            console.log(e)

            console.log(products)
            console.log(i)

            products.splice(i , 1)
            e.target.closest('article').remove();
            alert("produit supprimé du panier")

            saveBasket(products)
            location.reload()
        })
    }

}
function checkBasket() {
    let basket = getBasket()
    if(basket.length == 0 || basket == null){
        return false
    } else {
        return true
    }
}


function fillHtml(data, product){

    let cart__items = document.getElementById("cart__items");
    //Création de la balise article cart__item
    let cart__item = document.createElement ("article");
    cart__items.appendChild(cart__item);
    cart__item.classList.add("cart__item");
    cart__item.setAttribute("data-id" , product.id);
    cart__item.setAttribute("data-color" , product.color);

    //Création de la balise div contenant les images ds produits du panier
    let cart__item__img = document.createElement("div");
    cart__item.appendChild(cart__item__img);
    cart__item__img.classList.add("cart__item__img");
    let img = document.createElement("img");
    cart__item__img.appendChild(img);
    img.src = data.imageUrl;
    img.alt = data.altTxt;

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
    cart__item__content__description__name.textContent = product.name;
    cart__item__content__description__color.textContent = product.color;
    cart__item__content__description__price.textContent = Intl.NumberFormat("fr-FR", {
        style:"currency", currency: "EUR",}).format(data.price);

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
    itemQuantity.setAttribute("value" , product.quantity);



    let cart__item__content__settings__delete = document.createElement("div")
    cart__item__content__settings.appendChild(cart__item__content__settings__delete);
    cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");

    let deleteText = document.createElement("p");
    cart__item__content__settings__delete.append(deleteText);
    deleteText.classList.add("deleteItem");
    deleteText.textContent = "Supprimer" ; 
    
   
}


async function initPage(basketProduct) {

    console.log(basketProduct)
    for (product of basketProduct) {
        console.log(product)
        let promise = await fetch(`http://localhost:3000/api/products/${product.id}`)
        let data = await promise.json();
        if (promise.ok) {
            console.log(data)
            fillHtml(data, product)        
        } 
    }
    clickQtyBtn();
    getNumberProduct()
    getTotalPrice()

    removeProductFromPanier()
    

}


if(checkBasket()){
    
    let basketProduct = getBasket()
    initPage(basketProduct)

} else {
    document.querySelector("#cart__items").insertAdjacentHTML("afterend" , `<div style="text-align:center ; width:100%" class="cart__item__img">
    <p>Votre panier est vide</p>
</div>`);
}


//GESTION DU FORMULAIRE

let regExText = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
let regExMail = new RegExp("^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$");
let regExAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


function checkTextOnly(value) {
    if(regExText.test(value)) {
        return false
    }
    return true
}

function checkAddress(value) {
    if(regExAddress.test(value)) {
        return false
    }
    return true
}

function checkCity(value) {
    if(regExText.test(value)) {
        return false
    }
    return true
}

function checkMail(value) {
    if(regExMail.test(value)) {
        return false
    }
    return true
}

let formFirstName = document.getElementById("firstName");
let errorFirstName = document.getElementById("firstNameErrorMsg");

formFirstName.addEventListener ("change" , (e) => {
    console.log(e)
    if(checkTextOnly(e.target.value)) {
        errorFirstName.textContent = "Veuillez renseigner un prénom valide"
    } else {
        errorFirstName.textContent = ""
        console.log(formFirstName.value)
    }
})

let formLastName = document.getElementById("lastName");
let errorLastName = document.getElementById("lastNameErrorMsg");

formLastName.addEventListener ("change" , (e) => {
    console.log(e)
    if(checkTextOnly(e.target.value)) {
        errorLastName.textContent = "Veuillez renseigner un nom de famille valide"
    } else {
        errorLastName.textContent = ""
        console.log(formLastName.value)
    }
})

let formAddress = document.getElementById("address");
let errorAddress = document.getElementById("addressErrorMsg");

formAddress.addEventListener ("change" , (e) => {
    console.log(e)
    if(checkAddress(e.target.value)) {
        errorAddress.textContent = "Veuillez renseigner une adresse valide"
    } else {
        errorAddress.textContent = ""
        console.log(formAddress.value)
    }
})

let formCity = document.getElementById("city");
let errorCity = document.getElementById("cityErrorMsg")

formCity.addEventListener ("change" , (e) => {
    console.log(e)
    if(checkTextOnly(e.target.value)) {
        errorCity.textContent = "Veuillez renseigner un nom de ville valide"
    } else {
        errorCity.textContent = ""
        console.log(formCity.value)
    }
})

let formEmail = document.getElementById("email");
let errorEmail = document.getElementById("emailErrorMsg")

formEmail.addEventListener ("change" , (e) => {
    console.log(e)
    if(checkMail(e.target.value)) {
        errorEmail.textContent = "Veuillez renseigner une adresse email valide"
    } else {
        errorEmail.textContent = ""
        console.log(formEmail.value)
    }
})









    



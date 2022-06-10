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

function removeProductFromPanier(id) {

    let idx = 0;
    for (const row of panier) {
        if (row.id == id) {
            console.log("SUPPRESSION du panier : " + row.name);
            alert("SUPPRESSION du panier : " + row.name);
            panier.splice(idx, 1);
            return true;
        }
        idx++;
    }
    return false;
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
    

}

let basketProduct = getBasket()
initPage(basketProduct)







    



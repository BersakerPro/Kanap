/////DECLARATION DES FONCTIONS/////

//Fonction de sauvegarde dans le localStorage
function saveBasket(basket) {
    //Sauvegarde des données en chaine de caractère
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Fonction de récupération du panier via le localStorage
function getBasket(){
    if(localStorage.getItem("basket") == null){
        return[];
    } else {
        return JSON.parse(localStorage.getItem("basket"));
    }
}

//Fonction d'utilisation de l'input quantité
function clickQtyBtn() {

    //On déclare dans la variable basket le contenu du localStorage
    let basket = getBasket();
    //On récupère la classe de l'input
    let qtyBtn = document.getElementsByClassName("itemQuantity");

    //On crée une boucle pour chaque input de la page
    for (const row of qtyBtn) {
        //row correspondant à un seul input
        
        //On déclenche l'évènement sur un input
        row.addEventListener("change", (e) => {
            
            //On déclare où se trouve l'id du produit dans le localStorage
            let productId = e.composedPath()[4].dataset.id
            
            //On boucle dans le localStorage pour chaque produit
            for (item of basket) {

                //On vérifie l'id du produit à modifier
                if(item.id == productId){

                    //On change la valeur de quantité
                    item.quantity = parseInt(e.target.value);
                }
            }
            alert(e.target.value);

            //On met à jour le nombre total de produit dans le panier
            getNumberProduct();

            //On met à jour le localStorage
            saveBasket(basket);
           
            //Refresh de la page pour mettre à jour le prix total
            location.reload();
        });
    }
}

//Fonction de calcul du total des articles
function getNumberProduct(){

    //On récupère la quantité de chaque produit
    let itemQuantity = document.getElementsByClassName("itemQuantity");
    //On déclare la variable du total à 0
    totalQuantity = 0

    //On boucle pour chaque quantité identifié 
    for (let i = 0 ; i < itemQuantity.length ; i++) {
        //On incrémente chaque quantité à la variable du total
        totalQuantity += itemQuantity[i].valueAsNumber;
    }

    //On modifie le DOM
    let totalProductsQuantity = document.getElementById("totalQuantity");
    totalProductsQuantity.textContent = totalQuantity;
}

//Fonction de calcul du prix total
function getTotalPrice(product){

    //On récupère le panier dans le localStorage
    let basket = getBasket()
    //On déclare 2 variables du total prix par produit et pour le panier
    let totalPrice = 0;
    let totalPriceProduct = 0;

    //On boucle dans le panier
    for(let i=0; i<basket.length; i++){
        
        //Pour chaque produit, on multiplie la quantité par le prix
        totalPriceProduct = product[i].price * product[i].quantity;
        //On incrémente ces valeurs au prix total du panier
        totalPrice += totalPriceProduct
    }

    //On modifie le DOM
    let totalPriceContent = document.getElementById("totalPrice");
    totalPriceContent.textContent = totalPrice;
}

//Fonction de suppression du panier
function removeProductFromPanier() {
    //On récupère le bouton "supprimer"
    let deleteBtn = document.getElementsByClassName("deleteItem");
    
    //On récupère le panier
    let products = getBasket()

    //On boucle pour chaque bouton
    for (let i=0 ; i<deleteBtn.length ; i++) {

        //Pour chaque bouton, on déclenche l'évènement
        deleteBtn[i].addEventListener("click" , (e) => {
    
            //On supprimme du loa=calStorage l'élément en cours dans la boucle 
            products.splice(i , 1)
            //Et on le supprime du DOM
            e.target.closest('article').remove();
            alert("produit supprimé du panier")

            //On sauvegarde le nouveau panier et on refresh la page
            saveBasket(products)
            location.reload()
        })
    }

}

//Fonction de vérification, du contenu du panier
function checkBasket() {

    //On récupère le panier
    let basket = getBasket()
    //Si le panier est vide, on retourne false, sinon true
    if(basket.length == 0 || basket == null){
        return false
    } else {
        return true
    }
}


function fillHtml(product){

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
    cart__item__content__description__name.textContent = product.name;
    cart__item__content__description__color.textContent = product.color;
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

    let arrayProduct = []
    console.log(basketProduct)
    for (product of basketProduct) {
        console.log(product)
        let promise = await fetch(`http://localhost:3000/api/products/${product.id}`)
        let data = await promise.json();

        
        let productInfo = {
            id : data._id,
            name : data.name,
            description : data.description,
            imageUrl : data.imageUrl,
            altTxt : data.altTxt,
            price: data.price,
            color : product.color,
            quantity : product.quantity
        }
        arrayProduct.push(productInfo)
        console.log(arrayProduct)
        if (promise.ok) {
            console.log(data)
            fillHtml(productInfo)        
        } 
    }
    clickQtyBtn();
    getTotalPrice(arrayProduct)
    getNumberProduct()

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

function postCommand() {
    let productsID = [];
    let products = getBasket();
    for (let product of products) {
        productsID.push(product.id)
    }

    let order = {
        contact : {
            firstName : firstName.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value,
            email : email.value
        } ,
        products : productsID
    };

    fetch ("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(function(resultat) {
        if(resultat.ok) {
            return resultat.json()
        }
    })
    .then((data) => {
        console.log(data)
        console.log(data.orderId)

        document.location.href = "confirmation.html?id=" + data.orderId
    })
}


function postForm() {
    let firstName = document.getElementById("firstName");
    console.log(firstName.value)
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");


    let btnSubmit = document.getElementById("order")
    console.log(btnSubmit) 

        let test = document.getElementById("test")

    test.addEventListener("click" , (e) => {
        console.log(e)
        if(firstName.value == "" ||
           lastName.value == "" ||
           address.value == "" ||
           city.value == "" ||
           email.value == "") {
               alert("Veuillez renseigner tout les champs du formulaire")
        } else {
            postCommand();
        }
    })

}
postForm()








    



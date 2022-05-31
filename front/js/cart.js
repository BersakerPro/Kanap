function saveBasket(basket){

    //Sauvegarde des données en chaine de caractère
    localStorage.setItem("basket" , JSON.stringify(basket));
}

//Récupération du panier via le localStorage
function getBasket() {
    let getArray = []
    if(localStorage.getItem("basket")) {

        //Récupération des chaine de caractère en tableau
        let getBasket = JSON.parse(localStorage.getItem("basket"));
        getArray.push(getBasket);    
    }
    return getArray;
}


function clickQtyBtn() {
    let qtyBtn = document.getElementsByClassName("itemQuantity");
    console.log(qtyBtn);
    for (const row of qtyBtn) {
        console.log(row);
        row.addEventListener("change", (e) => {
            console.log(e);
            alert(e.target.value);
        });
    }
}
function deleteProduct(){ 
    let deleteBtn = document.querySelectorAll('#deleteItem');
    console.log(deleteBtn);
    
    for(let btn of deleteBtn){
        btn.addEventListener('click', (e) =>{
            console.log(btn)
            let idDelete = detail.id;
            let colorDelete = detail.color;
    
            basketProduct = basketProduct.filter(p => p.id !== idDelete || p.color !== colorDelete)
    
            alert("Produit supprimé du panier");
            saveBasket()
        })
    }
    }



let basketProduct = getBasket();
console.log(basketProduct)


//Déclaration d'un panier vide si le localStorage est vide
if (basketProduct === null || basketProduct.lenght == 0) {
    document.querySelector("#cart__items").insertAdjacentHTML("afterend" , `<div class="cart__item__img">
        <p>Votre panier est vide</p>
    </div>`);

//Si le localStorage contient des élément:
}else{

    let cart__items = document.getElementById("cart__items");

    //Boucle pour parcourir l'array du localStorage
    for (let detail of basketProduct){

        let fetchingCurrent = `http://localhost:3000/api/products/` + detail.id;
        console.log(fetchingCurrent)
        let currentProduct = fetch (fetchingCurrent)
        
        
            .then((res) => res.json())
            .then((product) => { 

                console.log(product)

                //Création de la balise article cart__item
                let cart__item = document.createElement ("article");
                cart__items.appendChild(cart__item);
                cart__item.classList.add("cart__item");
                cart__item.setAttribute("data-id" , detail.id);
                cart__item.setAttribute("data-color" , detail.color);
                console.log(cart__item)

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

                let totalPriceProduct = detail.price * detail.quantity;

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
                    style:"currency", currency: "EUR",}).format(totalPriceProduct);

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
                
                
                clickQtyBtn();

                deleteProduct();
            })    
        }   
}


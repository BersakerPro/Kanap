//Lien entre les pages index et produit
var link = window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");
//console.log(id)


//On déclare une variable contenant l'URL API du produit en ajoutant l'id récupéré
var fetchingUrl = `http://localhost:3000/api/products/${id}`;

//On requête l'APi du produit avec cette variable
fetch(fetchingUrl)
    .then(function (response) {
        
        //On récupère la réponse au format JSON
        const productsData = response.json();
        
        //Insertion des détails du produit dans la page
        productsData.then((product) => {

            //console.log(product)
            
            //L'image et son attribut
            document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

            //Le nom et le prix du produit
            document.querySelector(".item__content__titlePrice").innerHTML = `<div class="item__content__titlePrice">
            <h1 id="title">${product.name}</h1>
            <p>Prix : <span id="price">${product.price}</span>€</p>
            </div>`;

            //La description du produit
            document.querySelector("#description").innerHTML = `<p id="description">${product.description}</p>`;

            //La couleur du produit
            let htmlColor = `<option value="">--SVP, choisissez une couleur --</option>` + '';
            //On boucle dans les infos de l'API pour récupérer toutes les couleurs disponibles
            for (let color of product.colors) {
                htmlColor += `<option value="${color}">${color}</option>`;
            }
            document.querySelector("#colors").innerHTML = htmlColor;
        })
    })


//Fonction pour enregistrer le panier dans le localStorage    
function saveBasket(basket) {

    //Sauvegarde des données en chaine de caractère
    localStorage.setItem("basket", JSON.stringify(basket));
}

//Fonction de récupération des données dans le localStorage
function getBasket() {
    //Si le panier est vide, on retourne un tableau vide
    if (localStorage.getItem("basket") == null) {
        return []
    } else {
        //Sinon, on récupère les données en objet
        return JSON.parse(localStorage.getItem("basket"));
    }
}

//Fonction de vérification du contenu du panier
function checkPanierStorage(id, color) {
    let products = getBasket();
    //Si le panier est vide, on retourne false
    if (products.length == 0) {
        return false;
    } else {
        //Sinon, on boucle dans le contenu du panier
        for (let product of products) {
            console.log(product)
            //Si l'id et la couleur du produit ajouté sont les même qu'un produit déjà présent
            if (product.id == id && product.color == color) {
                //Alerte pour l'utilisateur
                alert("Produit déjà présent dans le panier, dans la même couleur");
                //Retourne true
                return true;
            }
        }
        //Si les conditions de la boucle ne sont pas remplies mais que le panier n'est pas vide
        //Retourne false
        return false;
    }
}

//Fonction de modification de la quantité d'un produit identique déjà présent dans le panier
function majQuantity(product) {
    let basket = getBasket();

    //On boucle dans le panier
    for (let row of basket) {
        //console.log(row.quantity)
        //Si l'id et la couleur du produit ajouté sont les même que celui déjà présent
        if (product.id == row.id && product.color == row.color) {
            //On ajoute la quantité du produit ajouté à celle de celui déjà présent
            row.quantity += product.quantity;
        }
        //console.log(row.quantity)
    }

    //On met à jour le localStorage
    saveBasket(basket);
}

//Fonction d'ajout d'un nouveau produit au panier
function addNewProduct(product) {
    let basket = getBasket();
    basket.push(product)
    console.log(basket)

    saveBasket(basket);
}

//Fonction d'ajout au panier au déclenchement de l'évènement
function addProduct(product) {
    //Si la fonction de vérification du panier retourne true
    if (checkPanierStorage(product.id, product.color)) {
        //On déclare la fonction de modification de la quantité
        majQuantity(product);

    } else {
        //Si la fonction de vérification retourne true
        //On déclare la fonction d'ajout d'un nouveau produit
        addNewProduct(product);
    }
}
let button = document.querySelector("#addToCart");

//Déclaration de l'évènement "ajouter au panier"
button.addEventListener("click", event => {
    let quantity = parseInt(document.querySelector("#quantity").value);
    let color = document.querySelector("#colors").value;
    let name = document.querySelector("#title").textContent;

    //Variable des détail du produit ajouté au panier
    let dataProduct =
    {
        id: id,
        name: name,
        color: color,
        quantity: quantity
    };
    //Message d'alerte si la quantité n'est pas comprise entre 1 et 100
    if (quantity == null || quantity < 1 || quantity > 100) {
        alert("Veuillez renseigner une quantité comprise entre 1 et 100");

    }
    //Message d'alerte si la couleur n'est pas renseigné
    else if (color == "") {
        alert("Veuillez renseigner une couleur");

    } else {
        //Sinon on déclare la fonction d'ajout au panier
        addProduct(dataProduct);
        //console.log(dataProduct);
    }
})

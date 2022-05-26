//Lien entre les pages index et produit
var link =  window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");

//récupération ID produit
var fetchingUrl = `http://localhost:3000/api/products/${id}`;
console.log(fetchingUrl);
console.log(id);

//Requête API d'un produit par son ID
fetch (fetchingUrl)
.then(function (response){
    console.log(response);

    const productsData = response.json();
    console.log(productsData)

    //Insertion des détails du produit dans la page
    productsData.then ((product) => {

        document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

        document.querySelector(".item__content__titlePrice").innerHTML = `<div class="item__content__titlePrice">
        <h1 id="title">${product.name}</h1>
        <p>Prix : <span id="price">${product.price}</span>€</p>
        </div>`;

        document.querySelector("#description").innerHTML = `<p id="description">${product.description}</p>`;

        
        let htmlColor = `<option value="">--SVP, choisissez une couleur --</option>` + '';
        for(let color of product.colors){
            console.log(color) 
            htmlColor += `<option value="${color}">${color}</option>`;
        }
        console.log(htmlColor)
        document.querySelector("#colors").innerHTML = htmlColor;

    })  
})


//Fonction pour enregistrer le panier dans le localStorage    
function saveBasket(basket){

    //Sauvegarde des données en chaine de caractère
    localStorage.setItem("basket" , JSON.stringify(basket));
}

//Fonction de récupération des données dans le localStorage
function getBasket() {
    if(localStorage.getItem("basket")) {

        //Récupération des chaine de caractère en tableau
        return JSON.parse(localStorage.getItem("basket"));
    }else {
        return[];
    }
}

//Fonction d'ajout au panier
function addBasket(product){
    let basket = getBasket();


    //Variable témoin de présence
        //Le témoin renvoie false si un produit identique n'est pas présent
    let foundProduct = false;

    //Boucle de vérif id et couleur
    for (const row of basket) {
        if (row.name == product.name && row.color == product.color) {
            alert("Produit déjà présent dans le panier, dans la même couleur");
            console.log(row.quantity);

            //récupération des données quantity en valeur numérique
            let qty = parseInt(quantity.value);
            console.log(qty)

            //Ajout de la valeur qty à la valeur initial du produit déjà présent
            row.quantity += qty;

            //Le témoin renvoie true quand les conditions sont réunis(produit identique présent dans le panier)
            foundProduct = true

        }
        
    }
    
    //Ajout du produit au localStorage
    basket.push(product);
    console.log(foundProduct)
    saveBasket(basket)
    
}

let button = document.querySelector("#addToCart");

//Déclaration de l'évènement "ajouter au panier"
button.addEventListener("click" , event => {
    let quantity = parseInt(document.querySelector("#quantity").value);
    let color = document.querySelector("#colors").value;
    let name = document.querySelector("#title").textContent;
    let price = document.querySelector("#price").textContent;

    //Variable des détail du produit ajouté au panier
    let dataProduct =
        {
        id : id,
        name : name,
        price : price,
        color : color,
        quantity : quantity
    }
    console.log(name)
    console.log(price)
    console.log(quantity)

    //Message d'alerte si la quantité n'est pas comprise entre 1 et 100
    if (quantity == null  || quantity < 1 || quantity > 100){
        alert("Veuillez renseigner une quantité comprise entre 1 et 100")
        
    }
    //Message d'alerte si la couleur n'est pas renseigné
    else if(color == ""){
        alert("Veuillez renseigner une couleur")
    }
    getBasket(dataProduct)
    addBasket(dataProduct)

    
    console.log(dataProduct)
})
 



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

function getBasket(){
    if(localStorage.getItem("basket")==null){
        return[]
    }else{
        return JSON.parse(localStorage.getItem("basket"));
    }
}

function checkPanierStorage(id, color){
    let basket = getBasket()
    if(basket.length == 0){
        return false;
    }else{
        for(let row of basket){
            console.log(row)
            console.log(basket)
            if(row.id == id && row.color == color){
                alert("Produit déjà présent dans le panier, dans la même couleur")
                return true 
            }
        }
    return false;
    }
}

function majQuantity(product){
    let basket = getBasket();

    for(let row of basket){
        if(product.id == row.id && product.color == row.color){
            row.quantity += product.quantity;
        }
    }
    saveBasket(basket)
}

function addNewProduct(product){
    let basket = getBasket();
    basket.push(product)
    console.log(basket)

    saveBasket(basket)
}

  
function addProduct(product){
    
    if(checkPanierStorage(product.id , product.color)){
        majQuantity(product)
        
    }else{
        addNewProduct(product)
        
    }
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
    //Message d'alerte si la quantité n'est pas comprise entre 1 et 100
    if (quantity == null  || quantity < 1 || quantity > 100){
        alert("Veuillez renseigner une quantité comprise entre 1 et 100")
        
    }
    //Message d'alerte si la couleur n'est pas renseigné
    else if(color == ""){
        alert("Veuillez renseigner une couleur")

    }else{
        addProduct(dataProduct);
        console.log(dataProduct)
        }   
})
 
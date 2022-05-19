var link =  window.location.href;
var url = new URL(link);
var id = url.searchParams.get("id");

var fetchingUrl = `http://localhost:3000/api/products/${id}`;
console.log(fetchingUrl);
console.log(id);

fetch (fetchingUrl)
.then(function (response){
    console.log(response);

    const productsData = response.json();
    console.log(productsData)

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


    
function saveBasket(basket){
    localStorage.setItem("basket" , JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null){
        return []
    }else{
        return JSON.parse(basket)
    }
}

function addBasket(product){
    let basket = getBasket()
    basket.push(product)
    let foundProduct = basket.find(p => p.id == product.id)
        if (foundProduct != undefined){
            foundProduct.quantity++
        }else{
            product.quantity = 1;
        }
if (addBasket == true){
    saveBasket(basket)
}
}

let button = document.querySelector("#addToCart");

if (button != null){  
button.addEventListener("click" , event => {
    let quantity = document.querySelector("#quantity").value;
    let color = document.querySelector("#colors").value;
    let name = document.querySelector("#title").textContent;
    let price = document.querySelector("#price").textContent;
    let dataProduct = [
        {
        name : name,
        price : price,
        color : color,
        quantity : quantity
    }]
    console.log(name)
    console.log(price)
    console.log(quantity)
    if (quantity == null  || quantity < 1 || quantity > 100){
        alert("Veuillez renseigner une quantité comprise entre 1 et 100")
        
    }
    saveBasket(dataProduct)
    addBasket(dataProduct)
    console.log(dataProduct)
})
}   



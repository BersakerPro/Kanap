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

        let htmlColor = ''
        htmlColor += `<option value="${product.colors[0]}">${product.colors[0]}</option>
        <option value="${product.colors[1]}">${product.colors[1]}</option>`
        document.querySelector("#colors").innerHTML = htmlColor;

    })    
})
    

 
   

    


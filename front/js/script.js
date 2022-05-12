const page = "index";
console.log(page);


fetch("http://localhost:3000/api/products/")
    .then(function (response){
    console.log(response);

    const productsData = response.json();

    productsData.then((products) => {
        
        let html = '';    
        for (let product of products){
            console.log(product);
            console.log(product.name);
            html += `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;

        }
        console.log(html);
        let element = document.getElementById("items");
        console.log(element);
        element.innerHTML = html;

    })
})





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
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>`;

        }
        console.log(html);
        let element = document.getElementById("items");
        console.log(element);
        element.innerHTML = html;

    })
})




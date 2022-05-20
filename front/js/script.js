
//Requête de l'API produit:

fetch("http://localhost:3000/api/products/")
    .then(function (response){
    console.log(response);
    
    //Récupération de la réponse de l'API au format JSON
    const productsData = response.json();
    
    //Méthode d'insertion des données produits dans le DOM
    productsData.then((products) => {
        
        //Boucle d'incrémentation des données produits
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

        //Insertion des données dans la page d'accueil
        console.log(html);
        let element = document.getElementById("items");
        console.log(element);
        element.innerHTML = html;

    })
})





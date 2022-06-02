
//Requête de l'API produit:

fetch("http://localhost:3000/api/products/")
    .then(function (response){
    console.log(response);
    
    //Récupération de la réponse de l'API au format JSON
    const productsData = response.json();
    
    //Méthode d'insertion des données produits dans le DOM
    productsData.then((products) => {
        
        //Boucle d'incrémentation des données produits
                
        for (let product of products){
            console.log(product);
            console.log(product.name);
          
          let items = document.getElementById("items")

          let idLink = document.createElement ("a");
          items.append(idLink);
          idLink.setAttribute("href" , `./product.html?id=${product._id}`);
          console.log(idLink);

          let articleItems = document.createElement("article")
          idLink.append(articleItems);

          let img = document.createElement("img");
          img.src = product.imageUrl;
          img.alt = product.altTxt;

          let productName = document.createElement("h3");
          productName.classList.add("productName");
          productName.textContent = product.name;

          let productDescription = document.createElement("p");
          productDescription.classList.add("productDescription");
          productDescription.textContent = product.description;

          articleItems.append(img , productName , productDescription);

        }
    })
})






//Requête de l'API produit:

fetch("http://localhost:3000/api/products/")
    .then(function (response) {


        //Récupération de la réponse de l'API au format JSON
        const productsData = response.json();

        //Méthode d'insertion des données produits dans le DOM
        productsData.then((products) => {

            //Boucle d'incrémentation des données produits
            for (let product of products) {

                //On récupère d'id de la section contenant les cartes produits
                let items = document.getElementById("items")

                //URL vers la page du produit
                let idLink = document.createElement("a");
                items.append(idLink);
                idLink.setAttribute("href", `./product.html?id=${product._id}`);

                //On crée un balise article contenant les informations produit
                let articleItems = document.createElement("article")
                idLink.append(articleItems);

                //Infos images et ses attributs 
                let img = document.createElement("img");
                img.src = product.imageUrl;
                img.alt = product.altTxt;

                //Nom du produit
                let productName = document.createElement("h3");
                productName.classList.add("productName");
                productName.textContent = product.name;

                //Description du produit
                let productDescription = document.createElement("p");
                productDescription.classList.add("productDescription");
                productDescription.textContent = product.description;

                //On ajoute ses informations dans la balise article
                articleItems.append(img, productName, productDescription);

            }
        })
    })





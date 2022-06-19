//On récupère le numéro de commande renvoyé par l'API
let link = new URL(window.location.href);
let idOrder = link.searchParams.get("id")

//Fonction qui affiche ce numéro de commande
function orderIdDom() {
    let confirmOrder = document.getElementById("orderId");
    confirmOrder.textContent = idOrder
}
orderIdDom()
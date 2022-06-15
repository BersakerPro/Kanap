let link = new URL(window.location.href);
let idOrder = link.searchParams.get("id")


function orderIdDom() {
    let confirmOrder = document.getElementById("orderId");
    confirmOrder.textContent = idOrder
}
orderIdDom()
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null){
        return []
    }else{
        return JSON.parse(basket)
    }
}

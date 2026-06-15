function placeOrder(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        alert("Cart empty");
        return;
    }

    let order = {
        items: cart,
        total: cart.reduce((s,i)=>s+i.price,0),
        date: new Date().toLocaleString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    window.location.href = "invoice.html";
}

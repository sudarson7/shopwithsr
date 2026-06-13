requireLogin();
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    total += item.price;
});

document.getElementById("totalAmount").innerText = "Total: ₹" + total;

function placeOrder() {

    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    if (name === "" || address === "" || phone === "") {
        alert("Please fill all details");
        return;
    }

    localStorage.removeItem("cart");

    document.getElementById("msg").innerText =
        "🎉 Order Placed Successfully! Thank you " + name;

}

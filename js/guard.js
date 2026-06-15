function requireLogin() {
    let user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
    }

    return user;
}

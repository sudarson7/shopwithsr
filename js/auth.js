function register() {
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email === email);

    if (exists) {
        alert("User already exists");
        return;
    }

    users.push({ name, email, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid credentials");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));

    alert("Login successful");

    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

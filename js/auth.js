function register(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.find(u => u.email === email)){
        alert("User already exists");
        return;
    }

    users.push({name,email,password});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered");
}

function login(){
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if(!user){
        alert("Invalid login");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    window.location.href = "index.html";
}

function logout(){
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

function requireLogin(){
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if(!user){
        window.location.href = "login.html";
    }
    return user;
}

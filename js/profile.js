let user = JSON.parse(localStorage.getItem("loggedUser"));

if (!user) {
    alert("Please login");
    window.location.href = "login.html";
}

document.getElementById("profileBox").innerHTML = `
    <p><b>Name:</b> ${user.name}</p>
    <p><b>Email:</b> ${user.email}</p>
`;

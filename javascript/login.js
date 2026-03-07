const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("login-btn");
const curentUser = JSON.parse(localStorage.getItem("currentUser"));
btn.addEventListener("click", () => {
  login(email, password);
});
if (curentUser) {
  window.location.href = "dashboard.html";
}
function login(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => {
    return user.email === email.value && user.password === password.value;
  });
  console.log(user);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("incorrect email or password");
  }
}

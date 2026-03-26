const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("register-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  window.location.href = "dashboard.html";
}

btn.addEventListener("click", () => {
  addUser(userName, email, password);
  console.log("clicked");
  console.log(users);
});

function addUser(name, email, password) {
  let isExist = users.find((item) => {
    return item.email === email.value;
  });
  if (isExist) {
    alert("Email Already Exist ");
  } else if (name.value && email.value && password.value) {
    const user = {
      id: users.length,
      name: name.value,
      email: email.value,
      password: password.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Succesfully");
    name.value = "";
    email.value = "";
    password.value = "";
    window.location.href = "../index.html";
  } else {
    console.log("Fill all fields");
  }
}

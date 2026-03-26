let currentUser = JSON.parse(localStorage.getItem("currentUser"));
const title = document.getElementById("title");
const description = document.getElementById("description");
const btn = document.getElementById("add-btn");
const tasks = document.querySelector(".taskList");
const email = document.getElementById("email");
const logOut = document.getElementById("logOut");
let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
let main = document.querySelector(".main");
if (!currentUser) {
  window.location.href = "../index.html";
}
email.innerText = currentUser.email;
alert(`Welcome ${currentUser.name}`);

btn.addEventListener("click", () => {
  if (title.value.trim() !== "" && description.value.trim() !== "") {
    const task = {
      id: currentUser.id,
      title: title.value,
      description: description.value,
      isCompleted: false,
    };

    tasksList.push(task);
    title.value = "";
    description.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasksList));
    taskRender();
  } else {
    alert("Please fill the fields");
  }
});

logOut.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
});
function adjustLayout() {
  if (tasksList.length === 0) {
    main.style.flex = "1 1 50%";
    title.style.width = "40%";
    description.style.width = "40%";
    btn.style.width = "40%";
    tasks.style.display = "none";
  } else {
    main.style.flex = "1";
  }
}
function taskRender() {
  tasks.innerHTML = "";

  const currentUserTasks = tasksList.filter((task) => {
    return task.id === currentUser.id;
  });

  currentUserTasks.forEach((task, idx) => {
    let div = document.createElement("div");
    div.className = "card";
    let h1 = document.createElement("h1");
    let para = document.createElement("p");
    let deleteBtn = document.createElement("button");
    h1.innerText = task.title;
    para.innerText = task.description;
    deleteBtn.innerText = "X";
    deleteBtn.className = "del-btn";
    deleteBtn.addEventListener("click", () => {
      tasksList.splice(idx, 1);
      localStorage.setItem("tasks", JSON.stringify(tasksList));
      taskRender();
    });

    div.appendChild(deleteBtn);
    div.appendChild(h1);
    div.appendChild(para);
    tasks.appendChild(div);
  });

  adjustLayout();
}

taskRender();

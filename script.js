const inputTxt = document.querySelector(".input-area input");
const createBtn = document.querySelector(".input-area button");
const list = document.querySelector(".list");

const maxtaskItemCount = 10;

let tasks = [];

//Setting the placeholder :
inputTxt.placeholder = `Enter a task (max ${maxtaskItemCount})`;

//Runs when the page load :
window.onload = () => {
  //nothing task :
  if (!localStorage.getItem("visited")) {
    createTaskInLocalStorage("nothing 🤠");
    localStorage.setItem("visited", true);
  }

  tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((item) => {
    createTaskInUI(item.taskName, item.isCompeleted);
  });
};

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskName = inputTxt.value;
  if (!taskName) return;

  if (tasks.length < maxtaskItemCount) {
    createTaskInLocalStorage(taskName);
    createTaskInUI(taskName, false);
  }

  inputTxt.value = "";
});

list.addEventListener("click", (e) => {
  //when the check button is clicked :
  if (e.target.classList.contains("fa-check")) {
    const listItem = e.target.parentElement.parentElement.parentElement;
    const taskName = listItem.innerText;

    taskCompletionInLocalStorage(taskName);
    taskCompletionInUI(listItem);
  }

  //When the trash button is clicked :
  else if (e.target.classList.contains("fa-trash")) {
    const listItem = e.target.parentElement.parentElement.parentElement;
    const taskName = listItem.innerText;

    removeTaskInLocalStorage(taskName);
    listItem.remove();
  }
});

//Create Tasks Functions :
const createTaskInLocalStorage = (taskName) => {
  tasks.push({ taskName, isCompeleted: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const createTaskInUI = (taskName, isCompeleted) => {
  const li = document.createElement("li");
  li.classList.add("list-item");
  if (isCompeleted) addingTaksCompletionClass(li);
  li.textContent = taskName;
  list.appendChild(li);

  const div = document.createElement("div");
  div.classList.add("buttons");
  div.innerHTML = `<button><i class="fa-solid fa-check"></i></button>
                     <button><i class="fa-solid fa-trash"></i></button>`;
  li.appendChild(div);
};

//Complete Tasks Functions :
const taskCompletionInLocalStorage = (taskName) => {
  tasks.map((item) => {
    if (item.taskName === taskName) {
      item.isCompeleted = !item.isCompeleted;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskCompletionInUI = (listItem) => {
  listItem.classList.toggle("text-decoration");
  listItem.classList.toggle("opacity");
};

const addingTaksCompletionClass = (listItem) => {
  listItem.classList.add("text-decoration");
  listItem.classList.add("opacity");
};

//Remove tasks functions :
const removeTaskInLocalStorage = (taskName) => {
  tasks = tasks.filter((item) => item.taskName !== taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

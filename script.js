const inputTxt = document.querySelector(".input-area input");
const createTaskBtn = document.querySelector(".input-area button");
const list = document.querySelector(".list");

const maxtaskItemCount = 10;
let id;

//Setting the placeholder : 
inputTxt.placeholder = `Enter a task (max ${maxtaskItemCount})`;

//Runs when the page load :  
window.onload = function() {
    
    if(localStorage.getItem("nothing") == 1) {
        createTask("Nothing 🤠", 0);
    }        

    if(localStorage.getItem("id") === null) {
        id = 1;
        localStorage.setItem("id", 1);
    }

    else 
        id = parseInt(localStorage.getItem("id"));


    for(let i = 1; i <= id; i++) {
        if(localStorage.getItem(`task-${i}`) !== null)
            createTask(localStorage.getItem(`task-${i}`), i);
    }
}


//When the plus button is clicked : 
createTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let taskTxt = inputTxt.value.charAt(0).toUpperCase() + inputTxt.value.slice(1, inputTxt.value.lenght);
    inputTxt.value = "";

    if (!controlInputTxt(taskTxt)) {
        return;
    }

    if (controlTaskItemCount()) {
        createTask(taskTxt, id);
        localStorage.setItem(`task-${id++}`, taskTxt);
        localStorage.setItem("id", id); 
    }

});

document.addEventListener("keydown", () => {

});

//Adding event listeners to ul :
list.addEventListener("click", (e) => {
    //when the check button is clicked :
    if (e.target.classList.contains("fa-check")) {
        const listItem = e.target.parentElement.parentElement.parentElement;
        listItem.classList.toggle("text-decoration");
    }

    //When the trash button is clicked : 
    else if (e.target.classList.contains("fa-trash")) {
        const listItem = e.target.parentElement.parentElement.parentElement;
        const listItemId = listItem.getAttribute("id");

        if(listItemId === "task-0") {
            console.log(listItemId);
            localStorage.setItem("nothing", 0);
        } 

        localStorage.removeItem(listItemId);
        listItem.remove();
        isThereTask();
    }
});

//We created new task (li) : 
function createTask(taskTxt, id) {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.setAttribute("id", `task-${id}`);
    li.textContent = taskTxt;
    list.appendChild(li);

    const div = document.createElement("div");
    div.classList.add("buttons");
    div.innerHTML = `<button><i class="fa-solid fa-check"></i></button>
                     <button><i class="fa-solid fa-trash"></i></button>`;
    li.appendChild(div);
}


//We checking to enter the correct text in the input : 
function controlInputTxt(txt) {
    let spaceCount = 0;

    //Find the number of spaces in a variable : 
    for (let i = 0; i < txt.length; i++) {
        if (txt.charAt(i) === " ") 
            spaceCount++;
    }

    if (txt === "")
        return false;

    else if (txt.length === spaceCount) {
        return false;
    }

    return true;
}

//We check if the number of tasks (li) has reached the maximum value : 
function controlTaskItemCount() {
    const taskItems = document.querySelectorAll(".list .list-item");    //li

    if (taskItems.length < maxtaskItemCount)
        return true

    return false;
}

//If there is no task (li), id is reset : 
function isThereTask() {
    const taskItems = document.querySelectorAll(".list .list-item");    //li

    if(taskItems.length === 0) {
        localStorage.setItem("id", 1);
        id = 1;
    }
}
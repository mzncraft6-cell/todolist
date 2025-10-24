const input = document.getElementById("input");
const btnadd = document.getElementById("push");
const divtasks = document.getElementById("tasks");

document.addEventListener("DOMContentLoaded", showTasks);
btnadd.addEventListener("click", addTask);

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    showTasks();
}

function showTasks() {
    divtasks.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText, index) => {
        let div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
            <p contenteditable="false">${taskText}</p>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash" style="color:#000;"></i></button>
        `;
        div.querySelector(".delete").addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        });
        div.querySelector(".edit").addEventListener("click", () => {
            const p = div.querySelector("p");
            if (p.isContentEditable) {
                p.contentEditable = "false";
                tasks[index] = p.textContent;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showTasks();
            } else {
                p.contentEditable = "true";
                p.focus();
            }
        });
        divtasks.appendChild(div);
    });
}

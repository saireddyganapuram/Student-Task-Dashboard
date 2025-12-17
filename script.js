const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


addBtn.addEventListener("click", addTask);
renderTasks();


function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = {
        id: Date.now(),
        title: text,
        status: "pending" // pending | progress | completed
    };


    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}


function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.status;

        li.innerHTML = `
            <span>${task.title}</span>

            <div class="task-actions">
                <select onchange="updateStatus(${task.id}, this.value)">
                    <option value="pending" ${task.status === "pending" ? "selected" : ""}>Pending</option>
                    <option value="progress" ${task.status === "progress" ? "selected" : ""}>In Progress</option>
                    <option value="completed" ${task.status === "completed" ? "selected" : ""}>Completed</option>
                </select>
                <button onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function updateStatus(id, newStatus) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.status = newStatus;
        }
    });
    saveTasks();
    renderTasks();
}



function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// Motivational Quotes (Offline)
// ===============================

const quoteText = document.getElementById("quote");

let quotes = [
    "Engineering is not about perfect solutions, but better ones.",
    "Code today, innovate tomorrow.",
    "Great engineers learn from failures.",
    "Consistency creates successful engineers.",
    "Small logic builds big systems.",
    "Engineers turn ideas into reality.",
    "Every bug fixed is progress made.",
    "Learning never stops for engineers."
];

let quoteIndex = 0;
shuffleQuotes();
showNextQuote();
setInterval(showNextQuote, 10000);

function shuffleQuotes() {
    for (let i = quotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quotes[i], quotes[j]] = [quotes[j], quotes[i]];
    }
}

function showNextQuote() {
    if (quoteIndex >= quotes.length) {
        shuffleQuotes();
        quoteIndex = 0;
    }
    quoteText.innerText = quotes[quoteIndex++];
}

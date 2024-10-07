const addBtn = document.querySelector("#addBtn"); // Declaring the addButton
const ul = document.querySelector("#ul"); // Declaring the unordered list
const input = document.querySelector("#input"); // Declaring the input button
const emptyInput = document.querySelector("#empty-input-text"); // Paragraph when empty
const tasks = []; // Declaring an array to hold the tasks
let lastAddedTaskIndex = 0; // Tracking the last added item

addBtn.addEventListener("click", addTaskToArray); // Calling addTaskToArray function when clicking

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTaskToArray();
  }
});

function addTaskToArray() {
  const task = input.value; // Holds the text in the input

  if (task !== "") {
    emptyInput.style.display = "none";
    const newTask = {
      name: task,
      completed: false,
      isNew: true, // Add a flag to indicate that the task is new
    };

    tasks.push(newTask);
    lastAddedTaskIndex = tasks.length - 1;
    input.value = ""; // Resetting the text in the input
    displayTasks();
    updateTaskCount(); // Function for updating total tasks
  } else {
    emptyInput.style.display = "block";
    emptyInput.style.animationName = "blink-3";
  }
}

function displayTasks() {
  ul.innerHTML = ""; // Clearing the list before adding the updated one

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");
    li.textContent = task.name;

    // Add animation class only if the task is new and remove it after effect
    if (task.isNew) {
      li.classList.add("new-item");
      tasks[i].isNew = false;

      setTimeout(function () {
        li.classList.remove("new-item");
      }, 500);
    }

    if (task.completed) {
      li.classList.add("completed");
    }

    // Event to toggle completion
    li.addEventListener(
      "click",
      (function (index) {
        return function () {
          toggleTaskCompletion(index);
        };
      })(i)
    );

    // Create and add delete button inside the loop
    const deleteBtn = document.createElement("button"); // Moved here to avoid redeclaration
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");

    // Event to delete the task (inside the loop so that 'i' is defined)
    deleteBtn.addEventListener(
      "click",
      (function (index) {
        return function (event) {
          event.stopPropagation(); // Prevent the click event from bubbling up
          deleteTask(index);
        };
      })(i)
    );

    li.appendChild(deleteBtn); // Adding the delete button to the task (li)
    ul.appendChild(li); // Adding the task (li) to the unordered list (ul)
  }
}

function updateTaskCount() {
  let finishedTasksCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      finishedTasksCount++;
    }
  }
  const finishedCountEl = document.querySelector("#finishedCount");
  finishedCountEl.textContent = finishedTasksCount + " completed";
}

// For marking completed
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;

  const listItems = document.querySelectorAll("li");
  const listItem = listItems[index];

  if (tasks[index].completed) {
    listItem.classList.add("completed");
  } else {
    listItem.classList.remove("completed");
  }

  updateTaskCount();
}

// Removing a todo
function deleteTask(index) {
  tasks.splice(index, 1); // Removing a task from the array
  displayTasks(); // Refreshing the list
  updateTaskCount();
}

// Clearing all tasks (if required)
function clearAll() {
  tasks.length = 0; // Clearing the array
  ul.innerHTML = ""; // Clearing the list
  updateTaskCount();
}

const addBtn = document.querySelector("#addBtn"); // Declaring the addButton
const clearBtn = document.querySelector("#clearBtn"); //Declaring the clearBtn
const ul = document.querySelector("#ul"); //Declaring the unordered list
const input = document.querySelector("#input"); //Declaring the input button
const header = document.querySelector("#header");
const emptyInput =
  document.querySelector("#empty-input-text"); /*Paragraph when empty*/
const tasks = []; //Declaring an array to hold the tasks

/* clearBtn.addEventListener("click", clearAll); //Calling clearAll function when clicking on clearBtn*/
addBtn.addEventListener("click", addTaskToArray); //Calling addTaskToArray function when clicking

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTaskToArray();
  }
});

function addTaskToArray() {
  const task = input.value; //Holds the text in the input

  if (task !== "") {
    //If the text isn't empty we make an object and push it into the tasks array
    const newTask = {
      name: task,
      completed: false,
    };
    /*  header.innerHTML = "Christians Todo List!"; */
    tasks.push(newTask);
    input.value = ""; //Resetting the text in the input
    displayTasks();
    updateTaskCount(); //Function for updating total tasks
  } else {
    /*header.innerHTML = "Don't be lazy!"; */
    emptyInput.style.opacity = "100%";
  }
}

function displayTasks() {
  ul.innerHTML = ""; //Clearing the list before adding the updated one

  for (let i = 0; i < tasks.length; i++) {
    //Looping through the array and creating new li
    const task = tasks[i];
    const li = document.createElement("li");
    li.textContent = task.name;

    if (task.completed) {
      //Adding css class if it's completed
      li.classList.add("completed");
    }

    //Making event for click when pressing on a todo
    li.addEventListener(
      "click",
      (function (index) {
        return function () {
          toggleTaskCompletion(index);
        };
      })(i)
    );

    //Making a trash icon that can be used to remove todos
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");

    // Making another click event
    deleteBtn.addEventListener(
      "click",
      (function (index) {
        return function (event) {
          event.stopPropagation();
          deleteTask(index);
        };
      })(i)
    );

    li.appendChild(deleteBtn); // Adding the deleteBtn icon
    ul.appendChild(li); //Adding the list inside of ul
  }
}

function updateTaskCount() {
  let unfinishedTasksCount = 0;
  let finishedTasksCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      finishedTasksCount++;
    } else {
      unfinishedTasksCount++;
    }
  }

  const unfinishedCountEl = document.querySelector("#taskCount");
  const finishedCountEl = document.querySelector("#finishedCount");

  /*   unfinishedCountEl.textContent = "Unfinished tasks: " + unfinishedTasksCount;*/
  finishedCountEl.textContent = finishedTasksCount + " completed";
}

//For marking completed
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
  updateTaskCount();
}

//Removing a todo
function deleteTask(index) {
  tasks.splice(index, 1); //Removing a task from the array
  displayTasks(); // Refreshing
  updateTaskCount();
}

//Removing all the todos
function clearAll() {
  tasks.length = 0; //Clearing the array
  ul.innerHTML = ""; //Clearing the List
  updateTaskCount();
}

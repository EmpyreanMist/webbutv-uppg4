const addBtn = document.querySelector("#addBtn"); // Declaring the addButton
const clearBtn = document.querySelector("#clearBtn"); //Declaring the clearBtn
const ul = document.querySelector("#ul"); //Declaring the unordered list
const input = document.querySelector("#input"); //Declaring the input button


let tasks = []; //Declaring an array to hold the tasks

clearBtn.addEventListener("click", clearAll); //Calling clearAll function when clicking on clearBtn
addBtn.addEventListener("click", addTaskToArray); //Calling addTaskToArray function when clicking 



function addTaskToArray() {
  const task = input.value; //Holds the text in the input 

  if (task !== "") { //If the text isn't empty we make an object and push it into the tasks array
    const newTask = {
      name: task,
      completed: false
    };
    tasks.push(newTask); 
    input.value = ""; //Resetting the text in the input
    displayTasks(); 
    updateTaskCount(); //Function for updating total tasks
  } else {
    alert("Don't be lazy :)"); //Warning box if you try to add an empty text
  }
}


function displayTasks() {
  ul.innerHTML = ""; //Clearing the list before adding the updated one

  for (let i = 0; i < tasks.length; i++) { //Looping through the array and creating new li
    const task = tasks[i];
    const li = document.createElement("li");
    li.textContent = task.name;

    if (task.completed) { //Adding css class if it's completed
      li.classList.add("completed");
    }

    //Making event for click when pressing on a todo
    li.addEventListener("click", (function(index) {
      return function() {
        toggleTaskCompletion(index);
      };
    })(i));

   //Making a trash icon that can be used to remove todos
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");

    // Making another click event
    deleteBtn.addEventListener("click", (function(index) {
      return function(event) {
        event.stopPropagation(); 
        deleteTask(index);
      };
    })(i));

    li.appendChild(deleteBtn); // Adding the deleteBtn icon
    ul.appendChild(li); //Adding the list inside of ul
  }
}

function updateTaskCount() {
  let unfinishedTasksCount = 0;
  for(let i = 0; i < tasks.length; i++) {
    if(!tasks[i].completed) {
      unfinishedTasksCount++;
    }
  }
  taskCount.textContent = "Unfinished tasks: " + unfinishedTasksCount; 
}

//For marking completed
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed; 
  displayTasks(); 
}

//Removing a todo
function deleteTask(index) {
  tasks.splice(index, 1); // Tar bort uppgiften från arrayen
  displayTasks(); // Uppdaterar visningen
  updateTaskCount();
}

//Removing all the todos
function clearAll() {
  tasks = []; // Tömmer arrayen
  ul.innerHTML = ""; // Tömmer HTML-listan
  updateTaskCount();
}

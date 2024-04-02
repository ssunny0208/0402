document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo");
  const dueDateInput = document.getElementById("due-date");
  const todoList = document.getElementById("todo-list");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();
    const dueDate = dueDateInput.value;

    if (todoText === "") {
      alert("Please enter a task.");
      return;
    }

    const todoItem = document.createElement("li");
    todoItem.innerHTML = `
        <span>${todoText}</span>
        <span class="due-date">${dueDate}</span>
        <button class="delete-btn">Delete</button>
      `;
    todoList.appendChild(todoItem);

    const deleteButton = todoItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      todoItem.remove();
    });

    // Sort tasks by due date
    const listItems = Array.from(todoList.querySelectorAll("li"));
    listItems.sort((a, b) => {
      const dateA = new Date(a.querySelector(".due-date").textContent);
      const dateB = new Date(b.querySelector(".due-date").textContent);
      return dateA - dateB;
    });

    // Clear and re-append sorted list items
    todoList.innerHTML = "";
    listItems.forEach((item) => {
      todoList.appendChild(item);
    });

    todoInput.value = "";
    dueDateInput.value = "";
  });

  // Left align due date when a new task is added
  todoInput.addEventListener("input", function () {
    dueDateInput.style.textAlign = "left";
  });
});

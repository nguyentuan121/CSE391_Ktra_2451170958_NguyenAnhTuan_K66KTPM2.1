// ==========================
// LẤY CÁC PHẦN TỬ HTML
// ==========================

const taskInput = document.querySelector("input");

const addButton = document.querySelector(".submit-btn");

const taskContainer = document.querySelector(".container");

const openFormButton = document.querySelector(".add-btn");

const formBox = document.querySelector(".form-box");

const closeButton = document.querySelector(".close");

const priorityButtons = document.querySelectorAll(".priority-buttons button");

// Priority mặc định
let selectedPriority = "Low";

// ==========================
// MỞ FORM
// ==========================

openFormButton.addEventListener("click", () => {
  formBox.classList.add("show");
});

// ==========================
// ĐÓNG FORM
// ==========================

closeButton.addEventListener("click", () => {
  formBox.classList.remove("show");
});

// ==========================
// CHỌN PRIORITY
// ==========================

priorityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPriority = button.textContent.trim();

    priorityButtons.forEach((btn) => {
      btn.style.opacity = "0.6";
    });

    button.style.opacity = "1";
  });
});

// Mặc định chọn Low
document.querySelector(".btn-low").style.opacity = "1";

// ==========================
// VALIDATE
// ==========================

function validateTask(taskName) {
  if (taskName.trim() === "") {
    alert("Tên Task không được để trống!");
    return false;
  }

  if (taskName.length > 100) {
    alert("Tên Task không được vượt quá 100 ký tự!");
    return false;
  }

  return true;
}

// ==========================
// THÊM TASK
// ==========================

function addTask() {
  const taskName = taskInput.value.trim();

  if (!validateTask(taskName)) {
    return;
  }

  let priorityClass = "";

  if (selectedPriority === "High") {
    priorityClass = "high";
  }

  if (selectedPriority === "Medium") {
    priorityClass = "medium";
  }

  if (selectedPriority === "Low") {
    priorityClass = "low";
  }

  const newTask = document.createElement("div");

  newTask.classList.add("task-card");

  newTask.innerHTML = `
    <div class="task-info">

      <div class="task-title">
        <small>Task</small>
        <h3>${taskName}</h3>
      </div>

      <div class="priority">
        <small>Priority</small>
        <p class="${priorityClass}">
          ${selectedPriority}
        </p>
      </div>

      <div class="status">
        To Do
      </div>

    </div>

    <div class="actions">

      <div class="circle"></div>

      <i class="fa-regular fa-pen-to-square edit"></i>

      <i class="fa-regular fa-trash-can delete"></i>

    </div>
  `;

  taskContainer.appendChild(newTask);

  taskInput.value = "";

  // form vẫn mở
  attachDeleteEvents();
}

// ==========================
// XÓA TASK
// ==========================

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.onclick = function () {
      const card = this.closest(".task-card");
      card.remove();
    };
  });
}

// ==========================
// NÚT ADD
// ==========================

addButton.addEventListener("click", addTask);

// ==========================
// GÁN XÓA CHO TASK CÓ SẴN
// ==========================

attachDeleteEvents();

let toDos = JSON.parse(localStorage.getItem("toDos")) ?? [];
let currentTaskText = document.getElementById("currentTaskText");
let currentOption = "";
let currentTask = {};

onload = initialChecks();

function initialChecks() {
  currentTask = toDos.find(task => task.active) ?? {}
  if (!currentTask.task) return false;

  currentTaskText.value = currentTask.task;
  document.getElementById("screen1").style.visibility = "hidden";      
  document.getElementById("screen2").style.visibility = "";
}

function addNewTask(newOption) {
  if (document.getElementById("newTaskText").value === "") {
    if (
      !currentTask.task ||
      newOption === "addMore"
    ) return false;

    currentTaskText.value = currentTask.task;
    document.getElementById("screen1").style.visibility = "hidden";
    document.getElementById("screen2").style.visibility = "";

    return false;
  }

  const newTask = document.getElementById("newTaskText");

  toDos = [
    ...toDos,
    {
      index: toDos.length,
      task: newTask.value,
      active: true
    }
  ]

  localStorage.setItem(
    "toDos",
    JSON.stringify(toDos)
  );

  currentTask = toDos.find(task => task.active);

  newTask.value = "";

  if (newOption !== "addMore") {
    updateTasks();

    document.getElementById("screen1").style.visibility = "hidden";      
    document.getElementById("screen2").style.visibility = "";
  }
}

function updateTasks(newOption) {
  if (newOption === "addMore") {
    document.getElementById("screen1").style.visibility = "";      
    document.getElementById("screen2").style.visibility = "hidden";

    return false;
  }

  if (!currentTaskText.value && currentTask.task) {
    currentTaskText.value = currentTask.task;
  } else {
    toDos[currentTask.index].active = false;
    localStorage.setItem("toDos", JSON.stringify(toDos));

    if (toDos[currentTask.index + 1]) {
      currentTaskText.value = toDos[currentTask.index + 1].task;
      currentTask = toDos[currentTask.index + 1];
    } else {
      currentTaskText.value = "";
      currentTask = {};
      document.getElementById("screen1").style.visibility = "";
      document.getElementById("screen2").style.visibility = "hidden";
    }
  }
}
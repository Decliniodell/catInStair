let toDos = [];
let currentOption = "";

function addNewTask(newOption) {
  if (document.getElementById("newTaskText").value === "") return false;

  const input = document.getElementById("newTaskText");

  toDos = [
    ...toDos,
    {
      id: toDos.length + 1,
      task: input.value,
      active: true
    }
  ]

  input.value = "";

  if (newOption !== "addMore") {
    if (currentOption === "notFinished") {
      currentOption = "";
    } else {
      updateTasks();
    }
    document.getElementById("screen1").style.visibility = "hidden";      
    document.getElementById("screen2").style.visibility = "";
  }
}

function updateTasks(newOption) {
  if (newOption) currentOption = newOption; 
  let currentTaskText = document.getElementById("currentTaskText");
  const taskActiveIndex = toDos.findIndex(task => task.active)

  if (!currentTaskText.value) {
    currentTaskText.value = toDos[taskActiveIndex].task;
  } else {
    if (newOption === "notFinished") {
      document.getElementById("screen1").style.visibility = "";
      document.getElementById("screen2").style.visibility = "hidden";
    } else {
      toDos[taskActiveIndex].active = false;

      if (toDos[taskActiveIndex + 1]) {
        currentTaskText.value = toDos[taskActiveIndex + 1].task;
      } else {
        toDos = [];
        currentTaskText.value = "";
        document.getElementById("screen1").style.visibility = "";
        document.getElementById("screen2").style.visibility = "hidden";
      }           
    }
  }
}
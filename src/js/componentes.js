

import { taskList } from "../index";
import { Task} from './classes/Task';
import { TaskList} from './classes/TaskList';

// ! DOM

// ? Div contenedor de tareas
const divTasks = document.querySelector(".main__task-list");
// ? Selecciona el input para crear tareas
const txtInput = document.getElementById('input-write');
const inputSubmit = document.getElementById("btn-submit");
const errorMessage = document.querySelector(".message");

// ? Dom Task form
const inputTask = document.getElementById("input-write");
const inputDeadline = document.getElementById("get-date");
const inputColor = document.getElementById("get-color");

// ? Filters

const divFilters= document.querySelector('.main__task-list__settings');

export const addTaskHtml = (task) => {
  console.log(task);
  const taskTemplateHtml = `
   <li class="main__task-list__li  ${
     task.complete ? "complete" : ""
   } " style="background-color:${task.color}"; >
   <div class="main__task-list__li-checkbox">
       <input type="checkbox" name="completed" id="${task.id}"
           class="main__task-list__li-checkbox__img"  ${
             task.complete ? "checked" : ""
           }>
       <label for="${
         task.id
       }" class="main__task-list__li-checkbox__label"></label>
   </div>
   <div class="main__task-list__li-text">
       <h3 for="" class="main__task-list__li-text__item">
        ${task.task}
       </h3>
       <p for="" class="main__task-list__li-text__item">
        ${showDate(task.date_created)}
       </p>
   </div>

   <div class="main__task-list__li-remain-date" id="time${task.id}">
       <p class="main__task-list__li-remain-date__item main__task-list__li-remain-date__item--date ">${showDate(new Date(task.deadline))}</p>
       <p class="main__task-list__li-remain-date__item"></p>

   
   </div>

   <div class="main__task-list__delete">
       <div class="main__task-list__li-delete">
       </div>
   </div>
    </li>`;



    
    divTasks.insertAdjacentHTML("afterbegin", taskTemplateHtml);
    countDown(task.deadline,task.id);
  return taskTemplateHtml;
};

txtInput.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    saveTask();
  }
});

inputSubmit.addEventListener("click", saveTask);

function saveTask() {
  if (getInput() != null) {
    const { task, deadlineFull, color ,deadlineGetTime } = getInput();
    // console.log(task, deadlineFull, color);
    const createInstanceTask = new Task(task, color, deadlineGetTime);
    // se agrega al array la tarea
    // ** Recordar Llamar la instancia por la variable que almacena la instancia
    taskList.addTask(createInstanceTask);
    
    // console.log(taskList);
    // llamo la funcion crear html
    addTaskHtml(createInstanceTask);
    countDown(deadlineGetTime,createInstanceTask.id);
    
    // borrar valor del input
    txtInput.value = "";
    inputColor.value = "#000000";
    inputDeadline.value = "";
  }
}

function showDate(taskdate) {
  const [date, time] = taskdate.toLocaleString().split(" ");
  const [day, mounth, year] = date.split("/");
  const [hour, minute, second] = time.split(":");
  return `${year}/${mounth}/${day} ${hour}:${minute}:${second}`;
}

function convertDate(deadline) {
  const now = new Date();
  const remainTime = (new Date(deadline) - now + 1000) / 1000;
  //lo que hace aca es restar las fechas y agregarle 1s ya que al recorrer la funcion se atrasa 1s  y se divide 1000 para que me de el tiempo en S y no en ms
  const remainSeconds = ("0" + Math.floor(remainTime % 60)).slice(-2);
  // el slice lo que hace es que si el numero que de remaintime % 60  es de dos digitos se quite el '0' y si no se le agrega
  const remainMinutes = ("0" + Math.floor(remainTime / 60 % 60)).slice(-2);
  const remainHours = ("0" + Math.floor(remainTime / 3600 % 24)).slice(-2);

  const remainDays = Math.floor(remainTime / (3600*24));
  const remainYears = Math.floor( remainTime / (3600*24*365));
  return {
    remainTime,
    remainSeconds,
    remainMinutes,
    remainHours,
    remainDays,
    remainYears
  }


}


const countDown=(deadline,taskId) =>{
  const htmlDiv =document.getElementById(`time${taskId}`).lastElementChild;
  console.log(taskId);
  console.log(document.getElementById(`time${taskId}`));
  const timeUpdate = setInterval( () =>{
      const times = convertDate(deadline);

      htmlDiv.textContent = `${times.remainDays}d ${times.remainHours}h ${times.remainMinutes}m ${times.remainSeconds}`;
      // htmlDiv.children[2].innerHTML = `${times.remainHours}h`;
      // htmlDiv.children[3].innerHTML= `${times.remainMinutes}m`;
      // htmlDiv.children[4].innerHTML= `${times.remainSeconds}s`;
      
       
      if ( times.remainTime <= 1 )
      {
        clearInterval(timeUpdate);
        htmlDiv.textContent = "Expirado";
      }

      
  } ,1000 )
}


function getInput() {
  try {
    const task = inputTask.value.toString().trim();
    const deadline = inputDeadline.value;
    const color = inputColor.value;
    const nowDate = new Date();
    const deadlineGetTime = new Date(deadline);
    const deadlineFull = new Date(deadline).toLocaleString();
    console.log(deadlineFull);

    // console.log("now date"+nowDate.getTime());
    // console.log("input date"+deadlineGetTime.getTime());

    if (task.length === 0) {
      throw "Ingrese un nombre para la tarea.";
    } else if (deadline == "") {
      throw "Ingrese una fecha válida.";
    } else if (nowDate.getTime() > deadlineGetTime.getTime()) {
      console.log("get time xd");
      throw `Ingrese una fecha mayor a la ${nowDate.toLocaleDateString()} y a la hora ${nowDate.toLocaleTimeString()} `;
    }

    return { task, deadlineFull, color ,deadlineGetTime };
  } catch (error) {
    alert(error);
  }
}

divTasks.addEventListener("click", (event) => {
  const elementClick = event.toElement;

  console.log(elementClick);
  // captura  el elemento al que se le de click

  const parentElementClick = elementClick.parentElement.parentElement;
  // console.log(parentElementClick);
  // captura el li

  const taskId = parentElementClick.children[0].children[0].getAttribute("id");

  //captura el input con el id
  // console.log(taskId);/

  if (elementClick.getAttribute("name") == "completed") {
    parentElementClick.classList.toggle("complete");
    taskList.markCompleted(taskId);
  } else if (elementClick.classList.contains("main__task-list__li-delete")) {
    taskList.deleteTask(taskId);
    parentElementClick.remove();
  }

  // const taskId = elementClick.get
});



// ? filters
divFilters.addEventListener('click', 
    () =>{

      const btnFilters =event.target.tagName;
      // console.log(btnFilters); retorna div o button 
    

      if(btnFilters != 'DIV'  )
      {
      filter(event)
      }
    }


);
  

const filter =(event) =>{  
      const elementClick = event.target.textContent;
      // console.log(elementClick); 

      for(const element of divTasks.children)
      {
        element.classList.remove('hidden');
        const complete = element.classList.contains('complete');
        
        switch(elementClick)
        {
          case 'Pendientes':
            if(complete)
            {
              element.classList.add('hidden');
            }
            break;

          case 'Completados':
            
              if(!complete)
              {
                element.classList.add('hidden');
              }
              break

          case 'Borrar Completados':
            
            btnDeleteCompletedAll();
            console.log(taskList.deleteTaskCompletedAll());
            break
          
        }
      }

} 


const btnDeleteCompletedAll =  () =>{
  for(let i = divTasks.children.length-1 ; i>=0; i--)
  {
    const element = divTasks.children[i];
    console.log(element);
    if( element.classList.contains('complete'))
    {
      taskList.deleteTaskCompletedAll();
      divTasks.removeChild(element);
    }
  }
}
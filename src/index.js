import "./css/styles.css";
import { Task} from './js/classes/Task';
import { TaskList} from './js/classes/TaskList';
import  {addTaskHtml } from "./js/componentes";

// Se crea la instancia de la lista de tareas = []
export const taskList =  new TaskList();

// const task = new Task('Ejemplo one');

// taskList.addTask(task);

// addTaskHtml(task);

// console.log(addTaskHtml(task));

console.log(taskList);


taskList.taskList.forEach(element =>  {
    addTaskHtml(element);
});




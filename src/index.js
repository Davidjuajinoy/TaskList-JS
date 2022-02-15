import "./css/styles.css";
import { TaskList} from './js/classes/TaskList';
import  {addTaskHtml } from "./js/componentes";

// Se crea la instancia de la lista de tareas =  [] | loadStorage()
export const taskList =  new TaskList();


taskList.taskList.forEach(element =>  {
    addTaskHtml(element);
});




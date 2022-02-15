import { taskList } from "../..";

export class TaskList{

    constructor()
    {

            this.loadTask();
            // console.log( this.taskList);
    }


    addTask(task)
    {
        this.taskList.push(task);
        this.storageTask();
    }

    markCompleted(id)
    {
        for (const task of this.taskList) {
            if( task.id ===Number(id))
            {
                task.complete = !task.complete;
                this.storageTask();
                break;
            }
        }
    }

    storageTask()
    {
        // se para a Json porque no recibe string el localStorage
        localStorage.setItem('Tasks', JSON.stringify(this.taskList));
        // console.log(this.taskList);
    }


    loadTask()
    {
        // recordar que al pasarlos a Json y volverlos objeto se pierde la instancia
        this.taskList= (localStorage.getItem('Tasks'))
        ? JSON.parse(localStorage.getItem('Tasks'))
        : [];


    }


    deleteTask(id)
    {
        // Busca en el array el id que coincida  y crea un nuevo array con los elementos que cumpla la condicion
        this.taskList = this.taskList.filter(  (elemento) => elemento.id != id );
     // guarda el nuevo array en el localStorage
        this.storageTask();
    }

    deleteTaskCompletedAll()
    {
        this.taskList = this.taskList.filter((task) => !task.complete);
        this.storageTask();
    }
}
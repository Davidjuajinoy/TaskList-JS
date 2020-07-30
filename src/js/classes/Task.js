export class Task{

    constructor(task,color,deadline)
    {
        this.id = new Date().getTime()+Math.floor(Math.random() * 100 + 1);
        this.task = task;
        this.complete = false;
        this.color = color;
        this.date_created = new Date().toLocaleString();
        this.deadline = deadline;
    }

}
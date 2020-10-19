
export class Task {
  description: string;
  completed: boolean;
  update: boolean;
    constructor(description: string, completed: boolean, update: boolean){
this.description = description;
this.completed = completed;
this.update = update;
    }
  }
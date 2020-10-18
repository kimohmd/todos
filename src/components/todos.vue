<template lang="html">
  <div>
    <h1>{{titre}}</h1>
    <input type ="text" v-model="newTodo" :placeholder="placeholderText"> 
    <button v-on:click="createTodo()">
      Créer
    </button>
    <ul class="list-group">
          <li class="d-flex align-items-center list-group-item" v-for="(todo, index) in $options.filters.FilterTasks(this.todosList, this.filterText)" :key="index"> 
            <input type="checkbox" id="checkbox" v-model="todo.completed"> 
            <input type ="text" :value="todo.description">
            <button v-on:click="deleteTodo(index)">
              <span class="fa fa-trash"></span>
            </button>
          </li>
    </ul>
  <footer v-if= "this.todosList.length>0">
  <span> tâches restantes : {{nonCompletedTasks()}}</span>
    <button v-on:click="updateFilterText('')">
      Toutes
    </button>
    <button v-on:click="updateFilterText('nonCompleted')">
      Tâches à faire
    </button>
    <button v-on:click="updateFilterText('completed')">
      Tâches faites
    </button>
    <button v-on:click="deleteTasksDone()">
      Supprimer les tâches faites
    </button>
    <button v-on:click="completeAllTasks()">
      compléter toutes les tâches
    </button>
   </footer>
  
  
  </div>

</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import {Task} from '../classes/Task';
@Component({
  filters: {
  FilterTasks: function (list: Task[], arg: string) {
    let l: Task[]=[];
    if (!arg||arg=='') {
    l= list;
    }
    else{
      switch(arg) { 
   case "nonCompleted": { 
      l= list.filter((task) => !task.completed);
      break; 
   } 
   case "completed": { 
       l= list.filter((task) => task.completed);
      break; 
    }
      }
    }
    return l;
  },
}
})
export default class Todos extends Vue {
  titre="Todos";
  placeholderText="créer une nouvelle tâche" ;
  newTodo="";
  todosList: Task[] =[];
  filterText="";
  createTodo(){
    if (this.newTodo.length > 0) {
        this.todosList.push(new Task(this.newTodo, false))
      this.newTodo = "";
    }
  }
  updateFilterText(text: string){
    this.filterText = text;
  }
  nonCompletedTasks(): number{
    return this.todosList.filter((task) => !task.completed).length;
  }
  deleteTasksDone(){
    this.todosList = this.todosList.filter((task) => !task.completed);
  }

   completeAllTasks(){
    this.todosList.forEach(task => {
      if(!task.completed){
        task.completed=true;
      }
    });
  }

  deleteTodo(index: number){
    this.todosList.splice(index, 1);
  }
}
</script>

<style scoped lang="scss">
  
</style>

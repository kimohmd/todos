<template lang="html">
  <div>
    <h1>{{titre}}</h1>
    <input type ="text" v-model="newTodo" :placeholder="placeholderText"> 
    <button v-on:click="createTodo()">
      Créer
    </button>
    <ul >
          <li  v-for="(todo, index) in $options.filters.FilterTasks(this.todosList, this.filterText)" :key="index"> 
            <input type="checkbox" id="checkbox" v-model="todo.completed"> 
            <input v-bind:class="{ completed: todo.completed }" type="texte" v-if="!todo.update" :value="todo.description"  readonly> 
            
            <input v-else type="text"  v-model="todoUpdate"  @blur="updateTodo(index)" >
            <button v-on:click="startUpdate(index)">
              <span class="fa fa-edit"></span>
            </button>
            <button v-on:click="deleteTodo(index)">
              <span class="fa fa-trash"></span>
            </button>
          </li>
    </ul>
  <footer v-if= "this.todosList.length>0">
  <span> tâches restantes : {{nonCompletedTasks()}}/{{this.todosList.length}}</span>
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
  todoUpdate="";
  createTodo(){
    if (this.newTodo.length > 0) {
        this.todosList.push(new Task(this.newTodo, false, false))
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
  startUpdate(index: number)
  {
    this.todosList[index].update = true;
    this.todoUpdate = this.todosList[index].description;
  }
  updateTodo(index: number){
  this.todosList[index].description =this.todoUpdate;
  this.todosList[index].update = false;
  }
  deleteTodo(index: number){
    this.todosList.splice(index, 1);
  }
}
</script>

<style scoped lang="scss">
  .completed {
  text-decoration: line-through;
}
ul {
  list-style-type: none;
 }
</style>

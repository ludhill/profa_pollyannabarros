import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Tarefa } from '../../../tarefa';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tarefas: Tarefa[] = [];

  constructor(private taskService:TaskService){

  }

  ngOnInit():void{
    this.taskService.getTasks().subscribe((dado)=>{
      this.tarefas = dado;
      console.log(dado)
    });

  }
  deleteTask(tarefa:Tarefa){
    this.taskService.deleteTask(tarefa).subscribe();
  }
}

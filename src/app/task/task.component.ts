import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  taskId: string | undefined;
  task: any;
  dataUser: any;
  data: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadData();
    this.taskId = this.route.snapshot.params['id'];
    if (this.taskId) {
      this.getTask(this.taskId);
    }
  }

  loadData() {
    this.data = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.data);
  }
  editTask(event: Event, active: string|undefined, date: string) {
    const url = `http://localhost:3000/tasks/${this.taskId}`;
    const dataUser: any = localStorage.getItem('user');
    this.dataUser = JSON.parse(localStorage.getItem('user') || '{}');
    event.preventDefault();
    const completedResult = active ? true : false;
    const credentials = {
      completed: completedResult,
      date: date,
    };
    console.log(credentials);
    this.http.put(url, credentials).subscribe(
      (response: any) => {
        console.log(response);
        // Aquí puedes manejar la respuesta del servidor
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        // Aquí puedes manejar el error en caso de que ocurra
      }
    );
  }
  getTask(id: string) {
    const url = `http://localhost:3000/tasks/${id}`;
    this.http.get(url).subscribe(
      (response: any) => {
        console.log(response);
        // Aquí puedes manejar la respuesta del servidor
        this.task = response;
      },
      (error) => {
        console.error(error);
        // Aquí puedes manejar el error en caso de que ocurra
      }
    );
  }
}

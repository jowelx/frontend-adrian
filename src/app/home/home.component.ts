import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data: any;
  tasks: any = [];
  allTask: any = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.loadData();
    this.getTask();
  }

  loadData() {
    this.data = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.data);
  }

  getTask() {
    const url = 'http://localhost:3000/tasks';
    this.http.get(url).subscribe(
      (response: any) => {
        console.log(response);
        // Aquí puedes manejar la respuesta del servidor
        this.allTask = response;
        this.tasks = response.filter(
          (task: any) => task.id_student === this.data._id
        );
      },
      (error) => {
        console.error(error);
        // Aquí puedes manejar el error en caso de que ocurra
      }
    );
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css'],
})
export class UploadTaskComponent {
  dueDate: string = '';
  selectedFile: any;
  dataUser: any;
  isLoading = false;
  constructor(private http: HttpClient, private router: Router) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
  }
  addTask(event: Event, name: string, description: string, date: string) {
     this.isLoading = true;
    const url = 'http://localhost:3000/tasks';
    this.dataUser = JSON.parse(localStorage.getItem('user') || '{}');
    event.preventDefault();
    console.log(this.selectedFile);
    const fileReader = new FileReader();
    fileReader.onload = (event: any) => {
      // El contenido del archivo en base64 estará en event.target.result
      const base64String = event.target.result;
      console.log(base64String); // Aquí puedes utilizar el valor de base64String como necesites
      const credentials = {
        title: name,
        description: description,
        completed: false,
        student: this.dataUser.name,
        id_student: this.dataUser._id,
        date: date,
        file: base64String,
      };

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      console.log(credentials);
      this.http.post(url, credentials, { headers }).subscribe(
        (response: any) => {
          console.log(response);
           this.isLoading = false;
          // Aquí puedes manejar la respuesta del servidor
          this.router.navigate(['/home']);

        },
        (error) => {
          console.error(error);
          // Aquí puedes manejar el error en caso de que ocurra
        }
      );
    };
    fileReader.readAsDataURL(this.selectedFile);
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css'],
})
export class UploadTaskComponent {
  dueDate: string = '';
  selectedFile: File | null = null;
  dataUser: any;
  constructor(private http: HttpClient, private router: Router) {}
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  addTask(event: Event, name: string, description: string, date: string) {
    const url = 'http://localhost:3000/tasks';
    const dataUser: any = localStorage.getItem('user');
    this.dataUser = JSON.parse(localStorage.getItem('user') || '{}');
    event.preventDefault();
    const credentials = {
      title: name,
      description: description,
      completed: false,
      student: this.dataUser.name,
      id_student: this.dataUser._id,
      date: date,
    };
    console.log(credentials);
    this.http.post(url, credentials).subscribe(
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
  onSubmit() {
    // Lógica para enviar el archivo y la fecha de entrega
    console.log('Archivo seleccionado:', this.selectedFile);
    console.log('Fecha de entrega:', this.dueDate);
    // Aquí puedes realizar la lógica adicional, como enviar los datos al servidor
  }
}

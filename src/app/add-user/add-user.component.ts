import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  constructor(private http: HttpClient, private router: Router) {}
  addUser(
    event: Event,
    name: string,
    active: string,
    password: string,
    course: string,
    email: string
  ) {
    event.preventDefault();
    const credentials = {
      name: name,
      isActive: active === 'on' ? true : false,
      password: password,
      course: course,
      email: email,
      type: 'student',
    };
    const url = 'http://localhost:3000/users';
    console.log(credentials);
    this.http.post(url, credentials).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        // Aquí puedes manejar el error en caso de que ocurra
      }
    );
  }
}

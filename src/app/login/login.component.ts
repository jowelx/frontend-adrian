import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private dataService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.clearData();
  }

  clearData() {
    localStorage.clear();
  }
  login(event: Event, username: string, password: string) {
    const url = 'http://localhost:3000/users/login';

    event.preventDefault();
    const credentials = {
      email: username,
      password: password,
    };

    this.http.post(url, credentials).subscribe(
      (response: any) => {
        console.log(response.user);
        // Aquí puedes manejar la respuesta del servidor
        this.dataService.setData(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        // Aquí puedes manejar el error en caso de que ocurra
      }
    );
  }
}

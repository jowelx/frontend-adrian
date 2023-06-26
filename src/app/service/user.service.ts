import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any;

  constructor() {}

  setData(user: any) {
    this.user = user;
  }

  getData() {
    return this.user;
  }
}

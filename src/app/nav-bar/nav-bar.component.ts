import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [MatIconModule],
  standalone: true,
})
export class NavBarComponent {
  @Input() parametroMenu: string;
  constructor() {
    this.parametroMenu = '';
  }
}

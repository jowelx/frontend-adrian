import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  data: any;
  @Input() parametroSideMenu: string = '';
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data = JSON.parse(localStorage.getItem('user') || '{}');
  }
}

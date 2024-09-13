import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss']
})
export class InsideComponent implements OnInit {
  accessToken: string = '';
  constructor() { }

  ngOnInit(): void {
    this.accessToken = sessionStorage.getItem("at") || '';
  }

}

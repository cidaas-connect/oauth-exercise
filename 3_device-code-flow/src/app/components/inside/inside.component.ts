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
    // TODO 3.4 get stored access_token
    this.accessToken;
  }

}

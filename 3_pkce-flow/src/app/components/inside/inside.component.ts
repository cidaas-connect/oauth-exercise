import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss']
})
export class InsideComponent implements OnInit {
  accessToken: string = '';
  secured_response: string = '';
  status: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  callSecuredEndpoint() {
    // call /secured-resource/handmade from exercise 1
  }

  logout() {
    // logout user
  }
}

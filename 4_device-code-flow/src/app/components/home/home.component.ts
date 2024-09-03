import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   *  loginURL is used for the qrcode. You just need to set the verification_uri_complete url to it
   *  this.loginURL = response.verification_uri_complete;
   */
  public loginURL: string = "";

  constructor() { }

  ngOnInit(): void {
  }


  startDeviceCodeFlow() {
    console.log("Start device code flow");
  }

}

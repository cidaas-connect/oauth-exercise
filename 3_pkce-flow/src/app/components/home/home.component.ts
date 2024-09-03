import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  startPKCE() {
    /**
     *
     * let state = uuidv4();
     * let code_verifier = uuidv4();
     * localStorage.setItem(state, code_verifier);
     * let code_challenge = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
     *
     */
    let state = uuidv4();

    console.log("Start PKCE flow");
  }

}



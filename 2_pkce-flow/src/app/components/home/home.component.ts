import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
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
    console.log("Start PKCE flow");
    /**
     *
     * let state = uuidv4();
     * let code_verifier = uuidv4();
     * localStorage.setItem(state, code_verifier);
     * let code_challenge = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
     *
     */
    let baseurl = environment.baseurl;
    let client_id = environment.client_id;
    let redirect_uri = environment.redirect_uri;

    let state = uuidv4();
    let code_verifier = uuidv4();
    let code_challenge = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    // TODO 2.1 store code_verifier

    // TODO 2.2 create and call authz
  }
}

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

    console.log("Start PKCE flow");

    let state = uuidv4();
    let code_verifier = uuidv4();
    sessionStorage.setItem(state, code_verifier);
    let code_challenge = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    let authz = baseurl + "/authz-srv/authz?" +
      "&response_type=code" +
      "&client_id=" + client_id +
      "&scope=profile roles" +
      "&redirect_uri=" + redirect_uri +
      "&code_challenge=" + code_challenge +
      "&code_challenge_method=S256" +
      "&state=" + state;

    location.href = authz;
  }
}

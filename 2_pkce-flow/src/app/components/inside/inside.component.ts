import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss']
})
export class InsideComponent implements OnInit {
  accessToken: string = '';
  id_token: string = '';
  secured_response: string = '';
  status: number = 0;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let code = params.code;
      let state = params.state;
      let code_verifier = sessionStorage.getItem(state) || "";

      this.callTokenEndpoint(code, code_verifier)
    })
  }

  callSecuredEndpoint() {
    // call /secured-resource/handmade from exercise 1
    fetch("http://localhost:3000/secured-resource/interceptor", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }).then(r => r.json()).then(data => ({ status: data.status, body: data }))
      .then(response => {
        this.status = response.status;
        this.secured_response = response.body.result;
      })
  }

  logout() {
    // logout user
    location.href = environment.baseurl + "/session/end_session?id_token_hint=" + this.id_token + "&post_logout_redirect_uri=http://localhost:4200/home";
  }

  callTokenEndpoint(code: string, code_verifier: string) {

    let requestBody = {
      client_id: environment.client_id,
      code_verifier: code_verifier,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: environment.redirect_uri,
    }

    fetch(environment.baseurl + "/token-srv/token", {
      method: 'POST', body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(response => {
      this.accessToken = response.access_token;
      this.id_token = response.id_token;
    })
  }
}

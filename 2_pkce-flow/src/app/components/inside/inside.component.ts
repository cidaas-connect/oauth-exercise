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
      // TODO 2.3 get code_verifier and check state

      // TODO 2.4 call Tokenendpoint
    })
  }

  callSecuredEndpoint() {
    // call /secured-resource/handmade from exercise 1
    fetch("http://localhost:3000/secured-resource/interceptor", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO 2.7 set token to header
      }
    }).then(r => r.json()).then(data => ({ status: data.status, body: data }))
      .then(response => {
        this.status = response.status;
        this.secured_response = response.body.result;
      })
  }

  logout() {
    // logout user
    // TODO 2.8 goto logout route, use id_token_hint
  }

  callTokenEndpoint(code: string, code_verifier: string) {

    let requestBody = {
      // TODO 2.5 create requestbody
    }

    fetch(environment.baseurl + "/token-srv/token", {
      method: 'POST', body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(response => {
      // TODO 2.6 handle response
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { Observable, of, Subscription, timer } from 'rxjs';
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap, takeUntil } from "rxjs/operators";
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

  pollSubscription: Subscription | undefined;
  deviceCode: string = '';
  status: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  startDeviceCodeFlow() {
    console.log("Start device code flow");
    this.fetchDeviceAuthz();
  }


  fetchDeviceAuthz() {
    fetch(environment.baseurl + "/authz-srv/device/authz", {
      method: 'POST', body: new URLSearchParams({
        "client_id": environment.client_id,
        "scope": "profile"
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => res.json()).then(response => {
      console.log(response);
      this.loginURL = response.verification_uri_complete;
      this.deviceCode = response.device_code;
      let inter = response.interval * 1000; // to millis
      let exp = response.expires_in * 1000; // to millis

      this.pollSubscription = interval(inter)
        .pipe(takeUntil(timer(exp)),
          startWith(0), switchMap(() => this.pollLoginStatus())
        ).subscribe(res => this.status = res,
          err => console.log('HTTP Error', err));
    });
  }

  pollLoginStatus(): Observable<string> {

    let requestBody = {
      client_id: environment.client_id,
      device_code: this.deviceCode,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code"
    }

    fetch(environment.baseurl + "/token-srv/token", {
      method: 'POST', body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(response => {
      if (response.error) {
        if (response.error != "authorization_pending") {
          this.pollSubscription?.unsubscribe();
        }
      } else {
        let accessToken = response.access_token;
        sessionStorage.setItem("at", accessToken);
        this.pollSubscription?.unsubscribe();
        this.router.navigate(['/inside']);
      }
    });
    return of("");
  }

  ngOnDestroy(): void {
    this.pollSubscription?.unsubscribe();
  }
}

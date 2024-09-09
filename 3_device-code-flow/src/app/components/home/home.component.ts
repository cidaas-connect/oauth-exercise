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
      // TODO 3.1 set attributes from response
      this.loginURL;
      this.deviceCode;
      let inter;
      let exp;

      this.pollSubscription = interval(inter)
        .pipe(takeUntil(timer(exp)),
          startWith(0), switchMap(() => this.pollLoginStatus())
        ).subscribe(res => this.status = res,
          err => console.log('HTTP Error', err));
    });
  }

  pollLoginStatus(): Observable<string> {
    let requestBody = {
      // TODO 3.2 create req body for polling the token-srv
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
        // TODO 3.3 store access_token
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

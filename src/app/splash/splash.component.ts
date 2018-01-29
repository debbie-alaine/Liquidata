import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
    providers: [AuthService]
})

export class SplashComponent implements OnInit {

  constructor(public router: Router, private auth: AuthService) { }

  ngOnInit() {
      if (this.auth.isAuthenticated()) {
          console.log('authenticated...');
          this.router.navigate(['/dashboard']);
      }
      if (!this.auth.isAuthenticated()) {
          console.log('Not authenticated...');
      }
  }

  public login() {
        console.log('Logged Out Clicked');
        this.auth.login();
    }

}

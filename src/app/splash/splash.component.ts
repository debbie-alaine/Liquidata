import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-splash',
    templateUrl: './splash.component.html',
    styleUrls: ['./splash.component.scss'],
    providers: [AuthService]
})


export class SplashComponent implements OnInit {

    navStyle = {};

  constructor(public router: Router, private auth: AuthService) { }

  ngOnInit() {
      if (this.auth.isAuthenticated()) {
          console.log('Authenticated...');
          this.router.navigate(['/dashboard']);
      }
      if (!this.auth.isAuthenticated()) {
          console.log('Not authenticated...');
      }
  }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number > 45) {
            this.navStyle = {'background': 'white', 'transition': 'background 1s'};
        } else {
            this.navStyle = {'background': 'transparent', 'transition': 'background 1s'};
        }
    }


  public login() {
      this.auth.login();
      this.router.navigate(['/dashboard']);
  }

}

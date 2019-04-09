import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/_auth/authentication.service';
import { User } from '@app/_models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: []
})
export class NavigationComponent{
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}

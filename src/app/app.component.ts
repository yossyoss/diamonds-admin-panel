import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations';
import { AuthenticationService } from './_services';
import { Customer } from './_models';

@Component({ 
    selector: 'app', 
    templateUrl: 'app.component.html',
    animations: [fadeAnimation] 
})
     // register the animation)
export class AppComponent {
    currentUser: Customer;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
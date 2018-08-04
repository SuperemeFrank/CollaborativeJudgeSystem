import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl} from '@angular/forms';
import { Subscription } from "rxjs/Subscription";
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = "Collaborative Judge System";
  profile: any;

  searchBox: FormControl = new FormControl(); // check the change of input form
  subscription: Subscription;
  constructor(public auth: AuthService,
              @Inject('input') private input,
              private router: Router) {
    auth.handleAuthentication()
        .then(userProfile => {
          console.log("nav then")
          this.profile = userProfile;
        })
        .catch();
  }

  ngOnInit(){

    if (localStorage.getItem('profile')) {
      this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    this.subscription = this.searchBox
                            .valueChanges
                            .debounceTime(300) // control the update time
                            .subscribe(
                              term => {
                                this.input.changeInput(term);
                              }
                            );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // avoid memory leak
  }

  searchProblem(): void {
    this.router.navigate(['/problems']);
  }

  public login() {
    this.auth.login();
  }

  public logout() {
    this.auth.logout();
    this.profile = "";
  }
}

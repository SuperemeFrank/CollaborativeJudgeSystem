import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = "Collaborative Judge System";
  profile: any;

  constructor(public auth: AuthService) {
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
  }

    public login() {
      this.auth.login();
    }

    public logout() {
      this.auth.logout();
      this.profile = "";
    }
  }

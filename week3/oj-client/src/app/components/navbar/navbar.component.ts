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
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
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

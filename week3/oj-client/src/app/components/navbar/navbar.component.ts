import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = "Collaborative Judge System";
  username = "";

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
}

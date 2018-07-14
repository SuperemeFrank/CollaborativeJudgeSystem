import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string = '';
  username: string = '';
  profile : any;
  constructor(@Inject('auth') private auth) { }

  ngOnInit() {
    if (localStorage.getItem('profile')) {
      this.profile = JSON.parse(localStorage.getItem('profile'));
      this.email = this.profile.name;
      this.username = this.profile.nickname;
    }
  }

  resetPassword() {
    this.auth.resetPassword();
  }
}

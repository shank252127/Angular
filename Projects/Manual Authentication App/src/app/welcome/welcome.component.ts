/**
 * Modify this file to fetch and display the login details
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user; // type this variable using user.type.ts file
  allUser: Array<string>;
  resData: any;
  showAllUser: boolean = false;
  showSpinner:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => (this.user = params['username'])
    )
  }

  logout() {    
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getAllUser() {
    this.showSpinner = true;
    this.service.getUsers().subscribe(
      (res) => {

        this.resData = res;
        this.allUser = this.resData.data.map((el) => el.name);
        if (this.allUser.length > 0) {
          this.showSpinner = false
          this.showAllUser = true;
        } else {
          this.showSpinner = false
          this.showAllUser = false;
        }

        console.log(this.allUser);
      },
      (error) => {
        this.showSpinner = false;
        this.showAllUser = false;
      }
    );
  }
  ngOnDestroy() {}
}

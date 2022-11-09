import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from '../services/authentication.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  responseData: any;
  showSpinner: boolean = false;
  userNotFound: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    localStorage.clear();
  }

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, usernameValidator]),
      password: new FormControl('', [Validators.required, passwordValidator]),
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.showSpinner = true;
      console.log(this.loginForm);
      this.authenticationService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (result) => {
            this.showSpinner = true;
            if (result != null) {
              this.userNotFound = '';
              console.log(result);
              this.responseData = result;
              localStorage.setItem('token', this.responseData.token);
              this.router.navigate(['welcome', this.loginForm.value.username]);
            }
          },
          (error) => {
            this.userNotFound = 'User Not Found';
            this.showSpinner = false;
            console.log(error);
          }
        );
    } else {
      this.showSpinner = false;
      console.log('Not Valid');
    }
  }
}

// implement the username validator. Min 6 characters and no digits, special chars
function usernameValidator(usr: FormControl): { invalid: boolean } {
  console.log(usr.value);
  let val = usr.value;
  const regex = new RegExp('^[A-Za-z_@.#&+-]*$');
  if (val.length >= 6 && regex.test(val)) {
    return null;
  }
  return {
    invalid: true,
  };
}

// implement the password validator
// Min 1 uppercase, 1 lower case and a digit. Total length >= 8
function passwordValidator(pwd: FormControl): { invalid: boolean } {
  let val = pwd.value;
  console.log(val);
  const regex = new RegExp(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/);
  if (val.length >= 8 && regex.test(val)) {
    return null;
  }
  return {
    invalid: true,
  };
}

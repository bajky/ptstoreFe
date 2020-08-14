import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../service/validation/validation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              private validationService: ValidationService) { }

  formGrp: FormGroup;
  loginError = false;

  ngOnInit(): void {
    let userNameInput = new FormControl('', [
      Validators.required
    ])
    let passwordInput = new FormControl('', [
      Validators.required
    ])

    this.formGrp = new FormGroup({
      userName: userNameInput,
      password: passwordInput
    })
  }

  onLogin(): void {
    let userName = this.formGrp.get('userName').value;
    let password = this.formGrp.get('password').value;

    this.validationService.validateAllFormFields(this.formGrp);
    if (!this.formGrp.valid) {
      return;
    }

    this.authService.login(userName, password)
      .subscribe(() => {
          this.router.navigate(['dashboard']);
      }, () => {
        this.loginError = true;
        this.formGrp.reset();
      });
  }

  closeErrorMsg() {
    this.loginError = false;
  }
}

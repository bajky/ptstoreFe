import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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

    this.validateAllFormFields(this.formGrp);
    if (!this.formGrp.valid) {
      return;
    }

    this.authService.login(userName, password)
      .subscribe(() => {
          this.router.navigate(['dashboard']);
      }, () => this.loginError = true);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isFieldValid(field: string) {
    return !this.formGrp.get(field).valid && this.formGrp.get(field).touched;
  }

  closeErrorMsg() {
    this.loginError = false;
  }
}

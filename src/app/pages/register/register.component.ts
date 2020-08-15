import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../service/validation/validation.service";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private validationService: ValidationService, private userService: UserService,
              private router: Router) { }

  formGrp: FormGroup
  ngOnInit(): void {
    this.formGrp = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.min(3)
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      userName: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(8)
      ])
    })
  }

  onRegister() {
    this.validationService.validateAllFormFields(this.formGrp);
    if (!this.formGrp.valid) {
      return;
    }

    this.userService.registerUser(this.createUser()).subscribe(() => {
      this.router.navigate(['/login'])
    }, () => {
    })
  }

  private createUser(): User {
    let user = new User();
    user.userName = this.formGrp.get('userName').value;
    user.password = this.formGrp.get('password').value;
    user.lastName = this.formGrp.get('lastName').value;
    user.firstName = this.formGrp.get('firstName').value;
    user.email = this.formGrp.get('email').value;

    return user;
  }
}

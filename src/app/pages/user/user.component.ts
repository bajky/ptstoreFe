import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../service/validation/validation.service";
import {AuthService} from "../../service/auth/auth.service";

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    constructor(private userService: UserService,
                private validationService: ValidationService,
                private authService: AuthService) {
    }

    formGrp: FormGroup;
    user: User = new User();
    showSuccessMsg: boolean;
    showErrorMsg: boolean;

    ngOnInit() {
      this.userService.getUserInfo().subscribe((userData: User) => {
        this.user = userData;
      })

      this.formGrp = new FormGroup({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        lastName: new FormControl('', [
          Validators.required
        ]),
        userName: new FormControl({disabled: true}, []),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ])
      })

      this.formGrp.get('userName').disable();
    }

    closeErrorMsg() {
      this.showErrorMsg = false;
    }

    closeSuccessMsg() {
      this.showSuccessMsg = false
    }

    onUpdateUser() {
      this.validationService.validateAllFormFields(this.formGrp);
      if (!this.formGrp.valid) {
        return;
      }
      this.userService.updateUser(this.formGrp.value).subscribe((resource: User) => {
        this.authService.updateUserInfo(resource);
        this.showSuccessMsg = true;
        setTimeout(() => this.closeSuccessMsg(), 5000)
      }, ()=> {
        this.showErrorMsg = true;
        setTimeout(() => this.closeErrorMsg(), 5000)
      })
    }
}

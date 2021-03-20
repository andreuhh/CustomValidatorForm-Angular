import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Matchpassword } from '../validators/matchpassword';
import { Uniqueusername } from '../validators/uniqueusername';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ])
  }, { validators: [this.matchPassword.validate] });

  constructor(
    private matchPassword: Matchpassword,
    private uniqueUsername: Uniqueusername
  ) { }

  ngOnInit(): void {
  }

}

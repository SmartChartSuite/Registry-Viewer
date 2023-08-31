import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  login() {

  }

  submit() {
    console.log(this.loginForm);
  }
}

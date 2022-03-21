import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  hide = true;
  form: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  login() {

  }

  submit() {
    console.log(this.form);
  }
}

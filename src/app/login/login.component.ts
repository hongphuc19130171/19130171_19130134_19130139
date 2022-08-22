import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AdapterService} from "../services/adapter.service";
import {Command} from "../model/command";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm!: FormGroup;
  username = localStorage.getItem('username') as string;
  code = localStorage.getItem('code') as string;

  constructor(private builder: FormBuilder, private cmdService: AdapterService, private router: Router) {
  }


  ngOnInit(): void {
    this.reLogin();
    this.reactiveForm = this.builder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

  }

  get reactiveFormControl() {
    return this.reactiveForm.controls;
  }

  login(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "LOGIN",
        "data": {
          "user": this.reactiveForm.value.username,
          "pass": this.reactiveForm.value.password
        }
      }
    };
    this.cmdService.sbj.next(request);

    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        this.router.navigate(['/chat']);
        let data = msg['data'] as Command;
        localStorage.setItem('username', this.reactiveForm.value.username);
        localStorage.setItem('code', data['RE_LOGIN_CODE'] as string);
      } else alert('Wrong user name or password');
    });

  }

  reLogin(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "RE_LOGIN",
        "data": {
          "user": this.username,
          "code": this.code
        }
      }
    };
    this.cmdService.sbj.next(request);
    this.cmdService.sbj.subscribe((msg) => {
      if (msg['status'] == 'success') {
        this.router.navigate(['/chat']);
        let data = msg['data'] as Command;
        localStorage.setItem('code', data['RE_LOGIN_CODE'] as string);
      }
    });
  }
}

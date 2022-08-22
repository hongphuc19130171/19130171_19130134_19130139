import {Component, OnInit} from '@angular/core';
import {AdapterService} from "../services/adapter.service";
import {Router} from "@angular/router";
import {Command} from "../model/command";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private adapter: AdapterService, private router: Router) {
  }

  ngOnInit(): void {
  }

  reLogin(): void {
    if (localStorage.getItem('username') != null && localStorage.getItem('code')) {
      let username = localStorage.getItem('username') as string;
      let code = localStorage.getItem('code') as string;
      let request: Command = {
        "action": "onchat",
        "data": {
          "event": "RE_LOGIN",
          "data": {
            "user": username,
            "code": code
          }
        }
      };
      this.adapter.sbj.next(request);
      this.adapter.sbj.subscribe((msg) => {
        if (msg['status'] == 'success') {
          this.router.navigate(['/chat']);
          let data = msg['data'] as Command;
          localStorage.setItem('code', data['RE_LOGIN_CODE'] as string);
        }
      });
    } else this.router.navigate(['/signin']);
  }
}

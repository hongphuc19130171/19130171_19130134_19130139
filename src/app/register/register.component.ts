import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Command} from "../model/command";
import {AdapterService} from "../services/adapter.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  reactiveForm!: FormGroup;

  constructor(private builder: FormBuilder, private adapterService: AdapterService, private router: Router) {
  }

  ngOnInit(): void {
    this.reactiveForm = this.builder.group({
      fullname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength]],
      email: [null, [Validators.required, Validators.email]]
    });

  }

  get reactiveFormControl() {
    return this.reactiveForm.controls;
  }

  register(): void {
    let request: Command = {
      "action": "onchat",
      "data": {
        "event": "REGISTER",
        "data": {
          "user": this.reactiveForm.value.username,
          "pass": this.reactiveForm.value.password
        }
      }
    };
    this.adapterService.sbj.next(request);
    this.adapterService.sbj.subscribe((msg)=> {
      if (msg['status'] == 'success')
        this.router.navigate(['/signin']);

      else alert("Creating account error, Duplicate Username");
    })

  }

}

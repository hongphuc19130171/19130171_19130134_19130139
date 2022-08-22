import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AdapterService} from "./services/adapter.service";
import {Command} from "./model/command";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Group19-AppChat';

  constructor(private builder: FormBuilder, private cmdService: AdapterService, private router: Router, listUser: AdapterService) {

  }

  ngOnInit(): void {

  }



}

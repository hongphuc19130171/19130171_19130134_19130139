import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {WelcomeComponent} from "../welcome/welcome.component";
import {RouterModule, Routes} from "@angular/router";
import {ChatComponent} from "../chat/chat.component";

const routes: Routes = [
  {path: 'signup', component: RegisterComponent},
  {path: 'signin', component: LoginComponent},
  {path: '', component: WelcomeComponent},
  {path: 'chat', component: ChatComponent}


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

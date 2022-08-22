import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {WebsocketService} from "./services/websocket.service";
import {AdapterService} from "./services/adapter.service";
import {ChatComponent} from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,

    WelcomeComponent,
    ChatComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [WebsocketService, AdapterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}


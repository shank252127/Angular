import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './services/token.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule,
  HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, LoginComponent, WelcomeComponent ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenService,multi:true}],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

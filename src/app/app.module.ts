import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AuthService } from './common/services/auth.service';
import { UserService } from './common/services/user.service';
import { AuthGuardService } from './common/services/guardService/auth.guard.service';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { PublicModule } from './pages/public/public.module';
import { PrivateModule } from './pages/private/private.module';

@NgModule({  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ToasterModule,
    AppRoutingModule,
    PagesModule,
    PublicModule,
    PrivateModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ToasterService,
    AuthService,
    UserService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

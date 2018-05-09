import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TourComponent } from './tour/tour.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TourService } from './services/tour.service';
import { TourDetailComponent } from './tour-detail/tour-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    TourComponent,
    DashboardComponent,
    TourDetailComponent
  ],
  imports: [
    BrowserModule,    
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, TourService],
  bootstrap: [AppComponent]
})
export class AppModule { }

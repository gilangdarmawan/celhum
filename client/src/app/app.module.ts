import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { TourService } from './services/tour.service';
import { EditTourComponent } from './tour/edit-tour/edit-tour.component';
import { DeleteTourComponent } from './tour/delete-tour/delete-tour.component';
import { DetailTourComponent } from './tour/detail-tour/detail-tour.component';
import { SearchTourComponent } from './tour/search-tour/search-tour.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    EditTourComponent,
    DeleteTourComponent,
    DetailTourComponent,
    SearchTourComponent
  ],
  imports: [
    BrowserModule,    
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, TourService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TourComponent } from './tour/tour.component';

const appRoutes: Routes = [{
    path: '',
    component: HomeComponent // The Default Route
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'profile',
    component: ProfileComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'tour',
    component: TourComponent // Tour Route,
    // canActivate: [TourComponent] // User must be logged in to view this route
  },
  {
    path: '**',
    component: HomeComponent // The "Catch-All" Route, 404
  }
];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes, {
        enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }

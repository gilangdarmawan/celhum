import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TourService } from '../services/tour.service';
import { Tour } from '../tour';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tourPosts: Tour[] = [];

  constructor(
    private authService: AuthService,
    private tourService: TourService
  ) {}

  ngOnInit() {
    this.getAllTours();
  }

  // Function to get all tours from the database
  getAllTours(): void {
    // Function to GET all tours from database
    this.tourService.getAllTours().subscribe(data => {
      this.tourPosts = data.tours; // Assign array to use in HTML
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';

@Component({
  selector: 'app-detail-tour',
  templateUrl: './detail-tour.component.html',
  styleUrls: ['./detail-tour.component.scss']
})
export class DetailTourComponent implements OnInit {
  
  message;
  messageClass;
  processing = false;
  tour;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current tour with id in params
    this.tourService.getSingleTour(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Tour not found.'; // Set error message
      } else {
        this.tour = data.tour; // Save tour object for use in HTML
        this.loading = false; // Allow loading of tour form
      }
    });
  }

}

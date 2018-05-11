import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss']
})
export class EditTourComponent implements OnInit {

  message;
  messageClass;
  tour;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) {}

  // Function to Submit Update
  updateTourSubmit() {
    this.processing = true; // Lock form fields
    // Function to send tour object to backend
    this.tourService.editTour(this.tour).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to tour page
        setTimeout(() => {
          this.router.navigate(['/tour']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }

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

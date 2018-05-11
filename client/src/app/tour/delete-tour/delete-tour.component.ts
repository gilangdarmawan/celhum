import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-tour',
  templateUrl: './delete-tour.component.html',
  styleUrls: ['./delete-tour.component.scss']
})
export class DeleteTourComponent implements OnInit {

  message;
  messageClass;
  foundTour = false;
  processing = false;
  tour;
  currentUrl;

  constructor(
    private tourService: TourService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // Function to delete tours
  deleteTour() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.tourService.deleteTour(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to tour page
        setTimeout(() => {
          this.router.navigate(['/tour']); // Route users to tour page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve tour
    this.tourService.getSingleTour(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the tour object to use in HTML
        this.tour = {
          title: data.tour.title, // Set title
          body: data.tour.body, // Set body
          createdBy: data.tour.createdBy, // Set created_by field
          createdAt: data.tour.createdAt // Set created_at field
        }
        this.foundTour = true; // Displaly tour window
      }
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TourService } from '../services/tour.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingTours = false;
  form;
  processing = false;
  username;
  tourPosts;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tourService: TourService
  ) {
    this.createNewTourForm(); // Create new tour form on start up
  }

  // Function to create new tour form
  createNewTourForm() {
    this.form = this.formBuilder.group({
      // Title field
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      // Body field
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  // Enable new tour form
  enableFormNewTourForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new tour form
  disableFormNewTourForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
  }

  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return {
        'alphaNumericValidation': true
      } // Return error in validation
    }
  }

  // Function to display new tour form
  newTourForm() {
    this.newPost = true; // Show new tour form
  }

  // Reload tours on current page
  reloadTours() {
    this.loadingTours = true; // Used to lock button
    this.getAllTours(); // Add any new tours to the page
    setTimeout(() => {
      this.loadingTours = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to post a new comment on tour post
  draftComment() {

  }

  // Function to submit a new tour post
  onTourSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewTourForm(); // Lock form
    // Create tour object from form fields
    const tour = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.username // CreatedBy field
    }

    // Function to save tour into database
    this.tourService.newTour(tour).subscribe(data => {
      // Check if tour was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewTourForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        this.getAllTours();
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewTourForm(); // Enable the form fields
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
  }

  // Function to get all tours from the database
  getAllTours() {
    // Function to GET all tours from database
    this.tourService.getAllTours().subscribe(data => {
      this.tourPosts = data.tours; // Assign array to use in HTML
    });
  }

  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new tour posts and comments
    });

    this.getAllTours(); // Get all tours on component load
  }
}
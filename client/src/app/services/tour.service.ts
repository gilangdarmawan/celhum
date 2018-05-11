import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TourService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) {}

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  // Function to create a new tour post
  newTour(tour) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'tours/newTour', tour, this.options).map(res => res.json());
  }

  // Function to get all tours from the database
  getAllTours() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'tours/allTours', this.options).map(res => res.json());
  }

  // Function to get the tour using the id
  getSingleTour(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'tours/singleTour/' + id, this.options).map(res => res.json());
  }

  // Function to edit/update tour post
  editTour(tour) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'tours/updateTour/', tour, this.options).map(res => res.json());
  }

  // Function to delete a tour
  deleteTour(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'tours/deleteTour/' + id, this.options).map(res => res.json());
  }

}



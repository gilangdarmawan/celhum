import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../tour';

@Component({
  selector: 'app-search-tour',
  templateUrl: './search-tour.component.html',
  styleUrls: ['./search-tour.component.scss']
})
export class SearchTourComponent implements OnInit {

  // tours$: Observable <Tour[]> ;
  // private searchTerms = new Subject < string > ();

  // constructor(private tourService: TourService) {}

  // // Push a search term into the observable stream.
  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  // ngOnInit(): void {
  //   this.tours$ = this.searchTerms.pipe(
  //     // wait 300ms after each keystroke before considering the term
  //     debounceTime(300),

  //     // ignore new term if same as previous term
  //     distinctUntilChanged(),

  //     // switch to new search observable each time the term changes
  //     switchMap((term: string) => this.tourService.searchTours(term)),
  //   );
  // }

  constructor() { }

  ngOnInit() {
  }

}

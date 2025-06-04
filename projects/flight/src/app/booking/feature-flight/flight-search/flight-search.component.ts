import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingStore, Flight } from '../../logic-flight';
import { FlightFilterComponent } from '../../ui-flight';
import { FlightCardComponent } from '../../ui-flight/flight-card/flight-card.component';


@Component({
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html'
})
export class FlightSearchComponent {
  protected store = inject(BookingStore);
}
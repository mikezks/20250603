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

  protected route = computed(
    () => 'From ' + this.store.filter.from() + ' to ' + this.store.filter.to() + '.'
  );

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.store.setFlight(newFlight);
  }
}

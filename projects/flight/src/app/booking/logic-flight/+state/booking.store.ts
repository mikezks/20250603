import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { Flight } from "../model/flight";
import { computed, inject } from "@angular/core";
import { FlightFilter } from "../model/flight-filter";
import { pipe, switchMap } from "rxjs";
import { FlightService } from "../data-access/flight.service";


interface BookingState {
  filter: FlightFilter;
  basket: Record<number, boolean>;
  flights: Flight[];
}

const initialBookingState: BookingState = {
  filter: {
    from: 'Hamburg',
    to: 'Graz',
    urgent: false
  },
  basket: {
    3: true,
    5: true,
  },
  flights: []
};


export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState(initialBookingState),
  withComputed(store => ({
    delayedFlights: computed(
      () => store.flights().filter(flight => flight.delayed)
    ),
  })),
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (flights: Flight[]) => patchState(store, { flights }),
  })),
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    loadFlights: rxMethod<FlightFilter>(pipe(
      switchMap(filter => flightService.find(
        filter.from, filter.to, filter.urgent
      )),
      tapResponse(
        flights => store.setFlights(flights),
        err => console.error(err)
      )
    ))
  })),
  withHooks(store => ({
    onInit: () => store.loadFlights(store.filter)
  }))
);
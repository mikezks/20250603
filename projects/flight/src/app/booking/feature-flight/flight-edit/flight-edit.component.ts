import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { initialFlight } from '../../logic-flight';
import { FlightService } from '../../api-boarding';


@Component({
  selector: 'app-flight-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './flight-edit.component.html',
  providers: [
    FlightService
  ]
})
export class FlightEditComponent implements OnChanges {
  private store = inject(Store);
  private flightService = inject(FlightService);

  @Input() flight = initialFlight;

  protected editForm = inject(FormBuilder).nonNullable.group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  constructor() {
    this.store.select(routerFeature.selectRouteParams).subscribe(
      params => console.log(params)
    );

    this.flightService.findById(1).subscribe(console.log);

    /* this.editForm.patchValue({
      from: 'Barcelona'
    }); */

    this.editForm.getRawValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}

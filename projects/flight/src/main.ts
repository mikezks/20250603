
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { routerFeature } from './app/shared/logic-router-state';
import { SharedModule } from './app/shared/shared.module';
import { UiCoreModule } from './app/shared/ui-core/ui-core.module';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature),
      UiCoreModule,
      SharedModule
    )
  ]
})
  .catch(err => console.error(err));

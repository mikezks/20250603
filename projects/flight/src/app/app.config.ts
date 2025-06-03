import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { AuthInterceptor, authInterceptor } from './shared/logic-communication/auth/auth.interceptor';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideApiBaseUrl, provideAppWait } from './app.providers';
import { provideNavigationService } from './shared/logic-navigation';
import { APP_NAVIGATION } from './app.navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing()
    ),
    provideNavigationService(APP_NAVIGATION),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
      // withInterceptorsFromDi()
    ),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi: true,
    //   useClass: AuthInterceptor
    // },
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideStoreDevtools(),
    provideApiBaseUrl('https://fake.angulararchitects.io/api'),
    // provideAppWait(10)
  ]
};

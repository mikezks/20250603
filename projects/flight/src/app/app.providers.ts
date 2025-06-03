import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { delay, of } from "rxjs";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
	providedIn: 'root',
	factory: () => ''
});

export function provideApiBaseUrl(baseUrl: string): EnvironmentProviders {
	return makeEnvironmentProviders([
		{
			provide: API_BASE_URL,
			useValue: baseUrl
		}
	]);
}

export function injectFlightUrl(): string {
	return inject(API_BASE_URL) + '/flight';
}

export function provideAppWait(sec: number): EnvironmentProviders {
	return makeEnvironmentProviders([
		provideAppInitializer(
			() => of(true).pipe(
				delay(sec * 1_000)
			)
		)
	]);
}
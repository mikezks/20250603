import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders } from "@angular/core";

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
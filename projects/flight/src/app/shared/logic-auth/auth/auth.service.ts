import { Injectable, Signal, computed, signal } from "@angular/core";

type SignalType<T> = T extends Signal<infer R> ? SignalType<R> : T;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginState = signal({
    username: ''
  });
  username = computed(() => this.loginState().username);
  isLoggedIn = computed(() => this.username() !== '');

  login(username: string): void {
    this.patchState({ username });
  }

  logout(): void {
    this.patchState({ username: '' });
  }

  isUser(username: string): boolean {
    return this.loginState().username === username;
  }

  private patchState(state: Partial<SignalType<typeof this.loginState>>): void {
    this.loginState.update(currentState => ({
      ...currentState,
      ...state
    }));
  }
}

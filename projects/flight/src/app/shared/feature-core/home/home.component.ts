import { Component, effect, inject, signal, untracked } from '@angular/core';
import { AuthService } from '../../logic-auth/auth/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Modern Angular</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Standalone APIs</li>
          <li>Signals</li>
          <li>Dependency Injection</li>
          <li>Router, HTTP Client, Forms</li>
          <li>Control Flow</li>
          <li>Performance</li>
          <li>... and much more!</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Login</h2>
      </div>

      <div class="card-body">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" [(ngModel)]="username" class="form-control">
        </div>
      </div>
    </div>
  `,
  styles: [`
    code {
      color: blue;
    }
  `]
})
export class HomeComponent {
  private authService = inject(AuthService);
  protected username = signal(this.authService.username());

  constructor() {
    effect(() => {
      const username = this.username();
      untracked(() => this.authService.login(username));
    });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type FlutterState = {
  screen?: string;
  clicks?: number;
  text?: string;
  setText?: (value: string) => void;
  onClicksChanged?: (callback: () => void) => void;
  onTextChanged?: (callback: () => void) => void;
};

@Component({
  standalone: true,
  selector: 'app-flutter-js-interop-section',
  template: `
    <section>
      <h2>{{ (identifier ? identifier + ' ' : '') + 'JS Interop' }}</h2>
      <mat-form-field appearance="outline">
        <mat-label>Screen</mat-label>
        <mat-select
            (valueChange)="flutterStateController.screen = $event"
            [value]="flutterStateController.screen">
          <mat-option value="counter">Counter</mat-option>
          <mat-option value="text">TextField</mat-option>
          <mat-option value="dash">Custom App</mat-option>
        </mat-select>
      </mat-form-field>
      @if (flutterStateController.screen === 'counter') {
        <mat-form-field appearance="outline">
          <mat-label>Clicks</mat-label>
          <input type="number" matInput (input)="onCounterInput($event)" [value]="flutterStateController.clicks" />
        </mat-form-field>
      } @else {
        <mat-form-field appearance="outline">
          <mat-label>Text</mat-label>
          <input type="text" matInput (input)="onTextInput($event)" [value]="flutterStateController.text" />
          @if (flutterStateController.text) {
            <button matSuffix mat-icon-button aria-label="Clear" (click)="flutterStateController.setText('')">
              <mat-icon>close</mat-icon>
            </button>
          }
        </mat-form-field>
      }
    </section>
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class FlutterJsInteropSectionComponent {
  @Input() identifier?: string;
  @Input({required: true}) flutterStateController!: NgFlutterStateController;

  onCounterInput(event: Event): void {
    const clicks = parseInt((event.target as HTMLInputElement).value, 10) || 0;
    this.flutterStateController.clicks = clicks;
  }

  onTextInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value || '';
    this.flutterStateController.text = text;
  }
}

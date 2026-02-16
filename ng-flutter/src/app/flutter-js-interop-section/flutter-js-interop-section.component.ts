import { Component, computed, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFlutterStore } from './ng-flutter-store';
import {
  parseCounterValueFromInput,
  parseTextValueFromInput,
} from './input-value-parsers';

/** Shape of state and callbacks exposed by the Flutter JS interop layer. */
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
      <h2>{{ sectionTitle() }}</h2>
      <mat-form-field appearance="outline">
        <mat-label>Screen</mat-label>
        <mat-select
            (valueChange)="store().setScreen($event)"
            [value]="store().screen()">
          <mat-option value="counter">Counter</mat-option>
          <mat-option value="text">TextField</mat-option>
          <mat-option value="dash">Custom App</mat-option>
        </mat-select>
      </mat-form-field>
      @if (store().screen() === 'counter') {
        <mat-form-field appearance="outline">
          <mat-label>Clicks</mat-label>
          <input type="number" matInput (input)="applyCounterFromInput($event)" [value]="store().clicks()" />
        </mat-form-field>
      } @else {
        <mat-form-field appearance="outline">
          <mat-label>Text</mat-label>
          <input type="text" matInput (input)="applyTextFromInput($event)" [value]="store().text()" />
          @if (store().text()) {
            <button matSuffix mat-icon-button aria-label="Clear" (click)="clearText()">
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
/**
 * Section component providing JS interop controls for a Flutter view.
 * Lets users switch screens (counter, text, custom app) and edit counter/text values.
 */
export class FlutterJsInteropSectionComponent {
  /** Optional emoji or label prefix shown in the section title (e.g. 🔴 or 🔵). */
  readonly identifier = input<string>();
  /** Store that drives the associated Flutter view's state. */
  readonly store = input.required<NgFlutterStore>();

  protected readonly sectionTitle = computed(() => {
    const identifier = this.identifier();
    return (identifier ? identifier + ' ' : '') + 'JS Interop';
  });

  protected applyCounterFromInput(event: Event): void {
    this.store().setClicks(parseCounterValueFromInput(event));
  }

  protected applyTextFromInput(event: Event): void {
    this.store().setText(parseTextValueFromInput(event));
  }

  protected clearText(): void {
    this.store().setText('');
  }
}

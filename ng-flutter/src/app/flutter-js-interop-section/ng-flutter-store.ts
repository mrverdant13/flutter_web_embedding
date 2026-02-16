import { InjectionToken, Injectable, signal } from '@angular/core';

/** Injection token for the red Flutter view's state store. */
export const NG_FLUTTER_STORE_RED = new InjectionToken<NgFlutterStore>(
  'NgFlutterStoreRed'
);

/** Injection token for the blue Flutter view's state store. */
export const NG_FLUTTER_STORE_BLUE = new InjectionToken<NgFlutterStore>(
  'NgFlutterStoreBlue'
);

/**
 * Shared state store between Angular and a Flutter view.
 * Holds screen selection (counter/text/dash), click count, and text input.
 */
@Injectable()
export class NgFlutterStore {
  private screenSignal = signal<string>('counter');
  private clicksSignal = signal<number>(0);
  private textSignal = signal<string>('');

  /** Current screen: 'counter', 'text', or 'dash'. */
  readonly screen = this.screenSignal.asReadonly();
  /** Current click count for the counter screen. */
  readonly clicks = this.clicksSignal.asReadonly();
  /** Current text value for the text field screen. */
  readonly text = this.textSignal.asReadonly();

  /** Updates the active screen. */
  setScreen(value: string) {
    this.screenSignal.set(value);
  }

  /** Updates the click count. */
  setClicks(value: number) {
    this.clicksSignal.set(value);
  }

  /** Updates the text value. */
  setText(value: string) {
    this.textSignal.set(value);
  }
}

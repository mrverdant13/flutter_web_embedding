import { InjectionToken, Injectable, signal } from '@angular/core';

export const NG_FLUTTER_STORE_RED = new InjectionToken<NgFlutterStore>(
  'NgFlutterStoreRed'
);

export const NG_FLUTTER_STORE_BLUE = new InjectionToken<NgFlutterStore>(
  'NgFlutterStoreBlue'
);

@Injectable()
export class NgFlutterStore {
  private screenSignal = signal<string>('counter');
  private clicksSignal = signal<number>(0);
  private textSignal = signal<string>('');

  readonly screen = this.screenSignal.asReadonly();
  readonly clicks = this.clicksSignal.asReadonly();
  readonly text = this.textSignal.asReadonly();

  setScreen(value: string) {
    this.screenSignal.set(value);
  }

  setClicks(value: number) {
    this.clicksSignal.set(value);
  }

  setText(value: string) {
    this.textSignal.set(value);
  }
}

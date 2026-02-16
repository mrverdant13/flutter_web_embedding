import { Component, AfterViewInit, OnDestroy, effect, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFlutterStore } from '../flutter-js-interop-section/ng-flutter-store';

@Component({
  selector: 'ng-flutter',
  standalone: true,
  template: `
  <div #flutterTarget [id]="targetId()">
    <div class="spinner">
      <mat-spinner></mat-spinner>
    </div>
  </div>
  `,
  styles: [`
    :host div {
      width: 100%;
      height: 100%;
    }
    .spinner {
      display: flex;
      justify-content: center;
      align-items: center;
    }`,
  ],
  imports: [
    MatProgressSpinnerModule,
  ],
})
export class NgFlutterComponent implements AfterViewInit, OnDestroy {
  readonly targetId = input.required<string>();
  readonly store = input.required<NgFlutterStore>();

  viewId?: number;
  stateController?: NgFlutterStateController;

  constructor() {
    effect(() => {
      const screen = this.store().screen();
      if (!this.stateController) return;
      this.stateController.screen = screen;
    });
    effect(() => {
      const clicks = this.store().clicks();
      if (!this.stateController) return;
      this.stateController.clicks = clicks;
    });
    effect(() => {
      const text = this.store().text();
      if (!this.stateController) return;
      this.stateController.text = text;
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.mountFlutterView();
  }

  async ngOnDestroy(): Promise<void> {
    await this.removeFlutterView();
  }

  private async mountFlutterView(): Promise<void> {
    const target = document.getElementById(this.targetId());
    if (!target) {
      throw new Error(`Target element with id ${this.targetId()} not found`);
    }

    await _ngFlutter.initMultiViewApp();

    this.viewId = await _ngFlutter.addView(
      target,
      {
        targetElementId: this.targetId(),
      },
      (state: NgFlutterStateController) => {
        this.stateController = state;
        state.onClicksChanged(() => {
          this.store().setClicks(state.clicks);
        });
        state.onTextChanged(() => {
          this.store().setText(state.text);
        });
      },
    );
  }

  private async removeFlutterView(): Promise<void> {
    if (!this.viewId) return;
    await _ngFlutter.removeView(this.viewId);
  }
}

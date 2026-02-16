import { Component, AfterViewInit, OnDestroy, effect, input, signal } from '@angular/core';
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
/**
 * Embeds a Flutter view into an Angular template.
 * Mounts the Flutter app in an element identified by {@link targetId} and syncs state with the provided {@link ngFlutterStore}.
 */
export class NgFlutterComponent implements AfterViewInit, OnDestroy {
  /** DOM id of the host element where the Flutter view will be mounted. */
  readonly targetId = input.required<string>();
  /** NgFlutter store used to sync screen, clicks, and text state between Angular and Flutter. */
  readonly ngFlutterStore = input.required<NgFlutterStore>();

  /** Id returned by Flutter addView; used to remove the view on destroy. */
  private readonly viewId = signal<number | undefined>(undefined);
  /** Controller from Flutter to sync screen, clicks, and text; set when view is mounted. */
  private readonly stateController = signal<NgFlutterStateController | undefined>(undefined);

  constructor() {
    effect(() => {
      const controller = this.stateController();
      if (!controller) return;
      controller.screen = this.ngFlutterStore().screen();
    });
    effect(() => {
      const controller = this.stateController();
      if (!controller) return;
      controller.clicks = this.ngFlutterStore().clicks();
    });
    effect(() => {
      const controller = this.stateController();
      if (!controller) return;
      controller.text = this.ngFlutterStore().text();
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

    const id = await _ngFlutter.addView(
      target,
      {
        targetElementId: this.targetId(),
      },
      (state: NgFlutterStateController) => {
        this.stateController.set(state);
        state.onClicksChanged(() => {
          this.ngFlutterStore().setClicks(state.clicks);
        });
        state.onTextChanged(() => {
          this.ngFlutterStore().setText(state.text);
        });
      },
    );
    this.viewId.set(id);
  }

  private async removeFlutterView(): Promise<void> {
    const id = this.viewId();
    if (id === undefined) return;
    await _ngFlutter.removeView(id);
  }
}

import { Component, AfterViewInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ng-flutter',
  standalone: true,
  template: `
  <div #flutterTarget [id]="targetId">
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
  @Input({ required: true }) targetId!: string;
  @Output() onStateControllerReady: EventEmitter<NgFlutterStateController> = new EventEmitter<NgFlutterStateController>();

  viewId?: number;

  async ngAfterViewInit(): Promise<void> {
    const target = document.getElementById(this.targetId);
    if (!target) {
      throw new Error(`Target element with id ${this.targetId} not found`);
    }

    await _ngFlutter.initMultiViewApp();

    const viewId = await _ngFlutter.addView(
      target,
      {
        targetElementId: this.targetId,
      },
      (state: NgFlutterStateController) => {
        console.log(`${this.targetId}: ng-flutter-initialized event received`);
        this.onStateControllerReady.emit(state);
      },
    );
    console.log(`${this.targetId}: viewId: <${viewId}>`);
  }

  async ngOnDestroy(): Promise<void> {
    console.log(`${this.targetId}: ngOnDestroy`);
    if (!this.viewId) return;
    await _ngFlutter.removeView(this.viewId);
  }
}

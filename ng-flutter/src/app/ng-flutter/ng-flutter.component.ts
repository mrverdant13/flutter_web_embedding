import { Component, AfterViewInit, SimpleChanges, ViewChild, ElementRef, Input, EventEmitter, Output, OnDestroy, ProviderToken } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

class Deferred<T> {
  promise: Promise<T>;
  resolve!: (value: T | PromiseLike<T>) => void;
  reject!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((_resolve, _reject) => {
      this.resolve = _resolve;
      this.reject = _reject;
    });
  }
}

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
  static deferredApp?: Deferred<any>;
  @Input({ required: true }) targetId!: string;
  @Output() appLoaded: EventEmitter<Object> = new EventEmitter<Object>();
  viewId?: number;

  async ngAfterViewInit(): Promise<void> {
    const target: HTMLElement = document.getElementById(this.targetId) as HTMLElement;


    if (!NgFlutterComponent.deferredApp) {
      NgFlutterComponent.deferredApp = new Deferred<any>();

      // Used to verify that `main.dart.js` is lazy loaded
      // await new Promise(resolve => setTimeout(resolve, 10000));

      _flutter.loader.load({
        config: {
          entryPointBaseUrl: './flutter/',
        },
        onEntrypointLoaded: async (engineInitializer: any) => {
          const appRunner = await engineInitializer.initializeEngine({
            assetBase: './flutter/',
            hostElement: target,
            multiViewEnabled: true,
            useColorEmoji: true,
          });
          NgFlutterComponent.deferredApp?.resolve(appRunner.runApp());
        }
      });
    }

    NgFlutterComponent.deferredApp.promise.then((app: any) => {
      this.viewId = app.addView({
        hostElement: target,
        initialData: {
          targetElementId: this.targetId,
        },
      });
      console.log(`${this.targetId}: viewId: <${this.viewId}>`);
    });

    target.addEventListener("flutter-initialized", (event: Event) => {
      console.log(`${this.targetId}: flutter-initialized event received`);
      const state = (event as CustomEvent).detail;
      this.appLoaded.emit(state);
    }, {
      once: true,
    });
  }

  async ngOnDestroy(): Promise<void> {
    console.log(`${this.targetId}: ngOnDestroy`);
    const app = await NgFlutterComponent.deferredApp?.promise;
    if (!app) return;
    if (!this.viewId) return;
    const viewConfig = await app.removeView(this.viewId);
  }
}

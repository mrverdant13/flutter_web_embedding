import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgFlutterComponent } from './ng-flutter/ng-flutter.component';
import { FlutterEffectsSectionComponent } from './flutter-effects-section/flutter-effects-section.component';
import { FlutterJsInteropSectionComponent } from './flutter-js-interop-section/flutter-js-interop-section.component';
import { NgFlutterStore, NG_FLUTTER_STORE_RED, NG_FLUTTER_STORE_BLUE } from './flutter-js-interop-section/ng-flutter-store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-root',
  providers: [
    { provide: NG_FLUTTER_STORE_RED, useClass: NgFlutterStore },
    { provide: NG_FLUTTER_STORE_BLUE, useClass: NgFlutterStore },
  ],
  template: `
<mat-toolbar color="primary">
  <button
    aria-label="Toggle sidenav"
    mat-icon-button
    (click)="toggleSidenav()">
    <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
  </button>
  <span>Angular 🤝 Flutter</span>
  <span class="toolbar-spacer"></span>
  <mat-icon aria-hidden="true">flutter_dash</mat-icon>
</mat-toolbar>
<mat-sidenav-container [hasBackdrop]=false class="sidenav-container">
  <mat-sidenav #drawer mode="side" [opened]=true class="sidenav">
    <mat-nav-list autosize>
      <app-flutter-effects-section identifier="🔴" [containerRef]="containerRedRef()" />
      <app-flutter-js-interop-section
        identifier="🔴"
        [ngFlutterStore]="storeRed"
      />
      <mat-divider class="section-divider"></mat-divider>
      <app-flutter-effects-section identifier="🔵" [containerRef]="containerBlueRef()" />
      <app-flutter-js-interop-section
        identifier="🔵"
        [ngFlutterStore]="storeBlue"
      />
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content class="sidenav-content">
    <div class="flutter-app" #containerRed>
      <ng-flutter
        targetId="🔴"
        [ngFlutterStore]="storeRed"
      >
      </ng-flutter>
    </div>
    <div class="flutter-app" #containerBlue>
      <ng-flutter
        targetId="🔵"
        [ngFlutterStore]="storeBlue"
      >
      </ng-flutter>
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
`,
  styles: [`
  :host{
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .toolbar-spacer {
    flex: 1 1 auto;
  }
  .sidenav-container {
    flex: 1;
  }
  .sidenav {
    width: 300px;
    padding: 10px;
  }
  .sidenav-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 16px;
  }
  .flutter-app {
    border: 2px solid #ddd;
    border-radius: 5px;
    height: 480px;
    width: 320px;
    transition: all 150ms ease-in-out;
    overflow: hidden;
  }
  .section-divider {
    margin: 10px 0;
  }
  `],
  imports: [
    NgFlutterComponent,
    FlutterEffectsSectionComponent,
    FlutterJsInteropSectionComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
})
/**
 * Root application component hosting the Angular–Flutter integration demo.
 * Provides a sidenav layout with two Flutter view instances (red and blue) and their control panels.
 */
export class AppComponent {
  /** Reference to the red Flutter container element in the sidenav content area. */
  readonly containerRedRef = viewChild<ElementRef<HTMLElement>>('containerRed');
  /** Reference to the blue Flutter container element in the sidenav content area. */
  readonly containerBlueRef = viewChild<ElementRef<HTMLElement>>('containerBlue');
  /** Reference to the sidenav drawer for programmatic toggle. */
  readonly drawer = viewChild<MatSidenav>('drawer');

  /** Store instance managing state for the red Flutter view. */
  readonly storeRed = inject(NG_FLUTTER_STORE_RED);
  /** Store instance managing state for the blue Flutter view. */
  readonly storeBlue = inject(NG_FLUTTER_STORE_BLUE);

  protected toggleSidenav(): void {
    this.drawer()?.toggle();
  }
}

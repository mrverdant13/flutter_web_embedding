import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
    (click)="drawer.toggle()">
    <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
  </button>
  <span>Angular 🤝 Flutter</span>
  <span class="toolbar-spacer"></span>
  <mat-icon aria-hidden="true">flutter_dash</mat-icon>
</mat-toolbar>
<mat-sidenav-container [hasBackdrop]=false class="sidenav-container">
  <mat-sidenav #drawer mode="side" [opened]=true class="sidenav">
    <mat-nav-list autosize>
      <app-flutter-effects-section identifier="🔴" [containerRef]="containerRed" />
      <app-flutter-js-interop-section
        identifier="🔴"
        [store]="storeRed"
      />
      <mat-divider class="section-divider"></mat-divider>
      <app-flutter-effects-section identifier="🔵" [containerRef]="containerBlue" />
      <app-flutter-js-interop-section
        identifier="🔵"
        [store]="storeBlue"
      />
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content class="sidenav-content">
    <div class="flutter-app" #containerRed>
      <ng-flutter
        targetId="🔴"
        [store]="storeRed"
      >
      </ng-flutter>
    </div>
    <div class="flutter-app" #containerBlue>
      <ng-flutter
        targetId="🔵"
        [store]="storeBlue"
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
export class AppComponent {
  @ViewChild('containerRed') containerRed!: ElementRef<HTMLElement>;
  @ViewChild('containerBlue') containerBlue!: ElementRef<HTMLElement>;

  readonly storeRed = inject(NG_FLUTTER_STORE_RED);
  readonly storeBlue = inject(NG_FLUTTER_STORE_BLUE);
}

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

const appRoutes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule)
  ]
})

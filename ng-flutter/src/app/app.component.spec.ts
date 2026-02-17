import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have storeRed and storeBlue injected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.storeRed).toBeTruthy();
    expect(app.storeBlue).toBeTruthy();
    expect(app.storeRed).not.toBe(app.storeBlue);
  });

  it('should render toolbar with Angular Flutter title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain('Angular 🤝 Flutter');
  });

  it('should have menu button for toggling sidenav', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[aria-label="Toggle sidenav"]');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Toggle sidenav');
  });
});

import { inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlutterJsInteropSectionComponent } from './flutter-js-interop-section.component';
import { NgFlutterStore } from './ng-flutter-store';

describe('FlutterJsInteropSectionComponent', () => {
  let component: FlutterJsInteropSectionComponent;
  let fixture: ComponentFixture<FlutterJsInteropSectionComponent>;
  let store: NgFlutterStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlutterJsInteropSectionComponent],
      providers: [NgFlutterStore],
    }).compileComponents();

    store = TestBed.runInInjectionContext(() => inject(NgFlutterStore));
    fixture = TestBed.createComponent(FlutterJsInteropSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ngFlutterStore', store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default section title when identifier is not set', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('JS Interop');
  });

  it('should show section title with identifier when set', () => {
    fixture.componentRef.setInput('identifier', '🔴');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('🔴 JS Interop');
  });

  it('should display screen select with counter option', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-select')).toBeTruthy();
    expect(compiled.textContent).toContain('Screen');
  });

  it('should display counter input when screen is counter', () => {
    store.setScreen('counter');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    const numberInput = Array.from(inputs).find((i) => i.type === 'number');
    expect(numberInput).toBeTruthy();
    expect(compiled.textContent).toContain('Clicks');
  });

  it('should display text input when screen is text', () => {
    store.setScreen('text');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    const textInput = Array.from(inputs).find((i) => i.type === 'text');
    expect(textInput).toBeTruthy();
    expect(compiled.textContent).toContain('Text');
  });

  it('should update store when counter input value changes', () => {
    store.setScreen('counter');
    store.setClicks(0);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input[type="number"]'
    ) as HTMLInputElement | null;
    expect(input).toBeTruthy();
    input!.value = '5';
    input!.dispatchEvent(new Event('input'));
    expect(store.clicks()).toBe(5);
  });

  it('should update store when text input value changes', () => {
    store.setScreen('text');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement | null;
    expect(input).toBeTruthy();
    input!.value = 'hello';
    input!.dispatchEvent(new Event('input'));
    expect(store.text()).toBe('hello');
  });

  it('should clear text when clear button is clicked', () => {
    store.setScreen('text');
    store.setText('some text');
    fixture.detectChanges();
    const clearButton = fixture.nativeElement.querySelector('button[aria-label="Clear"]');
    expect(clearButton).toBeTruthy();
    clearButton!.dispatchEvent(new Event('click'));
    expect(store.text()).toBe('');
  });
});

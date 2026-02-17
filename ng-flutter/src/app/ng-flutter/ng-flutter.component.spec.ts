import { inject } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { NgFlutterComponent } from './ng-flutter.component';
import { NgFlutterStore } from '../flutter-js-interop-section/ng-flutter-store';

describe('NgFlutterComponent', () => {
  let component: NgFlutterComponent;
  let fixture: ComponentFixture<NgFlutterComponent>;
  let mockAddView: jasmine.Spy;
  let mockRemoveView: jasmine.Spy;
  let mockInitMultiViewApp: jasmine.Spy;
  const globalNgFlutter = (): typeof _ngFlutter | undefined =>
    (globalThis as unknown as { _ngFlutter?: typeof _ngFlutter })._ngFlutter;

  let originalNgFlutter: typeof _ngFlutter | undefined;

  beforeEach(async () => {
    originalNgFlutter = globalNgFlutter();
    mockInitMultiViewApp = jasmine.createSpy().and.returnValue(Promise.resolve());
    mockAddView = jasmine.createSpy().and.returnValue(Promise.resolve(1));
    mockRemoveView = jasmine.createSpy().and.returnValue(Promise.resolve());

    (globalThis as unknown as { _ngFlutter: typeof _ngFlutter })._ngFlutter = {
      initializationEventName: 'ng-flutter-initialized',
      initMultiViewApp: mockInitMultiViewApp,
      addView: mockAddView,
      removeView: mockRemoveView,
    };

    await TestBed.configureTestingModule({
      imports: [NgFlutterComponent],
      providers: [NgFlutterStore],
    }).compileComponents();

    fixture = TestBed.createComponent(NgFlutterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('targetId', 'test-flutter-target');
    fixture.componentRef.setInput(
      'ngFlutterStore',
      TestBed.runInInjectionContext(() => inject(NgFlutterStore))
    );
    fixture.detectChanges();
  });

  afterEach(() => {
    if (originalNgFlutter !== undefined) {
      (globalThis as unknown as { _ngFlutter: typeof _ngFlutter })._ngFlutter =
        originalNgFlutter;
    } else {
      delete (globalThis as unknown as { _ngFlutter?: typeof _ngFlutter })._ngFlutter;
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a spinner while loading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-spinner')).toBeTruthy();
  });

  it(
    'should call initMultiViewApp and addView on ngAfterViewInit',
    fakeAsync(() => {
      flush();
      expect(mockInitMultiViewApp).toHaveBeenCalled();
      expect(mockAddView).toHaveBeenCalled();
      const addViewArgs = mockAddView.calls.mostRecent().args;
      expect(addViewArgs[1].targetElementId).toBe('test-flutter-target');
    })
  );

  it('should not throw on destroy', fakeAsync(() => {
    flush(); // allow ngAfterViewInit / addView to complete
    expect(mockAddView).toHaveBeenCalled();
    expect(() => {
      fixture.destroy();
      flush();
    }).not.toThrow();
  }));
});

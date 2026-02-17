import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { FlutterEffectsSectionComponent } from './flutter-effects-section.component';

describe('FlutterEffectsSectionComponent', () => {
  let component: FlutterEffectsSectionComponent;
  let fixture: ComponentFixture<FlutterEffectsSectionComponent>;
  let mockElement: HTMLElement;
  let classListSpy: jasmine.SpyObj<DOMTokenList>;

  beforeEach(async () => {
    classListSpy = jasmine.createSpyObj('DOMTokenList', ['toggle']);
    mockElement = document.createElement('div');
    Object.defineProperty(mockElement, 'classList', {
      value: classListSpy,
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [FlutterEffectsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlutterEffectsSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('containerRef', new ElementRef(mockElement));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default section title when identifier is not set', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Effects');
  });

  it('should show section title with identifier when set', () => {
    fixture.componentRef.setInput('identifier', '🔵');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe(
      '🔵 Effects'
    );
  });

  it('should render effect buttons (Shadow, Mirror, Resize, Spin)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Shadow');
    expect(compiled.textContent).toContain('Mirror');
    expect(compiled.textContent).toContain('Resize');
    expect(compiled.textContent).toContain('Spin');
  });

  function findButtonByText(text: string): HTMLButtonElement | undefined {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    return Array.from(buttons).find((b) =>
      (b as HTMLElement).textContent?.trim().includes(text)
    ) as HTMLButtonElement | undefined;
  }

  it('should toggle fx-shadow class on Shadow button click', () => {
    findButtonByText('Shadow')?.dispatchEvent(new Event('click'));
    expect(classListSpy.toggle).toHaveBeenCalledWith('fx-shadow');
  });

  it('should toggle fx-mirror class on Mirror button click', () => {
    findButtonByText('Mirror')?.dispatchEvent(new Event('click'));
    expect(classListSpy.toggle).toHaveBeenCalledWith('fx-mirror');
  });

  it('should toggle fx-resize class on Resize button click', () => {
    findButtonByText('Resize')?.dispatchEvent(new Event('click'));
    expect(classListSpy.toggle).toHaveBeenCalledWith('fx-resize');
  });

  it('should toggle fx-spin class on Spin button click', () => {
    findButtonByText('Spin')?.dispatchEvent(new Event('click'));
    expect(classListSpy.toggle).toHaveBeenCalledWith('fx-spin');
  });
});

import { ElementRef } from '@angular/core';
import { resolveContainerElement } from './resolve-container-element';

describe('resolveContainerElement', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
  });

  it('should return undefined for undefined', () => {
    expect(resolveContainerElement(undefined)).toBeUndefined();
  });

  it('should return nativeElement when given ElementRef', () => {
    const elementRef = new ElementRef(mockElement);
    expect(resolveContainerElement(elementRef)).toBe(mockElement);
  });

  it('should return the element when given HTMLElement directly', () => {
    expect(resolveContainerElement(mockElement)).toBe(mockElement);
  });

  it('should return the same element for both input types', () => {
    const elementRef = new ElementRef(mockElement);
    expect(resolveContainerElement(elementRef)).toBe(
      resolveContainerElement(mockElement)
    );
  });
});

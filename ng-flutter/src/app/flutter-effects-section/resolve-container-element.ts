import { ElementRef } from '@angular/core';

/**
 * Resolves a container reference (ElementRef or HTMLElement) to the underlying HTMLElement.
 * Used when components accept either type for flexibility.
 */
export function resolveContainerElement(
  ref: ElementRef<HTMLElement> | HTMLElement | undefined
): HTMLElement | undefined {
  if (!ref) return undefined;
  return ref instanceof ElementRef ? ref.nativeElement : ref;
}

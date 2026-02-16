import { Component, ElementRef, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { resolveContainerElement } from './resolve-container-element';

@Component({
  standalone: true,
  selector: 'app-flutter-effects-section',
  template: `
    <section>
      <h2>{{ sectionTitle() }}</h2>
      <div class="button-list">
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleEffect('fx-shadow')">Shadow</button>
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleEffect('fx-mirror')">Mirror</button>
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleEffect('fx-resize')">Resize</button>
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleEffect('fx-spin')">Spin</button>
      </div>
    </section>
  `,
  styles: [`
    .button-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 20px;
    }
    .button-list button {
      min-width: 130px;
    }
  `],
  imports: [MatButtonModule],
})
/**
 * Section component providing effect toggles (shadow, mirror, resize, spin) for a Flutter container.
 * Applies CSS classes to the referenced container element.
 */
export class FlutterEffectsSectionComponent {
  /** Optional emoji or label prefix shown in the section title (e.g. 🔴 or 🔵). */
  readonly identifier = input<string>();
  /** Reference to the Flutter container element whose class list is modified by the effect buttons. */
  readonly containerRef = input<ElementRef<HTMLElement> | HTMLElement>();

  protected readonly sectionTitle = computed(() => {
    const identifier = this.identifier();
    return (identifier ? identifier + ' ' : '') + 'Effects';
  });

  protected toggleEffect(className: string): void {
    resolveContainerElement(this.containerRef())?.classList.toggle(className);
  }
}

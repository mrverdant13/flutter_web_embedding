import { Component, ElementRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { resolveContainerElement } from './container-element-resolver';

@Component({
  standalone: true,
  selector: 'app-flutter-effects-section',
  template: `
    <section>
      <h2>{{ sectionTitle }}</h2>
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
export class FlutterEffectsSectionComponent {
  @Input() identifier?: string;
  @Input() containerRef?: ElementRef<HTMLElement> | HTMLElement;

  protected get sectionTitle(): string {
    return (this.identifier ? this.identifier + ' ' : '') + 'Effects';
  }

  protected toggleEffect(className: string): void {
    resolveContainerElement(this.containerRef)?.classList.toggle(className);
  }
}

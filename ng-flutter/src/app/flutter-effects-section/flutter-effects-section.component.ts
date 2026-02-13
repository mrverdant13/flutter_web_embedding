import { Component, ElementRef, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-flutter-effects-section',
  template: `
    <section>
      <h2>{{ (identifier ? identifier + ' ' : '') + 'Effects' }}</h2>
      <div class="button-list">
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleClass('fx-shadow')">Shadow</button>
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleClass('fx-mirror')">Mirror</button>
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleClass('fx-resize')">Resize</button>
        <button class="mb-control" mat-stroked-button color="primary"
            (click)="toggleClass('fx-spin')">Spin</button>
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

  private get container(): HTMLElement | undefined {
    if (!this.containerRef) return undefined;
    return this.containerRef instanceof ElementRef
      ? this.containerRef.nativeElement
      : this.containerRef;
  }

  toggleClass(className: string): void {
    this.container?.classList.toggle(className);
  }
}

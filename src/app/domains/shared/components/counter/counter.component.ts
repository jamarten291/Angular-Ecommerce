import {
  Component,
  signal,
  OnDestroy,
  input,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter implements OnDestroy {
  duration = input.required<number>();
  message = input.required<string>();
  counter = signal(0);
  counterRef: number | null = null;

  constructor() {
    afterNextRender(() => {
      this.counterRef = window.setInterval(() => {
        let counterValue = this.counter();
        this.counter.update(() => (counterValue += 1));
      }, 1000);
    });
  }

  ngOnDestroy() {
    if (this.counterRef) {
      window.clearInterval(this.counterRef);
    }
  }
}

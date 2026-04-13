import { Component, signal, OnInit, DoCheck, OnDestroy, input, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter implements OnInit, DoCheck, OnDestroy {
  duration = input.required<number>();
  message = input.required<string>();
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    console.log('Constructor executed.');

    effect(() => {
      const duration = this.duration();
      console.log('Duration changed: ', duration);
    });
  }

  /*
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges executed.', changes);
    const change = changes['duration'];

    if (change && change.currentValue != change.previousValue) {
      console.log('cambio detectado');
    }
  }
  */

  ngOnInit() {
    console.log('ngOnInit executed.');
    let counterValue = this.counter();

    this.counterRef = window.setInterval(() => {
      console.log('running counter');
      this.counter.update(() => (counterValue += 1));
    }, 1000);
  }

  ngDoCheck() {
    console.log('ngDoCheck executed.');
  }

  ngOnDestroy() {
    window.clearInterval(this.counterRef);
    console.log('ngOnDestroy executed.');
  }
}

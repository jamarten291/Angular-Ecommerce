import {
  Component,
  Input,
  SimpleChanges,
  signal,
  OnChanges,
  OnInit,
  DoCheck,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter implements OnChanges, OnInit, DoCheck, OnDestroy {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    console.log('Constructor executed.');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges executed.', changes);
    const change = changes['duration'];

    if (change && change.currentValue != change.previousValue) {
      console.log('cambio detectado');
    }
  }

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

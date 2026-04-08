import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';
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
    this.counterRef = window.setInterval(() => { 
      console.log('running counter');
      this.counter.update(prevState => prevState+=1);
    }, 1000)
  }

  ngDoCheck() {
    console.log('ngDoCheck executed.');
  }

  ngOnDestroy() {
    window.clearInterval(this.counterRef)
    console.log('ngOnDestroy executed.');
  }
}

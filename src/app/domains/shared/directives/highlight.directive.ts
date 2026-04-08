import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class Highlight {
  element = inject(ElementRef);

  constructor() {}

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }
}

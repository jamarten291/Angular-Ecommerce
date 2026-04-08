import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight implements OnInit {
  element = inject(ElementRef);

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }
}

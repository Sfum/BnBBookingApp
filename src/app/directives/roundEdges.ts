import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRoundEdges]'
})
export class RoundEdgesDirective {

  constructor(renderer: Renderer2, elmRef: ElementRef) {
    renderer.setStyle(elmRef.nativeElement, 'border-radius', '20px');
  }
}

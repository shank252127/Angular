import { Directive, ElementRef, HostListener,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomStyle]'
})
export class CustomStyleDirective {

  constructor(private elRef : ElementRef, private renderer: Renderer2) { 
    elRef.nativeElement.style.color ="red";
    //renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray')
  }
  @HostListener("mouseenter") onMouseEnter() {
    this.elRef.nativeElement.style.color ="yellow";
    console.log("I am here")
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.elRef.nativeElement.style.color ="red";
  }

}

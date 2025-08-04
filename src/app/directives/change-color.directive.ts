import { Directive, ElementRef, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
    selector: '[yellow]',
    standalone: true,
})
export class ChangeColor {
    color = '#4B565E';

    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return this.color;
    }
    
    @HostListener('mouseenter')
    enter(){
        this.color = '#F0BA4E';
    }

    @HostListener('mouseleave')
    leave(){
        this.color = '#4B565E'; 
    }
}
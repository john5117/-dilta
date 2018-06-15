import { transition, trigger, useAnimation } from '@angular/animations';
import { slideInLeft } from 'ng-animate';

export const animations = [
  trigger('slideIn', [transition('* => *', useAnimation(slideInLeft))])
];

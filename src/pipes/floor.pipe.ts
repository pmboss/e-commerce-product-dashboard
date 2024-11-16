import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor',
  standalone: true
})
export class FloorPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.floor(value);
  }

}

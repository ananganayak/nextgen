import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'writeonly'
})
export class WriteonlyPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    const pipeval = value;
    if (pipeval.indexOf('W') !== -1) {
      return true;
    } else {
      return null;
    }
  }

}

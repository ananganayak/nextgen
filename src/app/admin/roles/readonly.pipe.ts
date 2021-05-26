import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readonly'
})
export class ReadonlyPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    const pipeval = value;
    if (pipeval.indexOf('R') !== -1) {
      return true;
    } else {
      return null;
    }
  }

}

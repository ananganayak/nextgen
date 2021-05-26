import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleteonly'
})
export class DeleteonlyPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    const pipeval = value;
    if (pipeval.indexOf('X') !== -1) {
      return true;
    } else {
      return null;
    }
  }

}
